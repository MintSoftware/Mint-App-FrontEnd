import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Api from "@/infra/helpers/api"
import { Endereco } from "@/types/Endereco"
import { Produto } from "@/types/Produto"
import { Usuario } from "@/types/Usuario"
import { ArrowLeftIcon, ArrowRightIcon, CreditCardIcon, DollarSignIcon, PlusIcon, ShoppingCartIcon, WalletCardsIcon } from "lucide-react"
import { useEffect, useState } from "react"
import { useLocation } from "react-router-dom"
import { toast } from "sonner"

export default function FinalizacaoPedido() {
    const location = useLocation();
    const produtos: Produto[] = location.state?.produtos || [];
    const [activeTab, setActiveTab] = useState("address");
    const [enderecoExistente, setEnderecoExistente] = useState(true);
    const [metodoPagto, setMetodoPagto] = useState("pix");
    const [usuario, setUsuario] = useState<Usuario>();
    const [nomeEndereco, setNomeEndereco] = useState<string>("");
    const [cep, setCep] = useState<string>("");
    const [rua, setRua] = useState<string>("");
    const [numero, setNumero] = useState<string>("");
    const [complemento, setComplemento] = useState<string>("");
    const [bairro, setBairro] = useState<string>("");
    const [cidade, setCidade] = useState<string>("");
    const [estado, setEstado] = useState<string>("");
    const [enderecoPedido, setEnderecoPedido] = useState<Endereco>();
    const handleClickTab = (tab: any) => {
        (enderecoPedido) ? setActiveTab(tab) : toast.error("Selecione um endereço para continuar");
    }

    const handleCLickRadio = () => {
        if (enderecoExistente === true) {
            return "existente"
        }
        else {
            return "novo"
        }
    }

    useEffect(() => {
        recuperarUsuarioLogado();
    }, []);

    useEffect(() => {
        limpaDadosEndereco();
    }, [enderecoExistente]);

    const recuperarUsuarioLogado = async () => {
        const usuarioJson = localStorage.getItem("UsuarioLogado");
        if (usuarioJson) setUsuario(JSON.parse(usuarioJson));
    };

    const cadastrarNovoEndereco = async () => {
        if (!nomeEndereco || !cep || !rua || !numero || !bairro || !cidade || !estado) {
            toast.error("Preencha todos os campos obrigatórios!");
            return;
        }

        const endereco = {
            nome: nomeEndereco,
            cep,
            rua,
            numero,
            complemento,
            bairro,
            cidade,
            estado,
            usuario
        }

        toast.promise(Api.post("endereco/cadastrar", endereco).then(() => {
            atualizarUsuario();
        }).catch(() => {
            toast.error("Erro ao recuperar usuario após cadastrar o endereco");
        }), {
            loading: "Salvando...",
            success: "Endereço cadastrado com sucesso!",
            error: "Erro ao cadastrar endereço"
        });
    }

    const atualizarUsuario = async () => {
        const dto = {
            email: usuario?.email,
            senha: usuario?.senha
        }

        const { data } = await Api.post("usuario/entrar", dto);
        const UsuarioLogado = JSON.stringify(data);
        localStorage.setItem("UsuarioLogado", UsuarioLogado);
        recuperarUsuarioLogado();
        setEnderecoExistente(true);
    }

    const limpaDadosEndereco = () => {
        setNomeEndereco("");
        setCep("");
        setRua("");
        setNumero("");
        setComplemento("");
        setBairro("");
        setCidade("");
        setEstado("");
    }

    const finalizarPedido = async () => {
        if (!enderecoPedido || !metodoPagto) {
            toast.error("Selecione um endereço e um método de pagamento para continuar");
            return;
        }


        const dto = {
            usuarioId: usuario?.id,
            metodoPagamento: metodoPagto,
            dataPedido: new Date(),
            enderecoEntrega: enderecoPedido,
            itens: produtos.map(item => ({
                produtoId: item.id,
                quantidade: item.quantidade,
                preco: item.preco
            }))
        }

        toast.promise(Api.post("pedido/cadastrar", dto).then(() => {
            toast.success("Pedido finalizado com sucesso!");
            localStorage.setItem("Carrinho", JSON.stringify([]));
            window.location.href = "/";
        }).catch(() => {
            toast.error("Erro ao finalizar pedido");
        }), {
            loading: "Finalizando pedido...",
            success: "Pedido finalizado com sucesso!",
            error: "Erro ao finalizar pedido"
        });
    }

    const radioValue = handleCLickRadio();

    return (
        <div className="container mx-auto max-w-4xl px-4 py-8">
            <Tabs defaultValue="address" className="w-full" value={activeTab} onValueChange={setActiveTab}>
                <TabsList className="grid grid-cols-3 gap-4 mb-8">
                    <TabsTrigger value="address">Endereço</TabsTrigger>
                    <TabsTrigger value="payment">Pagamento</TabsTrigger>
                    <TabsTrigger value="review">Finalizar</TabsTrigger>
                </TabsList>
                <TabsContent value="address">
                    <Card>
                        <CardHeader>
                            <CardTitle>Selecionar endereço</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="grid gap-4">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-2 w-full">
                                        <RadioGroup defaultValue="existente" value={radioValue} className="flex flex-col w-full gap-3">
                                            <div className="flex items-center gap-3">
                                                <RadioGroupItem onClick={() => setEnderecoExistente(true)} id="existente" value="existente" />
                                                <Label className="flex">Endereço existente</Label>
                                                <Select disabled={!enderecoExistente} onValueChange={(value) => setEnderecoPedido(JSON.parse(value))}>
                                                    <SelectTrigger className="flex w-[30rem]">
                                                        <SelectValue className="flex w-full" placeholder="Selecione um endereço" />
                                                    </SelectTrigger>
                                                    <SelectContent className="cursor-pointer">
                                                        {usuario?.enderecos.map((endereco) => (
                                                            <SelectItem key={endereco.id} value={JSON.stringify(endereco)}>
                                                                {endereco.nome} - {endereco.rua}, {endereco.numero} - {endereco.bairro}, {endereco.cidade} - {endereco.estado}, {endereco.cep}
                                                            </SelectItem>
                                                        ))}
                                                    </SelectContent>
                                                </Select>
                                            </div>
                                            <div className="flex items-center gap-3">
                                                <RadioGroupItem onClick={() => setEnderecoExistente(false)} id="novo" value="novo" />
                                                <Label>Novo endereço</Label>
                                            </div>
                                            {!enderecoExistente && <div className="border p-5 rounded-lg mt-5">
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
                                                <div className="flex justify-end mt-3">
                                                    <Button onClick={() => cadastrarNovoEndereco()}><PlusIcon /></Button>
                                                </div>
                                            </div>}
                                        </RadioGroup>
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                        <CardFooter className="justify-end">
                            <Button onClick={() => handleClickTab("payment")}>
                                <ArrowRightIcon className="h-4 w-4 mr-2" />
                                Próximo
                            </Button>
                        </CardFooter>
                    </Card>
                </TabsContent>
                <TabsContent value="payment">
                    <Card>
                        <CardHeader>
                            <CardTitle>Pagamento</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="grid gap-4">
                                <RadioGroup defaultValue="pix" className="grid grid-cols-3 gap-4">
                                    <div>
                                        <RadioGroupItem onClick={() => setMetodoPagto("card")} value="card" id="card" className="peer sr-only" />
                                        <Label
                                            htmlFor="card"
                                            className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                                        >
                                            <CreditCardIcon className="mb-3 h-6 w-6" />
                                            Cartão de crédito
                                        </Label>
                                    </div>
                                    <div>
                                        <RadioGroupItem onClick={() => setMetodoPagto("pix")} value="pix" id="pix" className="peer sr-only" />
                                        <Label
                                            htmlFor="pix"
                                            className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                                        >
                                            <WalletCardsIcon className="mb-3 h-6 w-6" />
                                            PIX
                                        </Label>
                                    </div>
                                    <div>
                                        <RadioGroupItem onClick={() => setMetodoPagto("boleto")} value="boleto" id="boleto" className="peer sr-only" />
                                        <Label
                                            htmlFor="boleto"
                                            className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                                        >
                                            <DollarSignIcon className="mb-3 h-6 w-6" />
                                            Boleto
                                        </Label>
                                    </div>
                                </RadioGroup>
                                {metodoPagto === "card" && <div className="grid gap-2">
                                    <div className="grid gap-2">
                                        <Label htmlFor="card-number">Número do cartão</Label>
                                        <Input id="card-number" placeholder="0000 0000 0000 0000" />
                                    </div>
                                    <div className="grid grid-cols-3 gap-4">
                                        <div className="grid gap-2">
                                            <Label htmlFor="expiration-month">Validade</Label>
                                            <Select>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Mês" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="1">Janeiro</SelectItem>
                                                    <SelectItem value="2">Fevereiro</SelectItem>
                                                    <SelectItem value="3">Março</SelectItem>
                                                    <SelectItem value="4">Abril</SelectItem>
                                                    <SelectItem value="5">Maio</SelectItem>
                                                    <SelectItem value="6">Junho</SelectItem>
                                                    <SelectItem value="7">Julho</SelectItem>
                                                    <SelectItem value="8">Agosto</SelectItem>
                                                    <SelectItem value="9">Setembro</SelectItem>
                                                    <SelectItem value="10">Outubro</SelectItem>
                                                    <SelectItem value="11">Novembro</SelectItem>
                                                    <SelectItem value="12">Dezembro</SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </div>
                                        <div className="grid gap-2">
                                            <Label htmlFor="expiration-year">Ano</Label>
                                            <Select>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Ano" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="2023">2023</SelectItem>
                                                    <SelectItem value="2024">2024</SelectItem>
                                                    <SelectItem value="2025">2025</SelectItem>
                                                    <SelectItem value="2026">2026</SelectItem>
                                                    <SelectItem value="2027">2027</SelectItem>
                                                    <SelectItem value="2028">2028</SelectItem>
                                                    <SelectItem value="2029">2029</SelectItem>
                                                    <SelectItem value="2030">2030</SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </div>
                                        <div className="grid gap-2">
                                            <Label htmlFor="cvc">CVC</Label>
                                            <Input id="cvc" placeholder="CVC" />
                                        </div>
                                    </div>
                                </div>}
                            </div>
                        </CardContent>
                        <CardFooter className="gap-2 justify-between">
                            <Button variant={"outline"} onClick={() => handleClickTab("address")}>
                                <ArrowLeftIcon className="h-4 w-4 mr-2" />
                                Voltar
                            </Button>
                            <Button onClick={() => handleClickTab("review")}>
                                <ArrowRightIcon className="h-4 w-4 mr-2" />
                                Próximo
                            </Button>
                        </CardFooter>
                    </Card>
                </TabsContent>
                <TabsContent value="review">
                    <Card>
                        <CardHeader>
                            <CardTitle>Finalizar pagamento</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="grid gap-2 mt-10">
                                <Label className="text-lg">Metodo de pagamento</Label>
                                <div className="flex items-center gap-2">
                                    {metodoPagto === "card" ? <CreditCardIcon className="h-6 w-6" /> : metodoPagto === "pix" ? <WalletCardsIcon className="h-6 w-6" /> : <DollarSignIcon className="h-6 w-6" />}
                                    {metodoPagto === "card" ? "Cartão de crédito" : metodoPagto === "pix" ? "PIX" : "Boleto"}
                                </div>
                            </div>
                            <div className="grid gap-2 mt-10">
                                <Label className="text-lg">Endereço de entrega</Label>
                                <div className="flex items-center gap-2">
                                    <span>{enderecoPedido?.nome} - {enderecoPedido?.rua}, {enderecoPedido?.numero} - {enderecoPedido?.bairro}, {enderecoPedido?.cidade} - {enderecoPedido?.estado}, {enderecoPedido?.cep}</span>
                                </div>
                            </div>
                            <div className="grid gap-4 mt-10">
                                <Label className="text-lg">Itens</Label>
                                <Table>
                                    <ScrollArea className="flex w-full h-[13rem]">
                                        <TableHeader>
                                            <TableRow>
                                                <TableHead className="w-[40rem]">Item</TableHead>
                                                <TableHead className="items-center flex justify-center w-[5rem]">Qtd</TableHead>
                                                <TableHead >Valor Un</TableHead>
                                            </TableRow>
                                        </TableHeader>
                                        <TableBody>
                                            {produtos.map((produto) => (
                                                <TableRow key={produto.id}>
                                                    <TableCell>{produto.nome}</TableCell>
                                                    <TableCell className="flex justify-center" >{produto.quantidade}</TableCell>
                                                    <TableCell>{produto.preco.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}</TableCell>
                                                </TableRow>
                                            ))}
                                        </TableBody>
                                    </ScrollArea>
                                </Table>
                            </div>
                            <Separator />
                            <div className="mt-3 flex items-center justify-between font-medium">
                                <Label className="text-lg">Total</Label>
                                <span>{produtos.reduce((acc, item) => acc + item.preco * item.quantidade, 0).toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}</span>
                            </div>
                        </CardContent>
                        <CardFooter className="gap-2 justify-between mt-10">
                            <Button variant={"outline"} onClick={() => handleClickTab("payment")}>
                                <ArrowLeftIcon className="h-4 w-4 mr-2" />
                                Voltar
                            </Button>
                            <Button onClick={finalizarPedido}>
                                <ShoppingCartIcon className="h-4 w-4 mr-2" />
                                Finalizar pagamento
                            </Button>
                        </CardFooter>
                    </Card>
                </TabsContent>
            </Tabs>
        </div>
    )
}