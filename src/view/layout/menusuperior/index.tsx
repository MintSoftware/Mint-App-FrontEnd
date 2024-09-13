import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog"; 
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Label } from "@/components/ui/label";
import { Usuario } from "@/types/Usuario";
import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";

export default function MenuSuperior() {

    const [usuarioLogado, setUsuarioLogado] = useState<Usuario>();
    const location = useLocation();

    useEffect(() => {
        recuperarUsuarioLogado();
    }, [location.state]);

    useEffect(() => {
        recuperarUsuarioLogado();
    }, []);

    const recuperarUsuarioLogado = () => {
        const usuario = localStorage.getItem("UsuarioLogado");
        if (usuario) {
            setUsuarioLogado(JSON.parse(usuario));
        }
        return null;
    };

    const sair = () => {
        localStorage.removeItem("UsuarioLogado");
        setUsuarioLogado(undefined);
    }

    return (
        <div className="sticky top-0 z-30 flex h-14 w-full justify-between items-center gap-4 border-b bg-background px-4 pt-2 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
            <header className="flex justify-center items-center w-full pl-20 pb-3">
                <img src="/logo.png?height=50&width=150" alt="Logo" className="h-12" />
            </header>
            <div className="flex items-center gap-3 pb-3">
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant={"ghost"} className="gap-3">
                            {usuarioLogado ? (
                                <>
                                    <Avatar className="flex h-8 w-8">
                                        <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                                        <AvatarFallback>{usuarioLogado.nome.charAt(0)}</AvatarFallback>
                                    </Avatar>
                                </>
                            ) : (
                                <>
                                    <Avatar className="flex h-9 w-9">
                                        <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                                        <AvatarFallback>?</AvatarFallback> {/* Avatar de fallback quando não logado */}
                                    </Avatar>
                                </>
                            )}
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        {usuarioLogado ? (
                            <>
                                <DropdownMenuItem asChild>
                                    <Link className="cursor-pointer" to="/perfil">
                                        Minha conta
                                    </Link>
                                </DropdownMenuItem>
                                <DropdownMenuItem asChild>
                                    <Link className="cursor-pointer" to="/MinhasReservas">
                                        Minhas Reservas
                                    </Link>
                                </DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem>
                                    <AlertDialog>
                                        <AlertDialogTrigger asChild>
                                            <Button variant="ghost" className="w-full text-left">Sair</Button>
                                        </AlertDialogTrigger>
                                        <AlertDialogContent>
                                            <AlertDialogHeader>
                                                <AlertDialogTitle>Sair</AlertDialogTitle>
                                                <AlertDialogDescription>
                                                    Deseja realmente sair?
                                                </AlertDialogDescription>
                                            </AlertDialogHeader>
                                            <AlertDialogFooter>
                                                <AlertDialogCancel>Cancelar</AlertDialogCancel>
                                                <AlertDialogAction >
                                                    <Link to="/entrar">Sair</Link>
                                                </AlertDialogAction>
                                            </AlertDialogFooter>
                                        </AlertDialogContent>
                                    </AlertDialog>
                                </DropdownMenuItem>
                            </>
                        ) : (
                            <>
                                <DropdownMenuItem asChild>
                                    <Link className="cursor-pointer" to="/criarconta">
                                        Criar conta
                                    </Link>
                                </DropdownMenuItem>
                                <DropdownMenuItem asChild>
                                    <Link className="cursor-pointer" to="/entrar">
                                        Entrar
                                    </Link>
                                </DropdownMenuItem>
                            </>
                        )}
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
        </div>
    );
}
