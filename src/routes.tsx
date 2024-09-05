import { useEffect, useState } from "react";
import { Route, Routes, } from "react-router-dom";
import CriarConta from "./view/criarconta";
import Entrar from "./view/entrar";
import LoadingScreen from "./view/loading/Loading";
import PaginaNaoEncontrada from "./view/paginanaoencontrada";
import Perfil from "./view/perfil";
import MenuInicial from "./view/modules/dashboard/page";

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
            <Routes>
                <Route path="/" element={< MenuInicial />} />
               {/*} <Route path="/produtos/:id" element={<PainelProduto />} />*/}
                <Route path="*" element={<PaginaNaoEncontrada />} />
                <Route path="/entrar" element={<Entrar />} />
                <Route path="/criarconta" element={<CriarConta />} />
                <Route path="/perfil" element={<Perfil />} />
            </Routes>
    )
}

export default MainRoutes;
