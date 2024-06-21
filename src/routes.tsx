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
import FinalizacaoPedido from "./view/pedido/finalização";
import Perfil from "./view/perfil";
import Produto from "./view/produto";
import RecuperarSenha from "./view/recuperarsenha";

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
                <Route path="/finalizarpedido" element={<FinalizacaoPedido />} />
                <Route path="/perfil" element={<Perfil />} />
            </Routes>
        </Layout>
    )
}

export default MainRoutes;
