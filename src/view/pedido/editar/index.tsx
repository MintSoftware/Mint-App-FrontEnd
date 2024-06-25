import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table"
import { Separator } from "@/components/ui/separator"
import { Link } from "react-router-dom"
import { ArrowLeftIcon, ChevronLeftIcon, ChevronRightIcon } from "lucide-react"
import { useEffect, useState } from "react"
import { Pedido } from "@/types/Pedido"
import Api from "@/infra/helpers/api"
import { toast } from "sonner"

export default function EditarPedido() {
    const [pedido, setPedido] = useState<Pedido>();

    useEffect(() => {
        recuperarPedido()
    }, [])

    const recuperarPedido = async () => {
        try {
            const idPedido = window.location.pathname.split("/")[2];
            const {data} = await Api.get(`/pedido/${idPedido}`);
            setPedido(data);
        } catch (error: any) {
            toast.error(`Ocorreu um erro ao recuperar o pedido: ${error.message}`);
        }
    }

    return (
        <div className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-6">
            <div className="flex items-center gap-4">
                <Button variant="outline" size="icon">
                    <ArrowLeftIcon className="h-4 w-4" />
                    <span className="sr-only">Back</span>
                </Button>
                <h1 className="font-semibold text-lg md:text-xl">
                    {pedido?.mumeroPedido} - <span className="font-normal text-muted-foreground">{pedido?.usuario.nome}</span>
                    <span className="font-normal text-muted-foreground">{new Date(pedido?.dataPedido as Date).toLocaleTimeString()}</span>
                </h1>
                <div className="ml-auto flex items-center gap-2">
                    <Button variant="outline" size="icon">
                        <ChevronLeftIcon className="h-4 w-4" />
                        <span className="sr-only">Previous</span>
                    </Button>
                    <Button variant="outline" size="icon">
                        <ChevronRightIcon className="h-4 w-4" />
                        <span className="sr-only">Next</span>
                    </Button>
                </div>
            </div>
            <div className="flex flex-col md:grid md:grid-cols-6 gap-6">
                <div className="md:col-span-4 lg:col-span-3 xl:col-span-4 flex flex-col gap-6">
                    <Card>
                        <CardHeader>
                            <CardTitle>Pedido</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="grid gap-4">
                                <div className="grid gap-2">
                                    <div className="font-medium">Número do Pedido</div>
                                    <div>{pedido?.mumeroPedido}</div>
                                </div>
                                <div className="grid gap-2">
                                    <div className="font-medium">Data do Pedido</div>
                                    <div>{new Date(pedido?.dataPedido as Date).toLocaleTimeString()}</div>
                                </div>
                                <div className="grid gap-2">
                                    <div className="font-medium">Status do Pedido</div>
                                    <div>{pedido?.status === 1 ? "Pendente" : pedido?.status === 2 ? "Em Andamento" : pedido?.status === 3 ? "Finalizado" : "Cancelado"}</div>
                                </div>
                                <div className="grid gap-2">
                                    <div className="font-medium">Valor Total</div>
                                    <div>R$ {pedido?.valorTotal.toFixed(2)}</div>
                                </div>
                                <div className="grid gap-2">
                                    <div className="font-medium">Método de Pagamento</div>
                                    <div>{pedido?.metodoPagamento}</div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader>
                            <CardTitle>Itens do Pedido</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead className="w-[80px] hidden md:table-cell">Imagem</TableHead>
                                        <TableHead className="max-w-[150px]">Nome</TableHead>
                                        <TableHead>Quantidade</TableHead>
                                        <TableHead>Preço Unitário</TableHead>
                                        <TableHead>Preço Total</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {pedido?.itens.map((item) => (
                                        <TableRow key={item.id}>
                                            <TableCell className="hidden md:table-cell">
                                                <img
                                                    src="https://github.com/shadcn.png"
                                                    width="64"
                                                    height="64"
                                                    alt="Imagem do Produto"
                                                    className="aspect-square rounded-md object-cover"
                                                />
                                            </TableCell>
                                            <TableCell className="font-medium">{item.produto.nome}</TableCell>
                                            <TableCell>{item.quantidade}</TableCell>
                                            <TableCell>R$ {item.preco.toFixed(2)}</TableCell>
                                            <TableCell>R$ {(item.preco * item.quantidade).toFixed(2)}</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </CardContent>
                    </Card>
                </div>
                <div className="md:col-span-2 lg:col-span-3 xl:col-span-2 flex flex-col gap-6">
                    <Card>
                        <div>
                            <CardHeader className="flex flex-row items-center space-y-0">
                                <CardTitle>Cliente</CardTitle>
                                <Button variant="secondary" className="ml-auto">
                                    Editar
                                </Button>
                            </CardHeader>
                            <CardContent className="text-sm">
                                <div className="grid gap-1">
                                    <Link to="#" className="text-blue-600 underline">
                                        {pedido?.usuario.nome}
                                    </Link>
                                    <div>23 pedidos no total</div>
                                </div>
                            </CardContent>
                        </div>
                        <Separator />
                        <div>
                            <CardHeader>
                                <CardTitle>Informações de Contato</CardTitle>
                            </CardHeader>
                            <CardContent className="text-sm">
                                <div className="grid gap-1">
                                    <Link to="#" className="text-blue-600">
                                        {pedido?.usuario.email}
                                    </Link>
                                    <div className="text-muted-foreground">{pedido?.usuario.telefone}</div>
                                </div>
                            </CardContent>
                        </div>
                        <Separator />
                        <div>
                            <CardHeader>
                                <CardTitle>Endereço de Entrega</CardTitle>
                            </CardHeader>
                            <CardContent className="text-sm">
                                {/* <div>
                                    {pedido?.usuario.enderecos as string}
                                    <br />
                                    {pedido?.usuario.endereco as string }, {pedido?.usuario.estado} {pedido?.usuario.cep}
                                </div> */}
                                <div>
                                    <span>ajustar o endereco</span>
                                </div>
                            </CardContent>
                        </div>
                    </Card>
                </div>
            </div>
        </div>
    )
}