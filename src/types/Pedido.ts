import { UUID } from "crypto";
import { Usuario } from "./Usuario";
import { Itens } from "./Itens";

export type Pedido = {
    status: any;
    id: UUID;
    dataPedido: Date;
    valorTotal: number;
    usuario: Usuario;
    itens: Itens[];
    metodoPagamento: string;
    mumeroPedido: number;
};