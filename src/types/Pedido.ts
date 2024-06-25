import { UUID } from "crypto";
import { Produto } from "./Produto";
import { Usuario } from "./Usuario";

export type Pedido = {
    status: any;
    id: UUID;
    dataPedido: Date;
    valorTotal: number;
    usuario: Usuario;
    produtos: Produto[];
    metodoPagamento: string;
    mumeroPedido: number;
};