import { useEffect, useState } from "react";
import { Route, Routes, } from "react-router-dom";
import CriarConta from "./view/criarconta";
import Entrar from "./view/entrar";
import LoadingScreen from "./view/loading/Loading";
import PaginaNaoEncontrada from "./view/paginanaoencontrada";
import MenuInicial from "./view/modules/dashboard/page";
import { Layout } from "./view/layout";
import Perfil from "./view/perfil/perfil";
import MinhasReservas from "./view/minhasReservas/minhasReservas";

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
                <Route path="/menuInicial" element={< MenuInicial />} />
               {/*} <Route path="/produtos/:id" element={<PainelProduto />} />*/}
                <Route path="*" element={<PaginaNaoEncontrada />} />
                <Route path="/" element={<Entrar />} />
                <Route path="/criarconta" element={<CriarConta />} />
                <Route path="/perfil" element={<Perfil />} />
                <Route path="/minhasReservas" element={<MinhasReservas onClose={function (): void {
                    throw new Error("Function not implemented.");
                } } />} />
            </Routes>
        </Layout>
    )
}

export default MainRoutes;
