import Cabecalho from "@/components/tabela/cabecalho";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import Api from "@/infra/helpers/api";
import { Pedido } from "@/types/Pedido";
import { ColumnDef } from "@tanstack/react-table";
import { EllipsisVerticalIcon } from "lucide-react";
import { toast } from "@/components/ui/use-toast";

const inativar = async (pedido: Pedido) => {
    if (!confirm("Tem certeza que deseja inativar este pedido?")) return;

    try {
        await Api.put(`/pedido/${pedido.id}/inativar`);
        toast({
            title: "Sucesso!",
            description: "Pedido inativado com sucesso.",
            variant: "success",
        });
    } catch (error) {
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
    } catch (error) {
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
        id: "select",
        header: ({ table }) => (
            <Checkbox
                checked={
                    table.getIsAllPageRowsSelected() ||
                    (table.getIsSomePageRowsSelected() && "indeterminate")
                }
                onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
                aria-label="Select all"
            />
        ),
        cell: ({ row }) => (
            <Checkbox
                checked={row.getIsSelected()}
                onCheckedChange={(value) => row.toggleSelected(!!value)}
                aria-label="Select row"
            />
        ),
        enableSorting: false,
        enableHiding: false,
    },
    {
        accessorKey: 'id',
        header: ({ column }) => (
            <Cabecalho column={column} title="ID" />
        ),
    },
    {
        accessorKey: 'dataPedido',
        header: ({ column }) => (
            <Cabecalho column={column} title="Data do Pedido" />
        ),
        cell: ({ row }) => (
            <Badge className='w-[60px] justify-center' variant={row.original.enumStatusPedido ? "outline" : "secondary"}>
                {row.original.enumStatusPedido.toString() === '1' ? "Ativo" : "Inativo"}
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
        accessorKey: 'usuario',
        header: ({ column }) => (
            <Cabecalho column={column} title="Usuário" />
        ),
    },
    {
        accessorKey: 'produto',
        header: ({ column }) => (
            <Cabecalho column={column} title="Produto" />
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
                        {row.original.enumStatusPedido.toString() === '1' ?
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
