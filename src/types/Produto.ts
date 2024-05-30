import { UUID } from "crypto";
import { Categoria } from "./Categoria";

export type Produto = {
    id : UUID;
    nome : String;
    status : boolean;
    descricao : String;
    preco : number;
    quantidade : number;
    quantidadeestoque : number;
    categoria : Categoria;
};