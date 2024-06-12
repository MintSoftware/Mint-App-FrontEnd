import { Produto } from "./Produto";
import { Usuario } from "./Usuario";

export type Pedido = {
    status: any;
    id: string;
    dataPedido: Date;
    valorTotal: number;
    usuario: Usuario;
    produto: Produto[];
};