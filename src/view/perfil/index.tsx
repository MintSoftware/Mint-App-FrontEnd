import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useState } from "react"
import { Link } from "react-router-dom"

export default function Perfil() {
    const [activeTab, setActiveTab] = useState("general")
    return (
        <Card className="w-full max-w-lg mt-[10rem]">
            <CardHeader>
                <Tabs defaultValue="general" value={activeTab} onValueChange={setActiveTab} className="w-full">
                    <TabsList className="grid w-full grid-cols-2">
                        <TabsTrigger value="general">Geral</TabsTrigger>
                        <TabsTrigger value="address">Endereço</TabsTrigger>
                    </TabsList>
                    <TabsContent value="general">
                        <div className="flex flex-col items-center gap-6">
                            <div className="rounded-full bg-muted p-1 mt-5">
                                <Avatar className="h-24 w-24">
                                    <AvatarImage src="https://github.com/shadcn.png" />
                                    <AvatarFallback>JP</AvatarFallback>
                                </Avatar>
                            </div>
                            <CardContent className="grid gap-6">
                                <div className="grid grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <Label htmlFor="cpf-cnpj">CPF/CNPJ</Label>
                                        <Input id="cpf-cnpj" placeholder="Digite seu CPF ou CNPJ" />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="name">Nome</Label>
                                        <Input id="name" placeholder="Digite seu nome" />
                                    </div>
                                </div>
                                <div className="grid grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <Label htmlFor="surname">Sobrenome</Label>
                                        <Input id="surname" placeholder="Digite seu sobrenome" />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="email">E-mail</Label>
                                        <Input id="email" type="email" placeholder="Digite seu e-mail" />
                                    </div>
                                </div>
                            </CardContent>
                        </div>
                    </TabsContent>
                    <TabsContent value="address">
                        <CardContent className="grid gap-6">
                            <div className="grid grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <Label htmlFor="phone">Telefone</Label>
                                    <Input id="phone" placeholder="Digite seu telefone" />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="address">Endereço</Label>
                                    <Input id="address" placeholder="Digite seu endereço" />
                                </div>
                            </div>
                            <div className="grid grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <Label htmlFor="complement">Complemento</Label>
                                    <Input id="complement" placeholder="Digite o complemento" />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="zip-code">CEP</Label>
                                    <Input id="zip-code" placeholder="Digite seu CEP" />
                                </div>
                            </div>
                            <div className="grid grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <Label htmlFor="city">Cidade</Label>
                                    <Input id="city" placeholder="Digite sua cidade" />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="state">Estado</Label>
                                    <Select>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Selecione seu estado" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="AC">Acre</SelectItem>
                                            <SelectItem value="AL">Alagoas</SelectItem>
                                            <SelectItem value="AP">Amapá</SelectItem>
                                            <SelectItem value="AM">Amazonas</SelectItem>
                                            <SelectItem value="BA">Bahia</SelectItem>
                                            <SelectItem value="CE">Ceará</SelectItem>
                                            <SelectItem value="DF">Distrito Federal</SelectItem>
                                            <SelectItem value="ES">Espírito Santo</SelectItem>
                                            <SelectItem value="GO">Goiás</SelectItem>
                                            <SelectItem value="MA">Maranhão</SelectItem>
                                            <SelectItem value="MT">Mato Grosso</SelectItem>
                                            <SelectItem value="MS">Mato Grosso do Sul</SelectItem>
                                            <SelectItem value="MG">Minas Gerais</SelectItem>
                                            <SelectItem value="PA">Pará</SelectItem>
                                            <SelectItem value="PB">Paraíba</SelectItem>
                                            <SelectItem value="PR">Paraná</SelectItem>
                                            <SelectItem value="PE">Pernambuco</SelectItem>
                                            <SelectItem value="PI">Piauí</SelectItem>
                                            <SelectItem value="RJ">Rio de Janeiro</SelectItem>
                                            <SelectItem value="RN">Rio Grande do Norte</SelectItem>
                                            <SelectItem value="RS">Rio Grande do Sul</SelectItem>
                                            <SelectItem value="RO">Rondônia</SelectItem>
                                            <SelectItem value="RR">Roraima</SelectItem>
                                            <SelectItem value="SC">Santa Catarina</SelectItem>
                                            <SelectItem value="SP">São Paulo</SelectItem>
                                            <SelectItem value="SE">Sergipe</SelectItem>
                                            <SelectItem value="TO">Tocantins</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="country">País</Label>
                                <Select>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Selecione seu país" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="BR">Brasil</SelectItem>
                                        <SelectItem value="US">Estados Unidos</SelectItem>
                                        <SelectItem value="CA">Canadá</SelectItem>
                                        <SelectItem value="MX">México</SelectItem>
                                        <SelectItem value="AR">Argentina</SelectItem>
                                        <SelectItem value="CO">Colômbia</SelectItem>
                                        <SelectItem value="PE">Peru</SelectItem>
                                        <SelectItem value="VE">Venezuela</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </CardContent>
                    </TabsContent>
                </Tabs>
            </CardHeader>
            <CardFooter className="flex justify-end">
                <Link to={"/"}>
                    <Button>Salvar</Button>
                </Link>
            </CardFooter>
        </Card>
    )
}