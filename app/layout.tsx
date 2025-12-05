import type { Metadata } from "next";
import "./globals.css";
import { getMenus } from "@/lib/api"; 

export const metadata: Metadata = {
  title: "Threls Front-End",
  description: "Threls Front-End to fetch json data from api",
};

interface MenuItem {
    label: string;
    url?: string;
    page: { slug: string; } | null;
}

interface Menu {
    identifier: string; 
    links: MenuItem[];
}

export default async function RootLayout({children,}: Readonly<{children: React.ReactNode;}>) 
{
    let menus: Menu[] = [];
    try {
        menus = await getMenus();
    } catch (error) {
        console.error("Failed to fetch menus:", error);
    }

    const mainMenu = menus.find((m: any) => m.name === 'main-menu'); 


  return (
    <html lang="en">
            <body className="flex flex-col min-h-screen">

                {/*Header*/}

                <header className="bg-cyan-700 p-4 text-white">
                    <div className="container mx-auto flex justify-center items-center">
                        <nav>
                            <ul className="flex space-x-6">
                                {mainMenu?.links.map((link, index) => {
                                    
                                    let linkUrl: string | undefined;

                                    if (link.page?.slug) {
                                        linkUrl = `/${link.page.slug}`;
                                    } else if (link.url && (link.url === 'https://placeholder.com/' || link.url === '/')) {
                                        linkUrl = '/'; 
                                    } else if (link.url) {
                                        // If it's a real external URL (e.g. Google), use it directly
                                        linkUrl = link.url;
                                    }
                                    // Ignore links without a valid URL
                                    if (!linkUrl) return null;

                                    return (
                                        <li key={index}>
                                            <a href={linkUrl} className="hover:text-blue-400">
                                                {link.label}
                                            </a>
                                        </li>
                                    );
                                })}
                            </ul>
                        </nav>
                    </div>
                </header>
                
                {/*Main*/}

                <main className="container mx-auto p-8 flex-grow">
                    {children}
                </main>

                {/*Footer*/}

                <footer className="bg-cyan-700 p-4 text-center">
                    © {new Date().getFullYear()} Threls Footer
                </footer>

            </body>
        </html>
  );
}
