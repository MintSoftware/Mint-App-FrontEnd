import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Api from "@/infra/helpers/api";
import { useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "sonner";

export default function Entrar() {
    const [email, setEmail] = useState(""),
        [senha, setSenha] = useState("");

    const logar = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const dto = {
            email,
            senha
        }

        try {
            const { data } = await Api.post("usuario/entrar", dto);
            const UsuarioLogado = JSON.stringify(data);
            localStorage.setItem("UsuarioLogado", UsuarioLogado);
            window.location.href = "/";
        } catch (error: any) {
            toast.error("Erro ao logar!");
        }
    }

    return (
        <div className="fixed flex justify-center items-center w-full h-full bg-background z-50 top-0 left-0 border">
            <Link to="/">
                <div className="fixed top-0 left-5 w-[15%] h-[10%] cursor-pointer flex  items-center">
                    <img src="logo.png" alt="Logo" className="w-14 h-14" />
                    <div className="flex flex-col justify-center items-center p-3">
                        <Label className="text-white cursor-pointer">Mint E-commerce</Label>
                        <Label className="text-white font-normal cursor-pointer">Uma empresa do grupo Mint</Label>
                    </div>
                </div>
            </Link>
            <form onSubmit={logar}>
                <Card className="mx-auto max-w-sm w-full h-full">
                    <CardHeader>
                        <CardTitle className="text-2xl">Entrar</CardTitle>
                        <CardDescription>
                            Insira seu e-mail abaixo para fazer login na sua conta
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="grid gap-4">
                            <div className="grid gap-2">
                                <Label htmlFor="email">E-mail</Label>
                                <Input
                                    id="email"
                                    type="email"
                                    placeholder="jose.silva@mintecommerce.com.br"
                                    required
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>
                            <div className="grid gap-2">
                                <div className="flex items-center">
                                    <Label htmlFor="password">Senha</Label>
                                    <Link to="/recuperarsenha" className="ml-auto inline-block text-sm underline">
                                        Esqueceu sua senha?
                                    </Link>
                                </div>
                                <Input id="password" type="password" placeholder="senha" required onChange={(e) => setSenha(e.target.value)} />
                            </div>
                            <Button type="submit" className="w-full">
                                Entrar
                            </Button>
                            <Button variant="outline" className="w-full">
                                Entrar com o Google
                            </Button>
                        </div>
                        <div className="mt-4 text-center text-sm">
                            Não tem uma conta?{" "}
                            <Link to="/criarconta" className="underline">
                                Cadastre-se
                            </Link>
                        </div>
                    </CardContent>
                </Card>
            </form>
        </div>
    )
}