import Tabela from "@/components/tabela/tabela";
import { ToastAction } from "@/components/ui/toast";
import { useToast } from "@/components/ui/use-toast";
import Api from "@/infra/helpers/api";
import { Produto } from "@/types/Produto";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import colunas from "./colunas";


export default function Pedido() {
  const [pedido, setPedido] = useState<Produto[]>([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();
  let usuario: any;

  useEffect(() => {
    buscarPedido();
  }, []);

  const buscarPedido = async () => {
    debugger;
    try {
      setLoading(true);
      const usuarioJson = localStorage.getItem("UsuarioLogado");
      if (usuarioJson) usuario = JSON.parse(usuarioJson);
      if (!usuario) navigate("/entrar");

      const { data } = await Api.get(`pedido/buscarPorUsuario/${usuario?.id}`);
      setPedido(data);
      setLoading(false);
    } catch (error: any) {
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