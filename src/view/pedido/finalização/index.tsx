import { useState } from "react"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { ArrowLeftIcon, ArrowRightIcon, CreditCardIcon, DollarSignIcon, ShoppingCartIcon, WalletCardsIcon } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Arrow } from "@radix-ui/react-popover"

export default function FinalizacaoPedido() {
    const [activeTab, setActiveTab] = useState("address");
    const [clienteExistente, setClienteExistente] = useState(true);
    const [metodoPagto, setMetodoPagto] = useState("pix");
    const handleClickTab = (tab: any) => {
        setActiveTab(tab)
    }

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
                                        <RadioGroup defaultValue="existente" className="flex flex-col w-full gap-3">
                                            <div className="flex items-center gap-3">
                                                <RadioGroupItem onClick={() => setClienteExistente(true)} id="existente" value="existente" />
                                                <Label className="flex">Endereço existente</Label>
                                                <Select disabled={!clienteExistente}>
                                                    <SelectTrigger className="flex w-[30rem]">
                                                        <SelectValue className="flex w-full" placeholder="Selecione um endereço" />
                                                    </SelectTrigger>
                                                    <SelectContent className="cursor-pointer">
                                                        <SelectItem className="cursor-pointer" value="1">Rua A, 123 - Bairro X, Cidade Y - SP, 12345-678</SelectItem>
                                                        <SelectItem className="cursor-pointer" value="2">Rua B, 456 - Bairro Z, Cidade W - SP, 98765-432</SelectItem>
                                                    </SelectContent>
                                                </Select>
                                            </div>
                                            <div className="flex items-center gap-3">
                                                <RadioGroupItem onClick={() => setClienteExistente(false)} id="novo" value="novo" />
                                                <Label>Novo endereço</Label>
                                            </div>
                                            {!clienteExistente && <div>
                                                <div className="grid grid-cols-2 gap-4">
                                                    <div>
                                                        <Label>CEP</Label>
                                                        <Input type="text" className="input" />
                                                    </div>
                                                    <div>
                                                        <Label>Rua</Label>
                                                        <Input type="text" className="Input" />
                                                    </div>
                                                    <div>
                                                        <Label>Número</Label>
                                                        <Input type="text" className="Input" />
                                                    </div>
                                                    <div>
                                                        <Label>Complemento</Label>
                                                        <Input type="text" className="Input" />
                                                    </div>
                                                    <div>
                                                        <Label>Bairro</Label>
                                                        <Input type="text" className="Input" />
                                                    </div>
                                                    <div>
                                                        <Label>Cidade</Label>
                                                        <Input type="text" className="Input" />
                                                    </div>
                                                    <div>
                                                        <Label>Estado</Label>
                                                        <Input type="text" className="Input" />
                                                    </div>
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
                            <div className="grid gap-4">
                                <div>
                                    <h3 className="text-lg font-medium">Resumo do pedido</h3>
                                    <div className="grid gap-2 py-4">
                                        <div className="flex items-center justify-between">
                                            <span>Subtotal</span>
                                            <span>R$ 100,00</span>
                                        </div>
                                        <div className="flex items-center justify-between">
                                            <span>Frete</span>
                                            <span>R$ 10,00</span>
                                        </div>
                                        <Separator />
                                        <div className="flex items-center justify-between font-medium">
                                            <span>Total</span>
                                            <span>R$ 110,00</span>
                                        </div>
                                    </div>
                                </div>
                                <div>
                                    <h3 className="text-lg font-medium">Endereço de entrega</h3>
                                    <div className="py-4">Rua A, 123 - Bairro X, Cidade Y - SP, 12345-678</div>
                                </div>
                                <div>
                                    <h3 className="text-lg font-medium">Forma de pagamento</h3>
                                    <div className="py-4">Cartão de crédito</div>
                                </div>
                            </div>
                        </CardContent>
                        <CardFooter className="gap-2 justify-between">
                            <Button variant={"outline"} onClick={() => handleClickTab("payment")}>
                                <ArrowLeftIcon className="h-4 w-4 mr-2" />
                                Voltar
                            </Button>
                            <Button>
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