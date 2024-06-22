import { UUID } from "crypto"
import { Endereco } from "./Endereco"

export type Usuario = {
    id: UUID,
    nome: string,
    email: string,
    senha: string,
    dataNascimento: Date,
    cpf: string,
    telefone: string,
    enderecos: Endereco[],
}