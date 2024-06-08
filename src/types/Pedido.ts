import { Produto } from "./Produto";
import { Usuario } from "./Usuario";

export type Pedido = {
    status: unknown;
    id: string;
    dataPedido: Date;
    enumStatusPedido: EnumStatusPedido;
    valorTotal: number;
    usuario: Usuario;
    produto: Produto[];
};