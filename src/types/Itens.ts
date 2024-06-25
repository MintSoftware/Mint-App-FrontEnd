import { Produto } from "./Produto"

export type Itens = {
    id: string;
    produto: Produto;
    quantidade: number;
    preco: number;
};