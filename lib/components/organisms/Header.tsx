import { Logo } from "@/lib/components/molecules/Logo";
import { NavigationMenu } from "@/lib/components/molecules/NavigationMenu";

interface HeaderProps {
    mainMenuLinks: any[];
}

export const Header = ({ mainMenuLinks }: HeaderProps) => {
    return (
        <header className="threls-primary shadow-2xl sticky top-0 z-50">
            <div className="container mx-auto px-6 py-5">
                <div className="flex justify-between items-center">
                    <Logo /> 
                    {mainMenuLinks.length > 0 && (
                        <NavigationMenu links={mainMenuLinks} />
                    )}
                </div>
            </div>
        </header>
    );
};