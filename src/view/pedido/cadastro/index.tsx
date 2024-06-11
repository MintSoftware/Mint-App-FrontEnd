import { Button } from "@/components/ui/button";
import { CardContent } from "@/components/ui/card";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import Api from "@/infra/helpers/api";
import { useState, useCallback } from "react";

interface CadastroPedidoProps {
    onSave: () => void;
}

interface FormErrors {
    dataPedido?: string;
    usuario?: string;
    produtos?: string;
    valorTotal?: string;
}

const CadastroPedido = ({onSave}: CadastroPedidoProps) => {
    const [dataPedido, setDataPedido] = useState(new Date().toISOString().split('T')[0]);
    const [usuario, setUsuario] = useState("");
    const [produtos, setProdutos] = useState<string[]>([]);
    const [valorTotal, setValorTotal] = useState<number>(0);
    const [observacao, setObservacao] = useState("");
    const [salvando, setSalvando] = useState(false);
    const [errors, setErrors] = useState<FormErrors>({});

    const validate = useCallback((): boolean => {
        const newErrors: Record<string, string> = {};
    
        if (!dataPedido) newErrors.dataPedido = "Data é obrigatória";
        if (!usuario) newErrors.usuario = "Usuário é obrigatório";
        if (produtos.length === 0) newErrors.produtos = "Selecione pelo menos um produto";
        if (valorTotal <= 0) newErrors.valorTotal = "Valor total deve ser maior que zero";
    
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    }, [dataPedido, usuario, produtos, valorTotal]);
    const salvar = useCallback(async () => {
        if (!validate()) return;
        try {
            setSalvando(true);
            const dto = {
                dataPedido,
                enumStatusPedido: "ATIVO", 
                valorTotal,
                usuario,
                produto: produtos,
                observacao
            }
            const { data } = await Api.post("pedido", dto);
            console.log(data);
            onSave();
        } catch (error) {
            console.error("Erro ao salvar pedido:", error);
        }finally {
            setSalvando(false);
        }
    }, [validate, dataPedido, usuario, produtos, valorTotal, observacao, onSave]);

    const handleBlur = useCallback(() => {
        validate();
    }, [validate]);
    
    return (
        <div>
            <Dialog>
                <DialogTrigger asChild>
                    <Button variant="default">Novo pedido</Button>
                </DialogTrigger>
                <DialogContent onInteractOutside={(evento) => evento.preventDefault()} className="sm:max-w-[700px]">
                    <DialogHeader>
                        <DialogTitle>Novo Pedido</DialogTitle>
                        <DialogDescription>Insira as informações do pedido para salvá-las.</DialogDescription>
                    </DialogHeader>
                    <CardContent className="space-y-4 w-[100%]">
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="date">Data</Label>
                                <Input
                                    value={dataPedido}
                                    onChange={(e) => setDataPedido(e.target.value)}
                                    onBlur={handleBlur}
                                    className="w-[300px]"
                                    type="date"
                                    id="date"
                                />
                                {errors.dataPedido && <p className="text-red-300">{errors.dataPedido}</p>}
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="usuario">Usuário</Label>
                                <Input
                                    value={usuario}
                                    onChange={(e) => setUsuario(e.target.value)}
                                    onBlur={handleBlur}
                                    className="w-[300px]"
                                    id="usuario"
                                    placeholder="Digite o usuário"
                                />
                                {errors.usuario && <p className="text-red-300">{errors.usuario}</p>}
                            </div>
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="produtos">Produtos</Label>
                            <Textarea
                                value={produtos.join(", ")}
                                onChange={(e) => setProdutos(e.target.value.split(",").map(p => p.trim()))}
                                onBlur={handleBlur}
                                className="h-[100px]"
                                id="produtos"
                                placeholder="Digite os produtos separados por vírgula"
                            />
                            {errors.produtos && <p className="text-red-300">{errors.produtos}</p>}
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="valorTotal">Valor Total</Label>
                            <Input
                                value={valorTotal}
                                onChange={(e) => setValorTotal(parseFloat(e.target.value))}
                                onBlur={handleBlur}
                                className="w-[300px]"
                                id="valorTotal"
                                placeholder="Digite o valor total"
                                type="number"
                            />
                            {errors.valorTotal && <p className="text-red-300">{errors.valorTotal}</p>}
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="observation">Observação</Label>
                            <Textarea
                                value={observacao}
                                onChange={(e) => setObservacao(e.target.value)}
                                onBlur={handleBlur}
                                className="h-[100px]"
                                id="observation"
                                placeholder="Digite uma observação sobre o pedido"
                            />
                        </div>
                    </CardContent>
                    <DialogFooter>
                        <div className="flex justify-end gap-2">
                            <DialogClose asChild>
                                <Button variant="outline">Fechar</Button>
                            </DialogClose>
                            <Button onClick={salvar} disabled={salvando}>
                                {salvando ? 'Salvando...' : 'Salvar'}
                            </Button>
                        </div>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    );
}

export default CadastroPedido;