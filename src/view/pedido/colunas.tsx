import Cabecalho from "@/components/tabela/cabecalho";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import Api from "@/infra/helpers/api";
import { Pedido } from "@/types/Pedido";
import { ColumnDef } from "@tanstack/react-table";
import { EllipsisVerticalIcon, SearchIcon } from "lucide-react";
import { Link } from "react-router-dom";
import { toast } from "sonner";

const finalizarEntrega = async (pedido: Pedido) => {
    try {
        await Api.put(`/pedido/atualizarStatus/${pedido.id}`, { status: 2 });
        toast.success("Entrega finalizada com sucesso!");
        window.location.href = "/pedidos";
    } catch (error) {
        toast.error("Erro ao finalizar entrega!");
    }
}

const cancelarPedido = async (pedido: Pedido) => {
    try {
        await Api.put(`/pedido/atualizarStatus/${pedido.id}`, { status: 3 });
        toast.success("Entrega cancelada com sucesso!");
        window.location.href = "/pedidos";
    } catch (error) {
        toast.error("Erro ao cancelar entrega!");
    }
}

export const colunas = (): ColumnDef<Pedido>[] => [
    {
        id: 'verPedido',
        size: 1,
        cell: ({ row }) => (
            <Link to={`/pedido/${row.original.id}`}>
                <Button variant="ghost" className="h-8 w-8 p-0">
                    <SearchIcon className="h-4 w-4" />
                </Button>
            </Link>
        ),
    },
    {
        accessorKey: 'mumeroPedido',
        header: ({ column }) => (
            <Cabecalho column={column} title="Numero Pedido" />
        ),
    },
    {
        accessorKey: 'status',
        header: ({ column }) => (
            <Cabecalho column={column} title="Status" />
        ),
        cell: ({ row }) => (
            <Badge className='w-[70px] justify-center' variant={row.original.status ? "outline" : "secondary"} style={
                row.original.status === 0 ? { color: "#FFA500" } : row.original.status === 1 ? { color: "#03bb85" } : row.original.status === 2 ? { color: "#00bfff" } : { color: "#da1b1b" }
            }>
                {row.original.status === 0 ? "Pendente" : row.original.status === 1 ? "Pago" : row.original.status === 2 ? "Entregue" : "Cancelado"}
            </Badge>
        ),
    },
    {
        accessorKey: 'valorTotal',
        header: ({ column }) => (
            <Cabecalho column={column} title="Valor Total" />
        ),
        cell: ({ row }) => (
            <span>R$ {row.original.valorTotal.toFixed(2)}</span>
        ),
    }, {
        accessorKey: 'dataPedido',
        header: ({ column }) => (
            <Cabecalho column={column} title="Data Pedido" />
        ),
        cell: ({ row }) => (
            <span>{new Date(row.original.dataPedido).toLocaleDateString()}</span>
        ),
    },
    {
        id: "actions",
        cell: ({ row }) => {
            return (
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                            <span className="sr-only">Abrir menu</span>
                            <EllipsisVerticalIcon className="h-4 w-4" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuLabel className="font-bold">Ações</DropdownMenuLabel>
                        {row.original.status.toString() === '1' ?
                            <DropdownMenuItem onClick={() => finalizarEntrega(row.original)} className="cursor-pointer text-green-500">Finalizar Entrega</DropdownMenuItem>
                            : row.original.status.toString() === '2' ? <DropdownMenuItem onClick={() => cancelarPedido(row.original)} className="cursor-pointer text-red-500">Cancelar Entrega</DropdownMenuItem> : null
                        }
                    </DropdownMenuContent>
                </DropdownMenu>
            )
        },
        size: 3,
    }
]

export default colunas;
