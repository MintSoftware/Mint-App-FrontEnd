import Cabecalho from "@/components/tabela/cabecalho"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import Api from "@/infra/helpers/api"
import { Produto } from "@/types/Produto"
import { ColumnDef } from "@tanstack/react-table"
import { EllipsisVerticalIcon } from "lucide-react"
import EditarProduto from "./editar"

const inativar = (produto: Produto) => async () => {
    await Api.put(`/produto/${produto.id}/inativar`)    
}

const ativar = (produto: Produto) => async () => {
    await Api.put(`/produto/${produto.id}/ativar`)
}

export const colunas = (): ColumnDef<Produto>[] => [
   {
        accessorKey: 'nome',
        header: ({ column }) => (
            <Cabecalho column={column} title="Nome" />
        ),
    }, {
        accessorKey: 'status',
        header: ({ column }) => (
            <Cabecalho column={column} title="Status" />
        ),
        cell: ({ row }) => (
            <Badge className='w-[60px] justify-center' variant={row.original.status ? "outline" : "secondary"}>
                {row.original.status.toString() === '1' ? "Ativo" : "Inativo"}
            </Badge>
        ),
    }, {
        accessorKey: 'descricao',
        header: ({ column }) => (
            <Cabecalho column={column} title="Descrição" />
        ),
    }, {
        accessorKey: 'categoria',
        header: ({ column }) => (
            <Cabecalho column={column} title="Categoria" />
        ),
        cell: ({ row }) => (
            <span>{row.original.categoria.nome}</span>
        ),
    },
    {
        accessorKey: 'preco',
        header: ({ column }) => (
            <Cabecalho column={column} title="Preço" />
        ),
        cell: ({ row }) => (
            <span>R$ {row.original.preco.toFixed(2)}</span>
        ),
    }, {
        accessorKey: 'quantidadeestoque',
        header: ({ column }) => (
            <Cabecalho column={column} title="Estoque" />
        ),
    }, {
        id: "actions",
        cell: ({ row }) => {
            const produto = row.original;

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
                        <DropdownMenuItem className="cursor-pointer">Produto</DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuLabel className="font-bold">Ações</DropdownMenuLabel>
                        {<EditarProduto produto={produto} /> }
                        {row.original.status.toString() === '1' ?
                            <DropdownMenuItem onClick={inativar(row.original)} className="cursor-pointer text-red-500">Inativar</DropdownMenuItem>
                            : <DropdownMenuItem onClick={ativar(row.original)} className="cursor-pointer text-green-500">Ativar</DropdownMenuItem>
                        }
                    </DropdownMenuContent>
                </DropdownMenu>
            )
        },
        size: 3,
    }
]

export default colunas