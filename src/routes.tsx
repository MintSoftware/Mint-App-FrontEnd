import { useEffect, useState } from "react";
import { Route, Routes, } from "react-router-dom";
import CriarConta from "./view/criarconta";
import Entrar from "./view/entrar";
import LoadingScreen from "./view/loading/Loading";
import RecuperarSenha from "./view/recuperarsenha";

function MainRoutes() {
    const usuarioLogado = false;
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

    if (!usuarioLogado) {
        return (
            <Routes>
                <Route path="/" element={<Entrar />} />
                <Route path="/criarconta" element={<CriarConta />} />
                <Route path="/recuperarsenha" element={<RecuperarSenha />} />
            </Routes>
        )
    }

    return (
        // <Layout>
        //     <Routes>
        //         <Route path="*" element={<PaginaNaoEncontrada />} />
        //         {/* <Route path="/agenda" element={<Agenda />} />
        // <Route path="/clientes" element={<Clientes />} />
        // <Route path="/locais" element={<Locais />} />
        // <Route path="/configuracoes/*" element={<Configuracoes />} />
        // <Route path="/filial" element={<Filial />} /> */}
        //     </Routes>
        // </Layout>
        <></>
    )
}

export default MainRoutes;
