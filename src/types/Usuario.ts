import { UUID } from "crypto"
import { Endereco } from "./Endereco"

export type Usuario = {
    id: UUID,
    nome: string,
    email: string,
    senha: string,
    dataNascimento: Date,
    cpfcnpj: string,
    telefone: string,
    enderecos: Endereco[],
}