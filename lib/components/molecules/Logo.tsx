import Link from "next/link";
import { Text } from "@/lib/components/atoms/Text";

export const Logo = () => {

    return (
        <Link href="/" className="flex items-center space-x-3 group">
            <Text className="text-2xl font-bold text-white tracking-tight">Threls</Text>
        </Link>
    );
}