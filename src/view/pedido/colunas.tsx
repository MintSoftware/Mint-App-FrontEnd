import Cabecalho from "@/components/tabela/cabecalho";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { toast } from "@/components/ui/use-toast";
import Api from "@/infra/helpers/api";
import { Pedido } from "@/types/Pedido";
import { ColumnDef } from "@tanstack/react-table";
import { EllipsisVerticalIcon } from "lucide-react";

const inativar = async (pedido: Pedido) => {
    if (!confirm("Tem certeza que deseja inativar este pedido?")) return;

    try {
        await Api.put(`/pedido/${pedido.id}/inativar`);
        toast({
            title: "Sucesso!",
            description: "Pedido inativado com sucesso.",
            variant: "success",
        });
    } catch (error: any) {
        console.log("Erro ao inativar o pedido: ", error);
        toast({
            title: "Erro!",
            description: `Ocorreu um erro ao inativar o pedido: ${error.message}`,
            variant: "destructive",
        });
    }
}

const ativar = async (pedido: Pedido) => {
    if (!confirm("Tem certeza que deseja ativar este pedido?")) return;

    try {
        await Api.put(`/pedido/${pedido.id}/ativar`);
        toast({
            title: "Sucesso!",
            description: "Pedido ativado com sucesso.",
            variant: "success",
        });
    } catch (error: any) {
        console.log("Erro ao ativar o pedido: ", error);
        toast({
            title: "Erro!",
            description: `Ocorreu um erro ao ativar o pedido: ${error.message}`,
            variant: "destructive",
        });
    }
}

export const colunas = (): ColumnDef<Pedido>[] => [
    {
        accessorKey: 'id',
        header: ({ column }) => (
            <Cabecalho column={column} title="Id" />
        ),
    },
    {
        accessorKey: 'status',
        header: ({ column }) => (
            <Cabecalho column={column} title="Status" />
        ),
        cell: ({ row }) => (
            <Badge className='w-[60px] justify-center' variant={row.original.status ? "outline" : "secondary"}>
                {row.original.status.toString() === '0' ? "Digitado" : row.original.status.toString() === '1' ? "Pendente" : row.original.status.toString() === '2' ? "Em Andamento" : row.original.status.toString() === '3' ? "Finalizado" : "Cancelado"}
            </Badge>
        ),
    },
    {
        accessorKey: 'valorTotal',
        header: ({ column }) => (
            <Cabecalho column={column} title="Valor Total" />
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
                        <DropdownMenuLabel className="font-bold">Ver</DropdownMenuLabel>
                        <DropdownMenuItem className="cursor-pointer">Pedido</DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuLabel className="font-bold">Ações</DropdownMenuLabel>
                        <DropdownMenuItem className="cursor-pointer">Editar</DropdownMenuItem>
                        {row.original.status.toString() === '1' ?
                            <DropdownMenuItem onClick={() => inativar(row.original)} className="cursor-pointer text-red-500">Inativar</DropdownMenuItem>
                            : <DropdownMenuItem onClick={() => ativar(row.original)} className="cursor-pointer text-green-500">Ativar</DropdownMenuItem>
                        }
                    </DropdownMenuContent>
                </DropdownMenu>
            )
        },
        size: 3,
    }
]

export default colunas;
