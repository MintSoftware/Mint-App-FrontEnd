import { Produto } from "./Produto";

export type Pedido = {
    status: any;
    id: string;
    dataPedido: Date;
    enumStatusPedido: EnumStatusPedido;
    valorTotal: number;
    usuario: Usuario;
    produto: Produto[];
};