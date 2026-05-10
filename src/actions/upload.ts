"use server";

export async function uploadImageServerAction(formData: FormData): Promise<string> {
  const file = formData.get("image") as File | null;
  if (!file) {
    throw new Error("No image file provided");
  }

  // Use the IMGBB key from environment variable (on the server, not exposed to client)
  // Fallback to NEXT_PUBLIC version if the server one isn't set yet
  const API_KEY = process.env.IMGBB_API_KEY || process.env.NEXT_PUBLIC_IMGBB_API_KEY;
  
  if (!API_KEY) {
    throw new Error("ImgBB API key not configured");
  }

  // Convert File to Base64 to safely send over server-side fetch without FormData boundary issues
  const arrayBuffer = await file.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);
  const base64Image = buffer.toString("base64");

  const uploadData = new FormData();
  uploadData.append("image", base64Image);
  uploadData.append("key", API_KEY);

  const response = await fetch("https://api.imgbb.com/1/upload", {
    method: "POST",
    body: uploadData,
  });

  if (!response.ok) {
    throw new Error(`Upload failed: ${response.statusText}`);
  }

  const data = await response.json();

  if (!data.success) {
    throw new Error("Upload failed: " + (data.error?.message || "Unknown error"));
  }

  return data.data.url;
}
