import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { ShoppingCartIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function MenuSuperior() {
    const [quantidadeCarrinho, setQuantidadeCarrinho] = useState(0);

    useEffect(() => {
        const carrinho = localStorage.getItem("carrinho");
        if (carrinho) {
            const carrinhoObj = JSON.parse(carrinho);
            setQuantidadeCarrinho(carrinhoObj.length);
        }
    }, []);

    return (
        <div className="sticky top-0 z-30 flex h-14 w-full justify-end items-center gap-4 border-b bg-background px-4 pt-2 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
            <Link to='/criarconta'>
                <Button variant={"link"} className="text-white" >Criar conta</Button>
            </Link>
            <Link to='/entrar'>
                <Button variant={"link"} className="text-white" >Entrar</Button>
            </Link>
            <div>
                <div className="fixed left-[97.5%] bg-primary w-5 h-5 border rounded-full flex items-center justify-center">
                    <Label className="text-black">{(quantidadeCarrinho > 0)? quantidadeCarrinho : '+'}</Label>
                </div>
                <Button variant={"ghost"} className="ficxe z-30">
                    <ShoppingCartIcon />
                </Button>
            </div>
        </div>
    );
};