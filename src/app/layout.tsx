import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import { MainLayoutWrapper } from "@/components/MainLayoutWrapper";

const inter = Inter({
  subsets: ["latin", "vietnamese"],
  variable: "--font-inter",
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin", "vietnamese"],
  variable: "--font-playfair",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Pham Land - Đất Nền Miền Trung | Đà Nẵng, Quảng Nam, Quảng Bình",
    template: "%s | Pham Land",
  },
  description:
    "Pham Land - Chuyên trang tư vấn & phân phối đất nền, căn hộ tại Đà Nẵng, Quảng Nam, Quảng Bình. Pháp lý minh bạch, giá tốt nhất thị trường, hỗ trợ toàn diện.",
  keywords: [
    "đất nền Đà Nẵng",
    "đất nền Quảng Nam",
    "đất nền Quảng Bình",
    "bất động sản miền Trung",
    "mua đất nền",
    "căn hộ Đà Nẵng",
    "Pham Land",
    "đầu tư đất nền",
    "đất nền ven biển",
    "khu đô thị Đà Nẵng",
  ],
  authors: [{ name: "Pham Land Real Estate" }],
  creator: "Pham Land",
  publisher: "Pham Land",
  formatDetection: {
    telephone: true,
    email: true,
  },
  metadataBase: new URL("https://phamland.vn"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "vi_VN",
    url: "https://phamland.vn",
    siteName: "Pham Land",
    title: "Pham Land - Đất Nền Miền Trung | Đà Nẵng, Quảng Nam, Quảng Bình",
    description:
      "Chuyên trang tư vấn & phân phối đất nền, căn hộ tại Đà Nẵng, Quảng Nam, Quảng Bình. Pháp lý minh bạch, hỗ trợ toàn diện.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Pham Land - Bất Động Sản Miền Trung",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Pham Land - Đất Nền Miền Trung",
    description:
      "Chuyên trang tư vấn & phân phối đất nền, căn hộ tại Đà Nẵng, Quảng Nam, Quảng Bình.",
    images: ["/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "RealEstateAgent",
  name: "Pham Land",
  description:
    "Đơn vị tư vấn bất động sản uy tín hàng đầu tại Miền Trung. Chuyên đất nền, căn hộ tại Đà Nẵng, Quảng Nam, Quảng Bình.",
  url: "https://phamland.vn",
  telephone: "+84905000000",
  email: "info@phamland.vn",
  address: {
    "@type": "PostalAddress",
    streetAddress: "88 Nguyễn Văn Linh",
    addressLocality: "Q. Hải Châu",
    addressRegion: "TP. Đà Nẵng",
    addressCountry: "VN",
  },
  areaServed: [
    { "@type": "City", name: "Đà Nẵng" },
    { "@type": "AdministrativeArea", name: "Quảng Nam" },
    { "@type": "AdministrativeArea", name: "Quảng Bình" },
  ],
  sameAs: [],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap"
          rel="stylesheet"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className={`${inter.variable} ${playfair.variable} font-sans bg-background-light text-slate-800 antialiased selection:bg-accent/20 selection:text-accent`}>
        <MainLayoutWrapper>{children}</MainLayoutWrapper>
      </body>
    </html>
  );
}
