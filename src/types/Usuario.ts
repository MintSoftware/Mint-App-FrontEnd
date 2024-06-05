import { UUID } from "crypto"

export type Usuario = {
    id: UUID,
    nome: string,
    email: string,
    senha: string,
    dataNascimento: Date,
    cpf: string,
    telefone: string,
    endereco: string,
    complemento: string,
    cep: string,
    cidade: string,
    estado: string,
    pais: string
}