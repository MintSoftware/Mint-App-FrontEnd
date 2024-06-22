import { UUID } from "crypto";
import { Usuario } from "./Usuario";

export type Endereco = {
    id: UUID,
    nome: string,
    cep: string,
    rua: string,
    numero: string,
    complemento: string,
    bairro: string,
    cidade: string,
    estado: string,
    usuario: Usuario
}