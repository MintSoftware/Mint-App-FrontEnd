import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Produto } from "@/types/Produto";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";

export default function Entrar() {
    const navigate = useNavigate();
    const [produtos, setProdutos] = useState<Produto>();
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");
    console.log(setProdutos);

    const logar = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const dto = {
            email,
            senha
        }

        if (dto.email === "admin@mintecommerce.com.br" && dto.senha === "admin") {
            try {
                {/*const { data } = await Api.post("usuario/entrar", dto);*/}
                const data = { id: 1, nome: "Admin", email: "admin@mintecommerce.com.br" };

                const UsuarioLogado = JSON.stringify(data);
                localStorage.setItem("UsuarioLogado", UsuarioLogado);
                toast.success("Logado com sucesso!");
                navigate("/menuInicial", { state: { produtos } });
            } catch (error: any) {
                toast.error("Erro ao logar!");
            }
        } else {
            toast.error("Usuário ou senha inválidos!");
        }
    }

    return (
        <div className="fixed flex justify-center items-center w-full h-full bg-background z-50 top-0 left-0 border">
            <Link to="/">
                <div className="fixed top-0 left-5 w-[15%] h-[10%] cursor-pointer flex  items-center">
                    <img src="logo.png" alt="Logo" className="w-14 h-14" />
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
                                    placeholder="seu_usuario@mintecommerce.com.br"
                                    required
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>
                            <div className="grid gap-2">
                                <div className="flex items-center">
                                    <Label htmlFor="password">Senha</Label>
                                </div>
                                <Input id="password" type="password" placeholder="senha" required onChange={(e) => setSenha(e.target.value)} />
                            </div>
                            <Button type="submit" className="w-full">
                                Entrar
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