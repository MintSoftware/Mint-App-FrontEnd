import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useState } from "react"
import { Link } from "react-router-dom"

export default function CriarConta() {
    const [activeTab, setActiveTab] = useState("info");
    const [cpfcnpjFormatado, setCpfcnpjFormatado] = useState("");

    const formatarCfpCnpj = (event: React.ChangeEvent<HTMLInputElement>) => {
        let { value } = event.target;
        value = value.replace(/\D/g, '');

        if (value.length <= 11) {
            value = value.replace(/(\d{3})(\d)/, '$1.$2');
            value = value.replace(/(\d{3})(\d)/, '$1.$2');
            value = value.replace(/(\d{3})(\d{1,2})$/, '$1-$2');
        } else if (value.length > 11 && value.length <= 14) {
            value = value.replace(/^(\d{2})(\d)/, '$1.$2');
            value = value.replace(/^(\d{2})\.(\d{3})(\d)/, '$1.$2.$3');
            value = value.replace(/\.(\d{3})(\d)/, '.$1/$2');
            value = value.replace(/(\d{4})(\d)/, '$1-$2');
        } else {
            value = value.slice(0, 14);
            value = value.replace(/^(\d{2})(\d)/, '$1.$2');
            value = value.replace(/^(\d{2})\.(\d{3})(\d)/, '$1.$2.$3');
            value = value.replace(/\.(\d{3})(\d)/, '.$1/$2');
            value = value.replace(/(\d{4})(\d)/, '$1-$2');
        }

        setCpfcnpjFormatado(value);
    };

    const handleNextClick = () => {
        setActiveTab("address");
    };

    const criarConta = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const dto = {

        };

        console.log(dto);
    };

    return (
        <div className="fixed flex justify-center items-center w-full h-full bg-background z-50 top-0 left-0 border">
            <form onSubmit={criarConta}>
                <Tabs className="mx-auto max-w-sm max-w-[45rem] w-[45rem]" value={activeTab}>
                    <TabsList className="grid w-full grid-cols-2">
                        <TabsTrigger value="info">Informações</TabsTrigger>
                        <TabsTrigger value="address">Endereço</TabsTrigger>
                    </TabsList>
                    <TabsContent value="info">
                        <Card className="h-[35rem]">
                            <CardHeader>
                                <CardTitle className="text-xl">Cadastre-se</CardTitle>
                                <CardDescription>Insira suas informações para criar uma conta</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="grid gap-4">
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="grid gap-2">
                                            <Label htmlFor="nome">Nome</Label>
                                            <Input id="nome" placeholder="José" required />
                                        </div>
                                        <div className="grid gap-2">
                                            <Label htmlFor="sobrenome">Sobrenome</Label>
                                            <Input id="sobrenome" placeholder="Silva" required />
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="grid gap-2">
                                            <Label htmlFor="email">Email</Label>
                                            <Input id="email" placeholder="jose.silva@mintecommerce.com.br" required type="email" />
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
                                            <Label htmlFor="cpf">CPF/CNPJ</Label>
                                            <Input id="cpf" placeholder="000.000.000-00" required onChange={formatarCfpCnpj} value={cpfcnpjFormatado} />
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="grid gap-2">
                                            <Label htmlFor="telefone">Telefone</Label>
                                            <Input id="telefone" placeholder="(00) 00000-0000" required />
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
                                    <Link className="underline" to="/">
                                        Entrar
                                    </Link>
                                </div>
                            </CardContent>
                        </Card>
                    </TabsContent>
                    <TabsContent value="address">
                        <Card className="h-[25rem]">
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
                                        <div className="grid gap-2">
                                            <Label htmlFor="pais">País</Label>
                                            <Input id="pais" placeholder="Seu país" required />
                                        </div>
                                    </div>
                                    <div className="flex gap-2">
                                        <Button className="w-20" variant="outline" onClick={() => setActiveTab("info")}>
                                            Voltar
                                        </Button>
                                        <Button className="w-full" type="submit">
                                            Concluir cadastro
                                        </Button>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </TabsContent>
                </Tabs>
            </form>
        </div>
    )
}