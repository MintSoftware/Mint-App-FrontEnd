import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ToastAction } from "@/components/ui/toast"
import { useToast } from "@/components/ui/use-toast"
import Api from "@/infra/helpers/api"
import { useState } from "react"
import { Link } from "react-router-dom"

export default function CriarConta() {
    const [activeTab, setActiveTab] = useState("info");
    const [cpfcnpjFormatado, setCpfcnpjFormatado] = useState("");
    const [nome, setNome] = useState("");
    const [sobrenome, setSobrenome] = useState("");
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");
    const [dataNascimento, setDataNascimento] = useState("");
    const [telefone, setTelefone] = useState("");
    const [endereco, setEndereco] = useState("");
    const [complemento, setComplemento] = useState("");
    const [cep, setCep] = useState("");
    const [cidade, setCidade] = useState("");
    const [estado, setEstado] = useState("");
    const [pais, setPais] = useState("");
    const { toast } = useToast();

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

    const criarConta = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const dto = {
            nome,
            sobrenome,
            email,
            senha,
            dataNascimento,
            telefone,
            endereco,
            complemento,
            cep,
            cidade,
            estado,
            pais
        };

        try {
            await Api.post("usuario/cadastrar", dto);
            toast({
                variant: "sucesso",
                description: "Cadastro realizado com sucesso!",
            })
            window.location.href = "/";
        } catch (error: any) {
            if (error.response) {
                toast({
                    variant: "destructive",
                    title: "Erro!",
                    description: error.response.data,
                    action: <ToastAction altText="Tentar Novamente" onClick={() => criarConta(e)}>Tentar novamente</ToastAction>,
                })
            } else {
                toast({
                    variant: "destructive",
                    title: "Erro",
                    description: "Erro ao realizar cadastro!",
                    action: <ToastAction altText="Tentar Novamente" onClick={() => criarConta(e)}>Tentar novamente</ToastAction>,
                })
            }
        }

    };

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
                                            <Input id="nome" placeholder="José" required onChange={(e) => setNome(e.target.value)} />
                                        </div>
                                        <div className="grid gap-2">
                                            <Label htmlFor="sobrenome">Sobrenome</Label>
                                            <Input id="sobrenome" placeholder="Silva" required onChange={(e) => setSobrenome(e.target.value)} />
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="grid gap-2">
                                            <Label htmlFor="email">Email</Label>
                                            <Input id="email" placeholder="jose.silva@mintecommerce.com.br" required type="email" onChange={(e) => setEmail(e.target.value)} />
                                        </div>
                                        <div className="grid gap-2">
                                            <Label htmlFor="senha">Senha</Label>
                                            <Input id="senha" required type="password" onChange={(e) => setSenha(e.target.value)} />
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="grid gap-2">
                                            <Label htmlFor="data-nascimento">Data de Nascimento</Label>
                                            <Input id="data-nascimento" placeholder="dd/mm/aaaa" required type="date" onChange={(e) => setDataNascimento(e.target.value)} />
                                        </div>
                                        <div className="grid gap-2">
                                            <Label htmlFor="cpf">CPF/CNPJ</Label>
                                            <Input id="cpf" placeholder="000.000.000-00" required onChange={formatarCfpCnpj} value={cpfcnpjFormatado} />
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="grid gap-2">
                                            <Label htmlFor="telefone">Telefone</Label>
                                            <Input id="telefone" placeholder="(00) 00000-0000" required onChange={(e) => setTelefone(e.target.value)} />
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
                                    <Link className="underline" to="/entrar">
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
                                            <Input id="endereco" placeholder="Rua, Número" required onChange={(e) => setEndereco(e.target.value)} />
                                        </div>
                                        <div className="grid gap-2">
                                            <Label htmlFor="complemento">Complemento</Label>
                                            <Input id="complemento" placeholder="Apartamento, Casa, etc." onChange={(e) => setComplemento(e.target.value)} />
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="grid gap-2">
                                            <Label htmlFor="cep">CEP</Label>
                                            <Input id="cep" placeholder="00000-000" required onChange={(e) => setCep(e.target.value)} />
                                        </div>
                                        <div className="grid gap-2">
                                            <Label htmlFor="cidade">Cidade</Label>
                                            <Input id="cidade" placeholder="Sua cidade" required onChange={(e) => setCidade(e.target.value)} />
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="grid gap-2">
                                            <Label htmlFor="estado">Estado</Label>
                                            <Input id="estado" placeholder="Seu estado" required onChange={(e) => setEstado(e.target.value)} />
                                        </div>
                                        <div className="grid gap-2">
                                            <Label htmlFor="pais">País</Label>
                                            <Input id="pais" placeholder="Seu país" required onChange={(e) => setPais(e.target.value)} />
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