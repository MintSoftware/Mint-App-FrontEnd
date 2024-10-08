import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function mostraTodosEstadosBrasileiros() {
  const estados = [
    "Acre",
    "Alagoas",
    "Amapá",
    "Amazonas",
    "Bahia",
    "Ceará",
    "Distrito Federal",
    "Espírito Santo",
    "Goiás",
    "Maranhão",
    "Mato Grosso",
    "Mato Grosso do Sul",
    "Minas Gerais",
    "Pará",
    "Paraíba",
    "Paraná",
    "Pernambuco",
    "Piauí",
    "Rio de Janeiro",
    "Rio Grande do Norte",
    "Rio Grande do Sul",
    "Rondônia",
    "Roraima",
    "Santa Catarina",
    "São Paulo",
    "Sergipe",
    "Tocantins"
  ];
 return estados
}

export function obterCidadesPorEstado(estado: string): string[] {
  const cidadesPorEstado: { [key: string]: string[] } = {
    Acre: ["Rio Branco", "Cruzeiro do Sul", "Sena Madureira"],
    Alagoas: ["Maceió", "Arapiraca", "Rio Largo"],
    Amapá: ["Macapá", "Santana", "Laranjal do Jari"],
    Amazonas: ["Manaus", "Parintins", "Itacoatiara"],
    Bahia: ["Salvador", "Feira de Santana", "Vitória da Conquista"],
    Ceará: ["Fortaleza", "Caucaia", "Juazeiro do Norte"],
    "Distrito Federal": ["Brasília", "Ceilândia", "Taguatinga"],
    "Espírito Santo": ["Vitória", "Vila Velha", "Serra"],
    Goiás: ["Goiânia", "Aparecida de Goiânia", "Anápolis"],
    Maranhão: ["São Luís", "Imperatriz", "Timon"],
    "Mato Grosso": ["Cuiabá", "Várzea Grande", "Rondonópolis"],
    "Mato Grosso do Sul": ["Campo Grande", "Dourados", "Três Lagoas"],
    "Minas Gerais": ["Belo Horizonte", "Uberlândia", "Contagem"],
    Pará: ["Belém", "Ananindeua", "Santarém"],
    Paraíba: ["João Pessoa", "Campina Grande", "Santa Rita"],
    Paraná: ["Curitiba", "Londrina", "Maringá"],
    Pernambuco: ["Recife", "Jaboatão dos Guararapes", "Olinda"],
    Piauí: ["Teresina", "Parnaíba", "Picos"],
    "Rio de Janeiro": ["Rio de Janeiro", "São Gonçalo", "Duque de Caxias"],
    "Rio Grande do Norte": ["Natal", "Mossoró", "Parnamirim"],
    "Rio Grande do Sul": ["Porto Alegre", "Caxias do Sul", "Pelotas"],
    Rondônia: ["Porto Velho", "Ji-Paraná", "Ariquemes"],
    Roraima: ["Boa Vista", "Caracaraí", "Pacaraima"],
    "Santa Catarina": ["Florianópolis", "Joinville", "Blumenau"],
    "São Paulo": ["São Paulo", "Guarulhos", "Campinas"],
    Sergipe: ["Aracaju", "Nossa Senhora do Socorro", "Lagarto"],
    Tocantins: ["Palmas", "Araguaína", "Gurupi"],
  };

  return cidadesPorEstado[estado] || [];
}


function validarCampos(usuario: { nome: any; email: string; senha: string | any[]; }) {
  if (!usuario.nome || !usuario.email || !usuario.senha) {
      return "Preencha todos os campos obrigatórios!";
  }

  const regexEmail = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
  if (!regexEmail.test(usuario.email)) {
      return "Email inválido!";
  }

  if (usuario.senha.length < 6) {
      return "A senha deve ter pelo menos 6 caracteres!";
  }

  return null;
}
