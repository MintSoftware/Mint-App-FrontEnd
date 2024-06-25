import { useEffect, useState } from "react";
import { Route, Routes, } from "react-router-dom";
import CriarConta from "./view/criarconta";
import DashBoard from "./view/dashboard";
import PainelProduto from "./view/dashboard/painel";
import Entrar from "./view/entrar";
import { Layout } from "./view/layout";
import LoadingScreen from "./view/loading/Loading";
import PaginaNaoEncontrada from "./view/paginanaoencontrada";
import Pedido from "./view/pedido";
import FinalizacaoPedido from "./view/pedido/finalizacao";
import Perfil from "./view/perfil";
import Produto from "./view/produto";
import RecuperarSenha from "./view/recuperarsenha";
<<<<<<< HEAD
import Pedido from "./view/pedido";
import DashBoard from "./view/dashboard";
import PainelProduto from "./view/dashboard/painel";
import EditarProduto from "./view/produto/editar";
=======
import EditarPedido from "./view/pedido/editar";
>>>>>>> 1d5d32dc7cc7bff0dce7f262a4f1f6a386c2892d

function MainRoutes() {
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        handleLoadStorageData()
    }, [])

    async function handleLoadStorageData() {
        try {
            setIsLoading(true)
        } catch (error) {
            console.log(error)
        } finally {
            setIsLoading(false)
        }
    }

    if (isLoading) {
        return (
            <LoadingScreen />
        )
    }

    return (
        <Layout>
            <Routes>
                <Route path="/" element={<DashBoard />} />
                <Route path="/produtos/:id" element={<PainelProduto />} />
                <Route path="/produtos" element={<Produto />} />
                <Route path="/pedidos" element={<Pedido />} />
                <Route path="*" element={<PaginaNaoEncontrada />} />
                <Route path="/entrar" element={<Entrar />} />
                <Route path="/criarconta" element={<CriarConta />} />
                <Route path="/recuperarsenha" element={<RecuperarSenha />} />
<<<<<<< HEAD
                <Route path="/produto/:id/editar" element={<EditarProduto />} /> 
=======
                <Route path="/finalizarpedido" element={<FinalizacaoPedido />} />
                <Route path="/pedido/:id" element={<EditarPedido />} /> 
                <Route path="/perfil" element={<Perfil />} />
>>>>>>> 1d5d32dc7cc7bff0dce7f262a4f1f6a386c2892d
            </Routes>
        </Layout>
    )
}

export default MainRoutes;
