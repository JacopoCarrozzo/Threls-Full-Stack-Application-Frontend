import { Text } from "@/lib/components/atoms/Text";
import { Logo } from "@/lib/components/molecules/Logo";

export const Footer = () => {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="threls-primary text-white py-12">
            <div className="container mx-auto px-6 text-center">
                <div className="flex justify-center items-center space-x-3 mb-6">
                    <Logo /> 
                </div>
                <Text className="text-white/80 text-lg mb-4">
                    © {currentYear} Threls. All rights reserved.
                </Text>
            </div>
        </footer>
    );
};