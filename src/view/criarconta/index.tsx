import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Link } from "react-router-dom"

export default function CriarConta() {

    const handleNextClick = () => {
        <TabsContent value="address" />
    };

    return (
        <Tabs className="mx-auto max-w-sm" defaultValue="info">
            <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="info">Informações</TabsTrigger>
                <TabsTrigger value="address">Endereço</TabsTrigger>
            </TabsList>
            <TabsContent value="info">
                <Card>
                    <CardHeader>
                        <CardTitle className="text-xl">Cadastre-se</CardTitle>
                        <CardDescription>Insira suas informações para criar uma conta</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="grid gap-4">
                            <div className="grid grid-cols-2 gap-4">
                                <div className="grid gap-2">
                                    <Label htmlFor="nome">Nome</Label>
                                    <Input id="nome" placeholder="Max" required />
                                </div>
                                <div className="grid gap-2">
                                    <Label htmlFor="sobrenome">Sobrenome</Label>
                                    <Input id="sobrenome" placeholder="Robinson" required />
                                </div>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="grid gap-2">
                                    <Label htmlFor="email">Email</Label>
                                    <Input id="email" placeholder="m@example.com" required type="email" />
                                </div>
                                <div className="grid gap-2">
                                    <Label htmlFor="senha">Senha</Label>
                                    <Input id="senha" required type="password" />
                                </div>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="grid gap-2">
                                    <Label htmlFor="data-nascimento">Data de Nascimento</Label>
                                    <Input id="data-nascimento" placeholder="dd/mm/aaaa" required type="date" />
                                </div>
                                <div className="grid gap-2">
                                    <Label htmlFor="cpf">CPF</Label>
                                    <Input id="cpf" placeholder="000.000.000-00" required />
                                </div>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="grid gap-2">
                                    <Label htmlFor="telefone">Telefone</Label>
                                    <Input id="telefone" placeholder="(00) 00000-0000" required />
                                </div>
                                <div className="grid gap-2">
                                    <Label htmlFor="pais">País</Label>
                                    <Input id="pais" placeholder="Seu país" required />
                                </div>
                            </div>
                            <Button className="w-full" variant="default" onClick={handleNextClick}>
                                Próximo
                            </Button>
                            <Button className="w-full" variant="outline">
                                Cadastrar com GitHub
                            </Button>
                        </div>
                        <div className="mt-4 text-center text-sm">
                            Já tem uma conta?
                            <Link className="underline" to="#">
                                Entrar
                            </Link>
                        </div>
                    </CardContent>
                </Card>
            </TabsContent>
            <TabsContent value="address">
                <Card>
                    <CardHeader>
                        <CardTitle className="text-xl">Endereço</CardTitle>
                        <CardDescription>Insira seu endereço para concluir o cadastro</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="grid gap-4">
                            <div className="grid grid-cols-2 gap-4">
                                <div className="grid gap-2">
                                    <Label htmlFor="endereco">Endereço</Label>
                                    <Input id="endereco" placeholder="Rua, Número" required />
                                </div>
                                <div className="grid gap-2">
                                    <Label htmlFor="complemento">Complemento</Label>
                                    <Input id="complemento" placeholder="Apartamento, Casa, etc." />
                                </div>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="grid gap-2">
                                    <Label htmlFor="cep">CEP</Label>
                                    <Input id="cep" placeholder="00000-000" required />
                                </div>
                                <div className="grid gap-2">
                                    <Label htmlFor="cidade">Cidade</Label>
                                    <Input id="cidade" placeholder="Sua cidade" required />
                                </div>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="grid gap-2">
                                    <Label htmlFor="estado">Estado</Label>
                                    <Input id="estado" placeholder="Seu estado" required />
                                </div>
                            </div>
                            <Button className="w-full" type="submit">
                                Concluir cadastro
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            </TabsContent>
        </Tabs>
    )
}