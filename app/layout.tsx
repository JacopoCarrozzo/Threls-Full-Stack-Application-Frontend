import type { Metadata } from "next";
import "./globals.css";
import { getMenus } from "@/lib/api";

import { Header } from "@/lib/components/organisms/Header";
import { Footer } from "@/lib/components/organisms/Footer"; 

export const metadata: Metadata = {
  title: "Threls",
  description: "Threls - Innovation, passion, and future",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  let menus: any[] = [];
  try {
    menus = await getMenus();
  } catch (error) {
    console.error("Failed to fetch menus:", error);
  }

  const mainMenu = menus.find((m: any) => m.name === "main menu");
  
  const mainMenuLinks = mainMenu?.links || [];

  return (
    <html lang="en" className="scroll-smooth">
      <body className="flex flex-col min-h-screen bg-white text-gray-900 font-sans antialiased">
        
        <Header mainMenuLinks={mainMenuLinks} />
        
        <main className="flex-grow">
          {children}
        </main>
        
        <Footer />
        
      </body>
    </html>
  );
}