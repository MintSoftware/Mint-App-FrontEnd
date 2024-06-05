import Tabela from "@/components/tabela/tabela";
import { Label } from "@/components/ui/label";
import { ToastAction } from "@/components/ui/toast";
import { useToast } from "@/components/ui/use-toast";
import Api from "@/infra/helpers/api";
import { Produto } from "@/types/Produto";
import { useEffect, useState } from "react";
import CadastroPedido from "./cadastro";
import colunas from "./colunas";

export default function Pedido() {
    const [pedido, setPedido] = useState<Produto[]>([]);
    const [loading, setLoading] = useState(false);
    const { toast } = useToast();

    useEffect(() => {
        buscarPedido();
    }, []);

    const buscarPedido = async () => {
        try {
            setLoading(true);
            const { data } = await Api.get('pedido/listar');
            setPedido(data);
            setLoading(false);
        } catch (error) {
            setLoading(false);
            toast({
                title: "Erro!",
                description: `Ocorreu um erro ao buscar os pedido: ${error}`,
                variant: "destructive",
                action: <ToastAction altText="Tentar Novamente" onClick={() => buscarPedido()}>Tentar novamente</ToastAction>,
            });
            
        }
    };

    return (
        <div id="tabela-Pedido" className="w-full px-5 pt-[50px] h-full">
            <Label className="text-xl p-5">Pedidos</Label>
            <Tabela
                colunas={colunas()}
                dados={Pedido}
                modal={<CadastroPedido />}
                functionSearch={buscarPedido}
                loading={loading}
            />
        </div>
    );
}