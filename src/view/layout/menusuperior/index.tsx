import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Sheet, SheetClose, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetOverlay, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Usuario } from "@/types/Usuario";
import { ArrowLeftIcon, BaggageClaimIcon, MinusIcon, PlusIcon, ShoppingCartIcon, TrashIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function MenuSuperior() {
    const [quantidadeCarrinho, setQuantidadeCarrinho] = useState(0);
    const [usuarioLogado, setUsuarioLogado] = useState<Usuario>();

    useEffect(() => {
        recuperarUsuarioLogado();
        const carrinho = localStorage.getItem("carrinho");
        if (carrinho) {
            const carrinhoObj = JSON.parse(carrinho);
            setQuantidadeCarrinho(carrinhoObj.length);
        }
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
            <div className="flex items-center gap-3">
                <img src="/src/assets/logo.png" alt="Logo" className="h-7" />
                <Label className="text-white">Mint E-commerce</Label>
            </div>
            <div className="flex">
                {usuarioLogado && <div className="flex justify-center items-center gap-3">
                    <AlertDialog >
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant={"ghost"} className="gap-3">
                                    <Label className="text-white cursor-pointer ">Olá, {usuarioLogado?.nome}</Label>
                                    <Avatar className="flex h-7 w-7">
                                        <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                                        <AvatarFallback>CN</AvatarFallback>
                                    </Avatar>
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                                <DropdownMenuItem>
                                    <Link to="/perfil">
                                        Minha conta
                                    </Link>
                                </DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem>
                                    <Link to="/configuracoes">
                                        Configurações
                                    </Link>
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                    <Link to="/ajuda">
                                        Ajuda
                                    </Link>
                                </DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem>
                                    <AlertDialogTrigger className="w-full text-left">
                                        Sair
                                    </AlertDialogTrigger>
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                        <AlertDialogContent>
                            <AlertDialogHeader>
                                <AlertDialogTitle>Sair</AlertDialogTitle>
                                <AlertDialogDescription>
                                    Deseja realmente sair?
                                </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                                <AlertDialogCancel>Cancelar</AlertDialogCancel>
                                <AlertDialogAction onClick={() => sair()}>
                                    <Link to="/">
                                        Sair
                                    </Link>
                                </AlertDialogAction>
                            </AlertDialogFooter>
                        </AlertDialogContent>
                    </AlertDialog>
                </div>}
                {
                    !usuarioLogado && <div>
                        <Link to='/criarconta'>
                            <Button variant={"link"} className="text-white" >Criar conta</Button>
                        </Link>
                        <Link to='/entrar'>
                            <Button variant={"link"} className="text-white" >Entrar</Button>
                        </Link>
                    </div>
                }
                <div>
                    <Sheet>
                        <SheetTrigger asChild>
                            <Button variant={"ghost"}>
                                <div className="fixed left-[97.5%] top-2 bg-primary w-5 h-5 border rounded-full flex items-center justify-center cursor-pointer">
                                    <Label className="text-black cursor-pointer">{(quantidadeCarrinho > 0) ? quantidadeCarrinho : '+'}</Label>
                                </div>
                                <ShoppingCartIcon />
                            </Button>
                        </SheetTrigger>
                        <SheetContent>
                            <SheetHeader>
                                <SheetTitle className="flex gap-2">
                                    <ShoppingCartIcon />
                                    Meu Carrinho
                                </SheetTitle>
                                <SheetDescription>
                                    Itens adicionados ao carrinho
                                </SheetDescription>
                            </SheetHeader>
                            <ScrollArea className=" py-5 px-3 w-full h-[49rem]">
                                <div className="flex flex-col gap-5 w-full h-full">
                                    <Card className="w-full max-w-sm p-6 grid gap-6">
                                        <div className="grid grid-cols-[100px_1fr] gap-4">
                                            <img
                                                src="/src/assets/logo.png"
                                                alt="Product Image"
                                                width={120}
                                                height={120}
                                                className="aspect-square object-cover rounded-md"
                                            />
                                            <div className="grid gap-2">
                                                <div className="flex items-center justify-between">
                                                    <h3 className="font-semibold">Cozy Blanket</h3>
                                                    <div className="text-2xl font-bold">$29.99</div>
                                                </div>
                                                <p className="text-sm text-gray-500 dark:text-gray-400">Warm and Soft for Chilly Nights</p>
                                                <div className="flex items-center gap-4">
                                                    <Button variant="outline" size="icon">
                                                        <MinusIcon className="h-4 w-4" />
                                                    </Button>
                                                    <div className="text-lg font-medium">2</div>
                                                    <Button variant="outline" size="icon">
                                                        <PlusIcon className="h-4 w-4" />
                                                    </Button>
                                                    <Button variant={"destructive"} >
                                                        <TrashIcon className="h-4 w-4" />
                                                    </Button>
                                                </div>
                                            </div>
                                        </div>
                                    </Card>
                                    <Card className="w-full max-w-sm p-6 grid gap-6">
                                        <div className="grid grid-cols-[100px_1fr] gap-4">
                                            <img
                                                src="/src/assets/logo.png"
                                                alt="Product Image"
                                                width={120}
                                                height={120}
                                                className="aspect-square object-cover rounded-md"
                                            />
                                            <div className="grid gap-2">
                                                <div className="flex items-center justify-between">
                                                    <h3 className="font-semibold">Cozy Blanket</h3>
                                                    <div className="text-2xl font-bold">$29.99</div>
                                                </div>
                                                <p className="text-sm text-gray-500 dark:text-gray-400">Warm and Soft for Chilly Nights</p>
                                                <div className="flex items-center gap-4">
                                                    <Button variant="outline" size="icon">
                                                        <MinusIcon className="h-4 w-4" />
                                                    </Button>
                                                    <div className="text-lg font-medium">2</div>
                                                    <Button variant="outline" size="icon">
                                                        <PlusIcon className="h-4 w-4" />
                                                    </Button>
                                                    <Button variant={"destructive"} >
                                                        <TrashIcon className="h-4 w-4" />
                                                    </Button>
                                                </div>
                                            </div>
                                        </div>
                                    </Card>
                                    <Card className="w-full max-w-sm p-6 grid gap-6">
                                        <div className="grid grid-cols-[100px_1fr] gap-4">
                                            <img
                                                src="/src/assets/logo.png"
                                                alt="Product Image"
                                                width={120}
                                                height={120}
                                                className="aspect-square object-cover rounded-md"
                                            />
                                            <div className="grid gap-2">
                                                <div className="flex items-center justify-between">
                                                    <h3 className="font-semibold">Cozy Blanket</h3>
                                                    <div className="text-2xl font-bold">$29.99</div>
                                                </div>
                                                <p className="text-sm text-gray-500 dark:text-gray-400">Warm and Soft for Chilly Nights</p>
                                                <div className="flex items-center gap-4">
                                                    <Button variant="outline" size="icon">
                                                        <MinusIcon className="h-4 w-4" />
                                                    </Button>
                                                    <div className="text-lg font-medium">2</div>
                                                    <Button variant="outline" size="icon">
                                                        <PlusIcon className="h-4 w-4" />
                                                    </Button>
                                                    <Button variant={"destructive"} >
                                                        <TrashIcon className="h-4 w-4" />
                                                    </Button>
                                                </div>
                                            </div>
                                        </div>
                                    </Card>
                                    <Card className="w-full max-w-sm p-6 grid gap-6">
                                        <div className="grid grid-cols-[100px_1fr] gap-4">
                                            <img
                                                src="/src/assets/logo.png"
                                                alt="Product Image"
                                                width={120}
                                                height={120}
                                                className="aspect-square object-cover rounded-md"
                                            />
                                            <div className="grid gap-2">
                                                <div className="flex items-center justify-between">
                                                    <h3 className="font-semibold">Cozy Blanket</h3>
                                                    <div className="text-2xl font-bold">$29.99</div>
                                                </div>
                                                <p className="text-sm text-gray-500 dark:text-gray-400">Warm and Soft for Chilly Nights</p>
                                                <div className="flex items-center gap-4">
                                                    <Button variant="outline" size="icon">
                                                        <MinusIcon className="h-4 w-4" />
                                                    </Button>
                                                    <div className="text-lg font-medium">2</div>
                                                    <Button variant="outline" size="icon">
                                                        <PlusIcon className="h-4 w-4" />
                                                    </Button>
                                                    <Button variant={"destructive"} >
                                                        <TrashIcon className="h-4 w-4" />
                                                    </Button>
                                                </div>
                                            </div>
                                        </div>
                                    </Card>
                                    <Card className="w-full max-w-sm p-6 grid gap-6">
                                        <div className="grid grid-cols-[100px_1fr] gap-4">
                                            <img
                                                src="/src/assets/logo.png"
                                                alt="Product Image"
                                                width={120}
                                                height={120}
                                                className="aspect-square object-cover rounded-md"
                                            />
                                            <div className="grid gap-2">
                                                <div className="flex items-center justify-between">
                                                    <h3 className="font-semibold">Cozy Blanket</h3>
                                                    <div className="text-2xl font-bold">$29.99</div>
                                                </div>
                                                <p className="text-sm text-gray-500 dark:text-gray-400">Warm and Soft for Chilly Nights</p>
                                                <div className="flex items-center gap-4">
                                                    <Button variant="outline" size="icon">
                                                        <MinusIcon className="h-4 w-4" />
                                                    </Button>
                                                    <div className="text-lg font-medium">2</div>
                                                    <Button variant="outline" size="icon">
                                                        <PlusIcon className="h-4 w-4" />
                                                    </Button>
                                                    <Button variant={"destructive"} >
                                                        <TrashIcon className="h-4 w-4" />
                                                    </Button>
                                                </div>
                                            </div>
                                        </div>
                                    </Card>
                                    <Card className="w-full max-w-sm p-6 grid gap-6">
                                        <div className="grid grid-cols-[100px_1fr] gap-4">
                                            <img
                                                src="/src/assets/logo.png"
                                                alt="Product Image"
                                                width={120}
                                                height={120}
                                                className="aspect-square object-cover rounded-md"
                                            />
                                            <div className="grid gap-2">
                                                <div className="flex items-center justify-between">
                                                    <h3 className="font-semibold">Cozy Blanket</h3>
                                                    <div className="text-2xl font-bold">$29.99</div>
                                                </div>
                                                <p className="text-sm text-gray-500 dark:text-gray-400">Warm and Soft for Chilly Nights</p>
                                                <div className="flex items-center gap-4">
                                                    <Button variant="outline" size="icon">
                                                        <MinusIcon className="h-4 w-4" />
                                                    </Button>
                                                    <div className="text-lg font-medium">2</div>
                                                    <Button variant="outline" size="icon">
                                                        <PlusIcon className="h-4 w-4" />
                                                    </Button>
                                                    <Button variant={"destructive"} >
                                                        <TrashIcon className="h-4 w-4" />
                                                    </Button>
                                                </div>
                                            </div>
                                        </div>
                                    </Card>
                                    <Card className="w-full max-w-sm p-6 grid gap-6">
                                        <div className="grid grid-cols-[100px_1fr] gap-4">
                                            <img
                                                src="/src/assets/logo.png"
                                                alt="Product Image"
                                                width={120}
                                                height={120}
                                                className="aspect-square object-cover rounded-md"
                                            />
                                            <div className="grid gap-2">
                                                <div className="flex items-center justify-between">
                                                    <h3 className="font-semibold">Cozy Blanket</h3>
                                                    <div className="text-2xl font-bold">$29.99</div>
                                                </div>
                                                <p className="text-sm text-gray-500 dark:text-gray-400">Warm and Soft for Chilly Nights</p>
                                                <div className="flex items-center gap-4">
                                                    <Button variant="outline" size="icon">
                                                        <MinusIcon className="h-4 w-4" />
                                                    </Button>
                                                    <div className="text-lg font-medium">2</div>
                                                    <Button variant="outline" size="icon">
                                                        <PlusIcon className="h-4 w-4" />
                                                    </Button>
                                                    <Button variant={"destructive"} >
                                                        <TrashIcon className="h-4 w-4" />
                                                    </Button>
                                                </div>
                                            </div>
                                        </div>
                                    </Card>
                                </div>
                            </ScrollArea>
                            <SheetFooter className="items-end">
                                <SheetClose asChild>
                                    <Button variant={"outline"} className="gap-2">
                                        <ArrowLeftIcon size={16} />
                                        Voltar
                                    </Button>
                                </SheetClose>
                                <SheetClose asChild>
                                    <Button className="w-[70%] gap-2" type="submit">
                                        <BaggageClaimIcon size={16} />
                                        Finalizar Pedido
                                    </Button>
                                </SheetClose>
                            </SheetFooter>
                        </SheetContent>
                    </Sheet>
                </div>
            </div >
        </div >
    );
};