import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Api from "@/infra/helpers/api"
import { useState } from "react"
import { Link } from "react-router-dom"
import { toast } from "sonner"

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
    const [complemento, setComplemento] = useState("");
    const [cep, setCep] = useState("");
    const [cidade, setCidade] = useState("");
    const [estado, setEstado] = useState("");
    const [numero, setNumero] = useState("");
    const [rua, setRua] = useState("");
    const [bairro, setBairro] = useState("");

    const handleClickTab = (tab: any) => {
        setActiveTab(tab)
    }

    function verificarCamposInfo() {
        if (!nome || !sobrenome || !email || !senha || !dataNascimento || !telefone || !cpfcnpjFormatado) {
            toast.error("Por favor, preencha todos os campos obrigatórios da aba 'Informações'");
            return false; 
        }
        return true;
    }

    const handleClickProximo = () => {
        if (verificarCamposInfo()) {
            handleClickTab("address"); 
        }
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
    
    const criarConta = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!nome || !sobrenome || !email || !senha || !dataNascimento || !telefone || !cpfcnpjFormatado || !nomeEndereco || !cep || !rua || !numero || !complemento || !bairro || !cidade || !estado) {
            toast.error("Por favor, preencha todos os campos obrigatórios");
            return;
        }

        const enderecos = [{
            nome: nomeEndereco,
            cep,
            rua,
            numero,
            complemento,
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
            cpfcnpj: cpfcnpjFormatado.replace(/\D/g, ''),
        };

        toast.promise(Api.post("usuario/cadastrar", dto, {}).then(async () => {
            const { data } = await Api.post("usuario/entrar", dto);
            const UsuarioLogado = JSON.stringify(data);
            localStorage.setItem("UsuarioLogado", UsuarioLogado);
            window.location.href = "/";
        }).catch(() => {
            toast.error("Erro ao cadastrar");
        }), {
            loading: "Cadastrando...",
            success: "Cadastro realizado com sucesso!",
            error: "Erro ao cadastrar"
        });
    };

    return (
        <div className="fixed flex justify-center w-full h-full bg-background z-50 top-0 left-0 border">
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
                <Tabs className="mx-auto mt-[10rem] max-w-[40rem] w-[40rem]" value={activeTab} onValueChange={setActiveTab}>
                    <TabsList className="grid w-full grid-cols-2">
                        <TabsTrigger value="info">Informações</TabsTrigger>
                        <TabsTrigger value="address">Endereço</TabsTrigger>
                    </TabsList>
                    <TabsContent value="info">
                        <Card className="w-[40rem] h-[35rem]">
                            <CardHeader>
                                <CardTitle className="text-xl">Cadastre-se</CardTitle>
                                <CardDescription>Insira suas informações para criar uma conta</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="grid gap-4">
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="grid gap-2">
                                            <Label htmlFor="nome">Nome</Label>
                                            <Input value={nome} id="nome" placeholder="José" required onChange={(e) => setNome(e.target.value)} />
                                        </div>
                                        <div className="grid gap-2">
                                            <Label htmlFor="sobrenome">Sobrenome</Label>
                                            <Input value={sobrenome} id="sobrenome" placeholder="Silva" required onChange={(e) => setSobrenome(e.target.value)} />
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="grid gap-2">
                                            <Label htmlFor="email">Email</Label>
                                            <Input value={email} id="email" placeholder="jose.silva@mintecommerce.com.br" required type="email" onChange={(e) => setEmail(e.target.value)} />
                                        </div>
                                        <div className="grid gap-2">
                                            <Label htmlFor="senha">Senha</Label>
                                            <Input value={senha} id="senha" required type="password" onChange={(e) => setSenha(e.target.value)} />
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="grid gap-2">
                                            <Label htmlFor="data-nascimento">Data de Nascimento</Label>
                                            <Input value={dataNascimento} id="data-nascimento" placeholder="dd/mm/aaaa" required type="date" onChange={(e) => setDataNascimento(e.target.value)} />
                                        </div>
                                        <div className="grid gap-2">
                                            <Label htmlFor="cpf">CPF/CNPJ</Label>
                                            <Input id="cpf" placeholder="000.000.000-00" required onChange={formatarCfpCnpj} value={cpfcnpjFormatado} />
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="grid gap-2">
                                            <Label htmlFor="telefone">Telefone</Label>
                                            <Input value={telefone} id="telefone" placeholder="(00) 00000-0000" required onChange={formatarTelefone} />
                                        </div>
                                    </div>
                                </div>
                                <div className="mt-10">
                                    <Button className="w-full" variant="default" onClick={handleClickProximo}>
                                        Próximo
                                    </Button>   
                                    <div className="mt-4 text-center text-sm">
                                        Já tem uma conta?
                                        <Link className="underline" to="/entrar">
                                            Entrar
                                        </Link>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </TabsContent>
                    <TabsContent value="address">
                        <Card className="h-[30rem]">
                            <CardHeader>
                                <CardTitle className="text-xl">Endereço</CardTitle>
                                <CardDescription>Insira seu endereço para concluir o cadastro</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="grid gap-2">
                                        <Label htmlFor="nome">Nome</Label>
                                        <Input value={nomeEndereco} id="nome" placeholder="Casa, trabalho..." required onChange={(e) => setNomeEndereco(e.target.value)} />
                                    </div>
                                    <div className="grid gap-2">
                                        <Label htmlFor="cep">CEP</Label>
                                        <Input value={cep} id="cep" placeholder="00000-000" required onChange={(e) => setCep(e.target.value)} />
                                    </div>
                                    <div className="grid gap-2">
                                        <Label htmlFor="rua">Rua</Label>
                                        <Input value={rua} id="rua" placeholder="Rua" required onChange={(e) => setRua(e.target.value)} />
                                    </div>
                                    <div className="grid gap-2">
                                        <Label htmlFor="numero">Número</Label>
                                        <Input value={numero} id="numero" placeholder="Número" required onChange={(e) => setNumero(e.target.value)} />
                                    </div>
                                    <div className="grid gap-2">
                                        <Label htmlFor="complemento">Complemento</Label>
                                        <Input value={complemento} id="complemento" placeholder="Apartamento, Casa, etc." onChange={(e) => setComplemento(e.target.value)} />
                                    </div>
                                    <div className="grid gap-2">
                                        <Label htmlFor="bairro">Bairro</Label>
                                        <Input value={bairro} id="bairro" placeholder="Seu bairro" required onChange={(e) => setBairro(e.target.value)} />
                                    </div>
                                    <div className="grid gap-2">
                                        <Label htmlFor="cidade">Cidade</Label>
                                        <Input value={cidade} id="cidade" placeholder="Sua cidade" required onChange={(e) => setCidade(e.target.value)} />
                                    </div>
                                    <div className="grid gap-2">
                                        <Label htmlFor="estado">Estado</Label>
                                        <Input value={estado} id="estado" placeholder="Seu estado" required onChange={(e) => setEstado(e.target.value)} />
                                    </div>
                                </div>
                                <div className="flex gap-2 mt-10">
                                    <Button className="w-20" variant="outline" onClick={() => handleClickTab("info")}>
                                        Voltar
                                    </Button>
                                    <Button className="w-full" type="submit">
                                        Concluir cadastro
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>
                    </TabsContent>
                </Tabs>
            </form>
        </div >
    )
}