import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Api from "@/infra/helpers/api";
import { useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "sonner";

export default function CriarConta() {
    const [activeTab, setActiveTab] = useState("info");
    const [cpfcnpjFormatado, setCpfcnpjFormatado] = useState("");
    const [nome, setNome] = useState("");
    const [sobrenome, setSobrenome] = useState("");
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");
    const [dataNascimento, setDataNascimento] = useState("");
    const [telefone, setTelefone] = useState("");
    const [nomeEndereco, setNomeEndereco] = useState("");
    const [cep, setCep] = useState("");
    const [cidade, setCidade] = useState("");
    const [estado, setEstado] = useState("");
    const [numero, setNumero] = useState("");
    const [rua, setRua] = useState("");
    const [bairro, setBairro] = useState("");

    const handleClickTab = (tab: any) => {
        setActiveTab(tab);
    };

    const formatarTelefone = (event: React.ChangeEvent<HTMLInputElement>) => {
        const telefone = event.target.value;
        let telefoneFormatado = telefone.replace(/\D/g, "");
        if (telefoneFormatado.length <= 11) {
            telefoneFormatado = telefoneFormatado.replace(
                /^(\d{2})(\d{5})(\d{4})$/,
                "($1) $2-$3"
            );
        } else if (telefoneFormatado.length <= 10) {
            telefoneFormatado = telefoneFormatado.replace(
                /^(\d{2})(\d{4})(\d{4})$/,
                "($1) $2-$3"
            );
        }
        setTelefone(telefoneFormatado);
    };

    const formatarCfpCnpj = (event: React.ChangeEvent<HTMLInputElement>) => {
        let { value } = event.target;
        value = value.replace(/\D/g, "");

        if (value.length <= 11) {
            value = value.replace(/(\d{3})(\d)/, "$1.$2");
            value = value.replace(/(\d{3})(\d)/, "$1.$2");
            value = value.replace(/(\d{3})(\d{1,2})$/, "$1-$2");
        } else if (value.length > 11 && value.length <= 14) {
            value = value.replace(/^(\d{2})(\d)/, "$1.$2");
            value = value.replace(/^(\d{2})\.(\d{3})(\d)/, "$1.$2.$3");
            value = value.replace(/\.(\d{3})(\d)/, ".$1/$2");
            value = value.replace(/(\d{4})(\d)/, "$1-$2");
        } else {
            value = value.slice(0, 14);
            value = value.replace(/^(\d{2})(\d)/, "$1.$2");
            value = value.replace(/^(\d{2})\.(\d{3})(\d)/, "$1.$2.$3");
            value = value.replace(/\.(\d{3})(\d)/, ".$1/$2");
            value = value.replace(/(\d{4})(\d)/, "$1-$2");
        }

        setCpfcnpjFormatado(value);
    };

    const criarConta = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!nome || !sobrenome || !email || !senha || !dataNascimento || !telefone || !cpfcnpjFormatado || !nomeEndereco || !cep || !rua || !numero || !bairro || !cidade || !estado) {
            toast.error("Por favor, preencha todos os campos obrigatórios");
            return;
        }

        const enderecos = [{
            nome: nomeEndereco,
            cep,
            rua,
            numero,
            bairro,
            cidade,
            estado,
        }];

        const dto = {
            nome,
            sobrenome,
            email,
            senha,
            dataNascimento,
            telefone,
            enderecos,
            cpfcnpj: cpfcnpjFormatado.replace(/\D/g, ""),
        };

        toast.promise(Api.post("usuario/cadastrar", dto, {}).then(async () => {
            const { data } = await Api.post("usuario/entrar", dto);
            const UsuarioLogado = JSON.stringify(data);
            localStorage.setItem("UsuarioLogado", UsuarioLogado);
            toast.success("Cadastro realizado com sucesso!");
            window.location.href = "/";
        }).catch(() => {
            toast.error("Erro ao cadastrar");
        }), {
            loading: "Cadastrando...",
        });
    };

    return (
        <div className="fixed flex flex-col justify-center w-full h-full bg-background z-50 top-0 left-0 p-4">
            <Link to="/">
                <div className="absolute top-4 left-4 cursor-pointer">
                    <img src="logo.png" alt="Logo" className="w-12 h-12" />
                </div>
            </Link>
            <form onSubmit={criarConta} className="w-full max-w-md mx-auto">
                <Tabs className="w-full" value={activeTab} onValueChange={setActiveTab}>
                    <TabsList className="grid w-full grid-cols-2">
                        <TabsTrigger value="info">Informações</TabsTrigger>
                        <TabsTrigger value="address">Endereço</TabsTrigger>
                    </TabsList>
                    <TabsContent value="info">
                        <Card className="w-full">
                            <CardHeader>
                                <CardTitle className="text-lg">Cadastre-se</CardTitle>
                                <CardDescription>Insira suas informações para criar uma conta</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="grid gap-4">
                                    <div className="grid gap-2">
                                        <Label htmlFor="nome">Nome</Label>
                                        <Input value={nome} id="nome" placeholder="José" required onChange={(e) => setNome(e.target.value)} />
                                    </div>
                                    <div className="grid gap-2">
                                        <Label htmlFor="sobrenome">Sobrenome</Label>
                                        <Input value={sobrenome} id="sobrenome" placeholder="Silva" required onChange={(e) => setSobrenome(e.target.value)} />
                                    </div>
                                    <div className="grid gap-2">
                                        <Label htmlFor="email">Email</Label>
                                        <Input value={email} id="email" placeholder="jose.silva@mintecommerce.com.br" required type="email" onChange={(e) => setEmail(e.target.value)} />
                                    </div>
                                    <div className="grid gap-2">
                                        <Label htmlFor="senha">Senha</Label>
                                        <Input value={senha} id="senha" required type="password" onChange={(e) => setSenha(e.target.value)} />
                                    </div>
                                    <div className="grid gap-2">
                                        <Label htmlFor="data-nascimento">Data de Nascimento</Label>
                                        <Input value={dataNascimento} id="data-nascimento" required type="date" onChange={(e) => setDataNascimento(e.target.value)} />
                                    </div>
                                    <div className="grid gap-2">
                                        <Label htmlFor="cpf">CPF/CNPJ</Label>
                                        <Input id="cpf" placeholder="000.000.000-00" required onChange={formatarCfpCnpj} value={cpfcnpjFormatado} />
                                    </div>
                                    <div className="grid gap-2">
                                        <Label htmlFor="telefone">Telefone</Label>
                                        <Input value={telefone} id="telefone" placeholder="(00) 00000-0000" required onChange={formatarTelefone} />
                                    </div>
                                </div>
                                <div className="mt-6">
                                    <Button className="w-full" variant="default" onClick={() => handleClickTab("address")}>
                                        Próximo
                                    </Button>
                                    <div className="mt-4 text-center text-sm">
                                        Já tem uma conta?
                                        <Link className="underline" to="/entrar">
                                            {" "}Entrar
                                        </Link>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </TabsContent>
                    <TabsContent value="address">
                        <Card className="w-full">
                            <CardHeader>
                                <CardTitle>Endereço</CardTitle>
                                <CardDescription>Insira seu endereço</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="grid gap-4">
                                    <div className="grid gap-2">
                                        <Label htmlFor="nome-endereco">Nome do Endereço</Label>
                                        <Input value={nomeEndereco} id="nome-endereco" required placeholder="Minha Casa" onChange={(e) => setNomeEndereco(e.target.value)} />
                                    </div>
                                    <div className="grid gap-2">
                                        <Label htmlFor="cep">CEP</Label>
                                        <Input value={cep} id="cep" placeholder="00000-000" required onChange={(e) => setCep(e.target.value)} />
                                    </div>
                                    <div className="grid gap-2">
                                        <Label htmlFor="estado">Estado</Label>
                                        <Input value={estado} id="estado" placeholder="SP" required onChange={(e) => setEstado(e.target.value)} />
                                    </div>
                                    <div className="grid gap-2">
                                        <Label htmlFor="cidade">Cidade</Label>
                                        <Input value={cidade} id="cidade" placeholder="São Paulo" required onChange={(e) => setCidade(e.target.value)} />
                                    </div>
                                    <div className="grid gap-2">
                                        <Label htmlFor="rua">Rua</Label>
                                        <Input value={rua} id="rua" placeholder="Rua Principal" required onChange={(e) => setRua(e.target.value)} />
                                    </div>
                                    <div className="grid gap-2">
                                        <Label htmlFor="rua">Bairro</Label>
                                        <Input value={rua} id="rua" placeholder="Seu Bairro " required onChange={(e) => setBairro(e.target.value)} />
                                    </div>
                                    <div className="grid gap-2">
                                        <Label htmlFor="numero">Número</Label>
                                        <Input value={numero} id="numero" placeholder="123" required onChange={(e) => setNumero(e.target.value)} />
                                    </div>
                                </div>
                                <div className="mt-6">
                                    <Button className="w-full" type="submit" variant="default">
                                        Criar Conta
                                    </Button>
                                    <Button className="w-full mt-2" variant="outline" onClick={() => handleClickTab("info")}>
                                        Voltar
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>
                    </TabsContent>
                </Tabs>
            </form>
        </div>
    );
}
