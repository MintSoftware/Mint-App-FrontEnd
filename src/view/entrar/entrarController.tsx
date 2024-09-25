import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";


export function useLoginController() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const logar = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const dto = {
      email,
      senha,
    };

    try {
      // const response = await Api.post("autenticacao/entrar", dto);
      const response = {
        data: { usuario: { id: 1, nome: "Admin", email: "admin@mintapp.com" }, token: "fakeToken" },
      };

      // Simulando login e salvamento de dados
      localStorage.setItem("UsuarioLogado", JSON.stringify(response.data.usuario));
      toast.success("Logado com sucesso!");
      navigate("/menuInicial");
    } catch (error) {
      toast.error("Erro ao entrar, verifique suas credenciais!");
    } finally {
      setLoading(false);
    }
  };

  return {
    setEmail,
    setSenha,
    logar,
    loading,
  };
}
