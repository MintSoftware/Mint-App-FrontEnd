import Tabela from "@/components/tabela/tabela";
import { ToastAction } from "@/components/ui/toast";
import { useToast } from "@/components/ui/use-toast";
import Api from "@/infra/helpers/api";
import { Produto } from "@/types/Produto";
import { useEffect, useState } from "react";
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
        } catch (error : any) {
          setLoading(false);
          toast({
            title: "Erro!",
            description: `Ocorreu um erro ao buscar os pedidos: ${error.message}`,
            variant: "destructive",
            action: <ToastAction altText="Tentar Novamente" onClick={() => buscarPedido()}>Tentar novamente</ToastAction>,
          });
          console.error("Erro na busca de pedidos:", error);
        }
      };
    return (
        <div id="tabela-Pedido" className="w-full px-5 pt-[50px] h-full">
            <h1 className="text-2xl font-bold px-1">Meus Pedidos</h1>
            <Tabela
                colunas={colunas()}
                dados={pedido}
                functionSearch={buscarPedido}
                loading={loading}
            />
        </div>
    );
}