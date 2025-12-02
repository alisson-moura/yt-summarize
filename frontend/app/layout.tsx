import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { loaders } from "@/data/loader";
import { validateApiResponse } from "@/lib/error-handler";
import { Header } from "@/components/custom/header";
import "./globals.css";
import { Footer } from "@/components/custom/footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export async function generateMetadata(): Promise<Metadata> {
  const metadata = await loaders.getMetaData();

  return {
    title: metadata?.data?.title ?? "",
    description: metadata?.data?.description ?? "",
  };
}


export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const globalDataResponse = await loaders.getGlobalData();
  const globalData = validateApiResponse(globalDataResponse, "global")

  return (
    <html lang="pt-BR">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Header data={globalData.header} />
        {children}
        <Footer data={globalData.footer} />
      </body>
    </html>
  );
}
