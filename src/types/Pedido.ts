import { UUID } from "crypto";
import { Endereco } from "./Endereco";
import { Itens } from "./Itens";
import { Usuario } from "./Usuario";

export type Pedido = {
    status: any;
    id: UUID;
    dataPedido: Date;
    valorTotal: number;
    usuario: Usuario;
    itens: Itens[];
    metodoPagamento: string;
    mumeroPedido: number;
    enderecoEntrega: Endereco;
};