import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { MainNavbar } from "@/components/organisms/header/MainNavbar";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Airbnb Clone MVP",
    template: "%s | Airbnb Clone MVP",
  },
  description: "MVP de alquiler vacacional con Next.js, TypeScript y checkout seguro.",
  metadataBase: new URL("https://example.com"),
  openGraph: {
    title: "Airbnb Clone MVP",
    description: "Reserva alojamientos con experiencia moderna y pago seguro.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-[#f7f7f7]">
        <MainNavbar />
        {children}
      </body>
    </html>
  );
}
