import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ShoppingCartIcon } from "lucide-react";

export default function MenuSuperior() {
    return (
        <div className="flex flex-row justify-end gap-5 m-3 items-center">
            <Avatar>
                <AvatarImage src="https://github.com/shadcn.png" />
                <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <div>
                <ShoppingCartIcon />
            </div>
        </div>
    );
};