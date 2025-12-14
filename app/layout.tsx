import type { Metadata } from "next";
import "./globals.css";
import { getMenus } from "@/lib/api";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Threls",
  description: "Threls - Innovation, passion, and future",
};

interface MenuItem {
  label: string;
  url?: string;
  page: { slug: string } | null;
}

interface Menu {
  identifier: string;
  links: MenuItem[];
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  let menus: Menu[] = [];
  try {
    menus = await getMenus();
  } catch (error) {
    console.error("Failed to fetch menus:", error);
  }

  const mainMenu = menus.find((m: any) => m.name === "main menu");

  return (
    <html lang="en" className="scroll-smooth">
      <body className="flex flex-col min-h-screen bg-white text-gray-900 font-sans antialiased">
        <header className="threls-primary shadow-2xl sticky top-0 z-50">
          <div className="container mx-auto px-6 py-5">
            <div className="flex justify-between items-center">
              <Link href="/" className="flex items-center space-x-3 group">
                <div className="relative">
                  <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
                    <span className="text-xl font-bold text-white">T</span>
                  </div>
                </div>
                <span className="text-2xl font-bold text-white tracking-tight">Threls</span>
              </Link>

              <nav>
                <ul className="flex items-center space-x-10">
                  {mainMenu?.links.map((link, index) => {
                    let href = "/";
                    if (link.page?.slug) href = `/${link.page.slug}`;
                    else if (link.url && link.url !== "https://placeholder.com/" && link.url !== "/") href = link.url;

                    const isExternal = href.startsWith("http");

                    return (
                      <li key={index}>
                        {isExternal ? (
                          <a
                            href={href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-white/90 font-medium text-lg hover:text-white transition-all duration-300 relative group/nav"
                          >
                            {link.label}
                            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-white group-hover/nav:w-full transition-all duration-300" />
                          </a>
                        ) : (
                          <Link
                            href={href}
                            className="text-white/90 font-medium text-lg hover:text-white transition-all duration-300 relative group/nav"
                          >
                            {link.label}
                            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-white group-hover/nav:w-full transition-all duration-300" />
                          </Link>
                        )}
                      </li>
                    );
                  })}
                </ul>
              </nav>
            </div>
          </div>
        </header>

        <main className="flex-grow">
          {children}
        </main>

        <footer className="threls-primary text-white py-12">
          <div className="container mx-auto px-6 text-center">
            <div className="flex justify-center items-center space-x-3 mb-6">
              <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
                <span className="text-xl font-bold">T</span>
              </div>
              <span className="text-2xl font-bold">Threls</span>
            </div>
            <p className="text-white/80 text-lg mb-4">
              © {new Date().getFullYear()} Threls. All rights reserved.
            </p>
          </div>
        </footer>

      </body>
    </html>
  );
}