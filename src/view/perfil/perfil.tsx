import Api from "@/infra/helpers/api"
import { Endereco } from "@/types/Endereco"
import { Usuario } from "@/types/Usuario"
import { useEffect, useState } from "react"
import { toast } from "sonner"

export default function Perfil() {

const [activeTab, setActiveTab] = useState("general")
    const [usuario, setUsuario] = useState<Usuario>();
    const [listaEnderecos, setListaEnderecos] = useState<Endereco[]>();
    const [nomeEndereco, setNomeEndereco] = useState("");
    const [cep, setCep] = useState("");
    const [rua, setRua] = useState("");
    const [numero, setNumero] = useState("");
    const [complemento, setComplemento] = useState("");
    const [bairro, setBairro] = useState("");
    const [cidade, setCidade] = useState("");
    const [estado, setEstado] = useState("");
    const [enderecoSelecionado, setEnderecoSelecionado] = useState<Endereco>();
    const [nome, setNome] = useState("");
    const [senha, setSenha] = useState("");
    const [email, setEmail] = useState("");
    const [cpfcnpjFormatado, setCpfCnpjFormatado] = useState("");
    const [telefone, setTelefone] = useState("");
    const [dataNascimento, setDataNascimento] = useState("");
    const [sobrenome, setSobrenome] = useState("");

    useEffect(() => {
        recuperarUsuarioLogado();
    }, [])

    const formatarTelefone = (event: React.ChangeEvent<HTMLInputElement>) => {
        const telefone = event.target.value;
        let telefoneFormatado = telefone.replace(/\D/g, "");
        if (telefoneFormatado.length <= 11) {
            telefoneFormatado = telefoneFormatado.replace(
                /^(\d{2})(\d{5})(\d{4})$/,
                "($1) $2-$3"
            );
        } else if (telefoneFormatado.length <= 10) {
            telefoneFormatado = telefoneFormatado.replace(
                /^(\d{2})(\d{4})(\d{4})$/,
                "($1) $2-$3"
            );
        }
        setTelefone(telefoneFormatado);
    };

    const formatarCfpCnpj = (event: React.ChangeEvent<HTMLInputElement>, cpfcnpj? : any) => {
        let { value } = cpfcnpj ? { value: cpfcnpj } : event.target;
        value = value.replace(/\D/g, '');

        if (value.length <= 11) {
            value = value.replace(/(\d{3})(\d)/, '$1.$2');
            value = value.replace(/(\d{3})(\d)/, '$1.$2');
            value = value.replace(/(\d{3})(\d{1,2})$/, '$1-$2');
        } else if (value.length > 11 && value.length <= 14) {
            value = value.replace(/^(\d{2})(\d)/, '$1.$2');
            value = value.replace(/^(\d{2})\.(\d{3})(\d)/, '$1.$2.$3');
            value = value.replace(/\.(\d{3})(\d)/, '.$1/$2');
            value = value.replace(/(\d{4})(\d)/, '$1-$2');
        } else {
            value = value.slice(0, 14);
            value = value.replace(/^(\d{2})(\d)/, '$1.$2');
            value = value.replace(/^(\d{2})\.(\d{3})(\d)/, '$1.$2.$3');
            value = value.replace(/\.(\d{3})(\d)/, '.$1/$2');
            value = value.replace(/(\d{4})(\d)/, '$1-$2');
        }

        setCpfCnpjFormatado(value);
    };

    const recuperarUsuarioLogado = async () => {
        const usuarioJson = localStorage.getItem("UsuarioLogado");
        if (usuarioJson) {
            setUsuario(JSON.parse(usuarioJson));
            setListaEnderecos(JSON.parse(usuarioJson).enderecos);
            setNome(JSON.parse(usuarioJson).nome);
            setSobrenome(JSON.parse(usuarioJson).sobrenome);
            setEmail(JSON.parse(usuarioJson).email);
            setSenha(JSON.parse(usuarioJson).senha);
            setDataNascimento(JSON.parse(usuarioJson).dataNascimento);
            setTelefone(JSON.parse(usuarioJson).telefone);
            formatarCfpCnpj(JSON.parse(usuarioJson).cpfcnpj);
        }
    }

    useEffect(() => {
        if (enderecoSelecionado) {
            setNomeEndereco(enderecoSelecionado.nome);
            setCep(enderecoSelecionado.cep);
            setRua(enderecoSelecionado.rua);
            setNumero(enderecoSelecionado.numero);
            setComplemento(enderecoSelecionado.complemento);
            setBairro(enderecoSelecionado.bairro);
            setCidade(enderecoSelecionado.cidade);
            setEstado(enderecoSelecionado.estado);
        }
    }, [enderecoSelecionado])

    const atualizarUsuario = async () => {
        const dto = {
            email: usuario?.email,
            senha: usuario?.senha
        }

        const { data } = await Api.post("usuario/entrar", dto);
        const UsuarioLogado = JSON.stringify(data);
        localStorage.setItem("UsuarioLogado", UsuarioLogado);
        recuperarUsuarioLogado();
        limparDadosEndereco();
    }

    const limparDadosEndereco = () => {
        setNomeEndereco("");
        setCep("");
        setRua("");
        setNumero("");
        setComplemento("");
        setBairro("");
        setCidade("");
        setEstado("");
    }

    const salvarAlteracoes = async () => {
        const dto = {
            id: usuario?.id,
            nome,
            sobrenome,
            email,
            senha,
            dataNascimento,
            cpfcnpj: cpfcnpjFormatado,
            telefone,
            enderecos: listaEnderecos
        }
        try {
            const response = await Api.put(`usuario/editar/${usuario?.id}`, dto);
            localStorage.setItem("UsuarioLogado", JSON.stringify(response.data));
            toast.success("Dados atualizados com sucesso!");
        } catch (error) {
            toast.error("Erro ao salvar dados!");
        }
    }

    const cadastroEndereco = () => {
        setNomeEndereco("");
        setCep("");
        setRua("");
        setNumero("");
        setComplemento("");
        setBairro("");
        setCidade("");
        setEstado("");
    }

    const cadastrarEndereco = async () => {
        if (!nomeEndereco || !cep || !rua || !numero || !bairro || !cidade || !estado) {
            toast.error("Preencha todos os campos obrigatórios!");
            return;
        }

        const endereco = {
            nome: nomeEndereco,
            cep,
            rua,
            numero,
            complemento,
            bairro,
            cidade,
            estado,
            usuario
        }

        toast.promise(Api.post("endereco/cadastrar", endereco).then(() => {
            atualizarUsuario();
            toast.success("Endereço cadastrado com sucesso!");
            cadastroEndereco();
        }).catch(() => {
            toast.error("Erro ao recuperar usuario após cadastrar o endereco");
        }), {
            loading: "Salvando...",
        });
    }

    return {
        activeTab,
        setActiveTab,
        usuario,
        listaEnderecos,
        nomeEndereco,
        setNomeEndereco,
        cep,
        setCep,
        rua,
        setRua,
        numero,
        setNumero,
        complemento,
        setComplemento,
        bairro,
        setBairro,
        cidade,
        setCidade,
        estado,
        setEstado,
        enderecoSelecionado,
        setEnderecoSelecionado,
        nome,
        setNome,
        senha,
        setSenha,
        email,
        setEmail,
        cpfcnpjFormatado,
        setCpfCnpjFormatado,
        telefone,
        setTelefone,
        dataNascimento,
        setDataNascimento,
        sobrenome,
        setSobrenome,
        formatarTelefone,
        formatarCfpCnpj,
        recuperarUsuarioLogado,
        salvarAlteracoes,
        cadastrarEndereco,
        cadastroEndereco
    }
}