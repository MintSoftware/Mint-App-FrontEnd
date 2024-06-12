import Tabela from "@/components/tabela/tabela";
import { ToastAction } from "@/components/ui/toast";
import { useToast } from "@/components/ui/use-toast";
import Api from "@/infra/helpers/api";
import { Produto } from "@/types/Produto";
import CadastroProduto from "@/view/produto/cadastro";
import { useEffect, useState } from "react";
import colunas from "./colunas";

export default function Produtos() {
    const [produtos, setProdutos] = useState<Produto[]>([]);
    const [loading, setLoading] = useState(false);
    const { toast } = useToast();

    useEffect(() => {
        buscarProdutos();
    }, []);

    const buscarProdutos = async () => {
        try {
            setLoading(true);
            const { data } = await Api.get('produto/listar');
            setProdutos(data);
            setLoading(false);
        } catch (error) {
            setLoading(false);
            toast({
                title: "Erro!",
                description: `Ocorreu um erro ao buscar os produtos: ${error}`,
                variant: "destructive",
                action: <ToastAction altText="Tentar Novamente" onClick={() => buscarProdutos()}>Tentar novamente</ToastAction>,
            });
            
        }
    };

    return (
        <div id="tabela-produtos" className="w-full px-5 pt-[50px] h-full">
            <h1 className="text-2xl font-bold px-1">Produtos</h1>
            <Tabela
                colunas={colunas()}
                dados={produtos}
                modal={<CadastroProduto />}
                functionSearch={buscarProdutos}
                loading={loading}
            />
        </div>
    );
}