"use server";

interface TelegramData {
  fullName?: string;
  phone?: string;
  email?: string;
  consultationType?: string;
  details?: string;
  source?: string;
  address?: string;
  images?: string[];
  propertyUrl?: string;
}

function getTimestamp(): string {
  return new Date().toLocaleString("vi-VN", {
    timeZone: "Asia/Ho_Chi_Minh",
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

function formatMessage(data: TelegramData): string {
  const time = getTimestamp();
  const source = data.source || "Website";

  // ── Sidebar Form (Property Detail Page) ──
  if (source.startsWith("Trang Chi Tiết BĐS")) {
    const lines = [
      `🏠 <b>QUAN TÂM BẤT ĐỘNG SẢN</b>`,
      ``,
      `┌─ 👤 Khách hàng`,
      `│  Tên: <b>${data.fullName || "—"}</b>`,
      `│  SĐT: <b>${data.phone || "—"}</b>`,
      `│`,
      `├─ 🏷️ Sản phẩm quan tâm`,
      `│  ${data.details || "—"}`,
    ];
    if (data.propertyUrl) {
      lines.push(`│  🔗 <a href="${data.propertyUrl}">Xem chi tiết BĐS</a>`);
    }
    lines.push(
      `│`,
      `├─ 📋 Nhu cầu: ${data.consultationType || "—"}`,
      `└─ 🕐 ${time}`,
    );
    return lines.join("\n");
  }

  // ── Consignment Form (Ký gửi) ──
  if (source.includes("Ký Gửi")) {
    let imagesText = "";
    if (data.images && data.images.length > 0) {
      imagesText =
        "\n│\n├─ 📸 Hình ảnh\n" +
        data.images
          .map((url: string, i: number) => `│  <a href="${url}">Ảnh ${i + 1}</a>`)
          .join("\n");
    }

    return [
      `📋 <b>YÊU CẦU KÝ GỬI MỚI</b>`,
      ``,
      `┌─ 👤 Chủ sở hữu`,
      `│  Tên: <b>${data.fullName || "—"}</b>`,
      `│  SĐT: <b>${data.phone || "—"}</b>`,
      `│`,
      `├─ 🏠 Thông tin tài sản`,
      `│  Loại: ${data.consultationType || "—"}`,
      `│  Giá: ${data.details || "—"}`,
      `│  Địa chỉ: ${data.address || "—"}`,
      imagesText,
      `│`,
      `└─ 🕐 ${time}`,
    ]
      .filter(Boolean)
      .join("\n");
  }

  // ── Contact Form (Liên hệ VIP) ──
  if (source.includes("Liên Hệ") || source.includes("VIP")) {
    return [
      `⭐ <b>LIÊN HỆ TƯ VẤN VIP</b>`,
      ``,
      `┌─ 👤 Khách hàng`,
      `│  Tên: <b>${data.fullName || "—"}</b>`,
      `│  SĐT: <b>${data.phone || "—"}</b>`,
      `│  Email: ${data.email || "—"}`,
      `│`,
      `├─ 📌 Nhu cầu`,
      `│  Lĩnh vực: ${data.consultationType || "—"}`,
      `│  Chi tiết: ${data.details || "—"}`,
      `│`,
      `└─ 🕐 ${time}`,
    ].join("\n");
  }

  // ── Lead Capture Form (Trang chủ) ──
  if (source.includes("Lead Capture") || source.includes("Trang Chủ")) {
    return [
      `📥 <b>ĐĂNG KÝ NHẬN TÀI LIỆU</b>`,
      ``,
      `┌─ 👤 Khách hàng`,
      `│  Tên: <b>${data.fullName || "—"}</b>`,
      `│  SĐT: <b>${data.phone || "—"}</b>`,
      `│`,
      `├─ 📍 ${data.details || "—"}`,
      `└─ 🕐 ${time}`,
    ].join("\n");
  }

  // ── Fallback (các form khác) ──
  return [
    `📩 <b>THÔNG BÁO MỚI</b>`,
    ``,
    `┌─ 👤 ${data.fullName || "—"} • ${data.phone || "—"}`,
    `├─ 📌 ${data.consultationType || "—"}`,
    `├─ 📝 ${data.details || "—"}`,
    `├─ 📍 Nguồn: ${source}`,
    `└─ 🕐 ${time}`,
  ].join("\n");
}

export async function sendTelegramNotification(data: TelegramData) {
  const botToken = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;

  if (!botToken || !chatId) {
    console.error("Missing Telegram configuration");
    return { success: false, error: "Missing config" };
  }

  const message = formatMessage(data);
  const url = `https://api.telegram.org/bot${botToken}/sendMessage`;

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        chat_id: chatId,
        text: message,
        parse_mode: "HTML",
        disable_web_page_preview: true,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Failed to send to Telegram:", errorText);
      return { success: false, error: errorText };
    }

    return { success: true };
  } catch (error) {
    console.error("Error sending to Telegram:", error);
    return { success: false, error: "Failed to send" };
  }
}
