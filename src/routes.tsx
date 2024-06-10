import { useEffect, useState } from "react";
import { Route, Routes, } from "react-router-dom";
import CriarConta from "./view/criarconta";
import Entrar from "./view/entrar";
import { Layout } from "./view/layout";
import LoadingScreen from "./view/loading/Loading";
import PaginaNaoEncontrada from "./view/paginanaoencontrada";
import Pedido from "./view/pedido";
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
                <Route path="/" element={<PaginaNaoEncontrada />} />
                <Route path="/produtos" element={<Produto />} />
                <Route path="/pedidos" element={<Pedido />} />
                <Route path="*" element={<PaginaNaoEncontrada />} />
                <Route path="/entrar" element={<Entrar />} />
                <Route path="/criarconta" element={<CriarConta />} />
                <Route path="/recuperarsenha" element={<RecuperarSenha />} />
            </Routes>
        </Layout>
    )
}

export default MainRoutes;
