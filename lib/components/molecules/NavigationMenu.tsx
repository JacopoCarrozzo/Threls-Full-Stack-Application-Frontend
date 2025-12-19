import { NavLink } from "@/lib/components/atoms/NavLink";

interface MenuItem {
  label: string;
  url?: string;
  page: { slug: string } | null;
}

interface NavigationMenuProps {
  links: MenuItem[];
}

export const NavigationMenu = ({ links }: NavigationMenuProps) => {
  return (
    <nav>
      <ul className="flex items-center space-x-10">
        {links.map((link, index) => {
          let href = "/";
          if (link.page?.slug) href = `/${link.page.slug}`;
          else if (link.url && link.url !== "https://placeholder.com/" && link.url !== "/") href = link.url;

          const isExternal = href.startsWith("http");

          return (
            <li key={index}>
              <NavLink
                href={href}
                label={link.label}
                isExternal={isExternal}
              />
            </li>
          );
        })}
      </ul>
    </nav>
  );
};