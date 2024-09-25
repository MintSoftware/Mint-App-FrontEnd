import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Link } from "react-router-dom";
import { useLoginController } from "./entrarController";

export default function Entrar() {
  const { setEmail, setSenha, logar, loading } = useLoginController();

  return (
    <div className="fixed inset-0 flex justify-center items-center bg-background z-50">
      <Link to="/">
        <div className="absolute top-5 left-5 w-[15%] h-[10%] cursor-pointer flex items-center">
          <img src="logo.png" alt="Logo" className="w-14 h-14" />
        </div>
      </Link>
      <form onSubmit={logar}>
        <Card className="mx-auto max-w-sm w-full">
          <CardHeader>
            <CardTitle className="text-2xl">Entrar</CardTitle>
            <CardDescription>
              Insira seu e-mail abaixo para fazer login na sua conta
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="email">E-mail</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="seu_usuario@mintecommerce.com.br"
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="senha">Senha</Label>
                </div>
                <Input
                  id="senha"
                  type="password"
                  placeholder="senha"
                  onChange={(e) => setSenha(e.target.value)}
                  required
                />
              </div>
              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? "Entrando..." : "Entrar"}
              </Button>
            </div>
            <div className="mt-4 text-center text-sm">
              Não tem uma conta?{" "}
              <Link to="/criarconta" className="underline">
                Cadastre-se
              </Link>
            </div>
          </CardContent>
        </Card>
      </form>
    </div>
  );
}
