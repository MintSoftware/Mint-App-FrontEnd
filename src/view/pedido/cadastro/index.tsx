import { Button } from "@/components/ui/button";
import { CardContent } from "@/components/ui/card";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import Api from "@/infra/helpers/api";
import { useState } from "react";

const CadastroPedido = () => {
    const [nome, setNome] = useState("");
    const [data, setData] = useState("");
    const [telefone, setTelefone] = useState("");
    const [endereco, setEndereco] = useState("");
    const [dataNascimento, setDataNascimento] = useState("");
    const [cpf, setCpf] = useState("");
    const [observacao, setObservacao] = useState("");

    const dto = {
        nome,
        status: 1,
        data,
        telefone,
        endereco,
        dataNascimento,
        cpf,
        observacao
    
    }

    const dataAtual = new Date();

    const salvar = async () => {
        const { data } = await Api.post("pedido", dto);
    }
    

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
                                <Label htmlFor="name">Nome do produto</Label>
                                <Input onChange={(e) => setNome(e.target.value)} className="w-[300px]" id="name" placeholder="Digite o nome do produto" />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="email">Data</Label>
                                <Input value={new Date().toISOString().split('T')[0]} onChange={(e) => setData(e.target.value)} className="w-[300px]" type="date" id="date" />
                            </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="phone">Telefone</Label>
                                <Input onChange={(e) => setTelefone(e.target.value)} className="w-[300px]" id="phone" placeholder="Digite o telefone do produto" />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="address">Endereço</Label>
                                <Input onChange={(e) => setEndereco(e.target.value)} className="w-[300px]" id="address" placeholder="Digite o endereço do produto" />
                            </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="dob">Data de Nascimento</Label>
                                <Input onChange={(e) => setDataNascimento(e.target.value)} className="w-[300px] fill-white stroke-white" id="dob" placeholder="Digite a data de nascimento do produto" type="date" />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="cnpj">CPF/CNPJ</Label>
                                <Input onChange={(e) => setCpf(e.target.value)} className="w-[300px]" id="cnpj" placeholder="Digite o CPF/CNPJ do produto" />
                            </div>
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="observation">Observação</Label>
                            <Textarea onChange={(e) => setObservacao(e.target.value)} className="h-[100px]" id="observation" placeholder="Digite uma observação sobre o produto" />
                        </div>
                    </CardContent>
                    <DialogFooter>
                        <div className="flex justify-end gap-2">
                            <DialogClose asChild>
                                <Button variant="outline">Fechar</Button>
                            </DialogClose>
                            <Button onClick={salvar}>Salvar</Button>
                        </div>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    )
}

export default CadastroPedido;
