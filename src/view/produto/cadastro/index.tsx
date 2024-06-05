import { Button } from "@/components/ui/button";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import Api from "@/infra/helpers/api";
import { useState } from "react";

const CadastroProduto = () => {
    const [nome, setNome] = useState<string>("");
    const [descricao, setDescricao] = useState<string>("");
    const [preco, setPreco] = useState<number>(0);
    const [quantidade, setQuantidade] = useState<number>(0);
    const [quantidadeEstoque, setQuantidadeEstoque] = useState<number>(0);
    const [categoria, setCategoria] = useState<string>("");

    const dto = {
        nome,
        descricao,
        preco,
        quantidade,
        quantidadeestoque: quantidadeEstoque,
        categoria
    };

    const salvar = async () => {
        const { data } = await Api.post("produto", dto);
    }

    return (
        <div>
            <Dialog>
                <DialogTrigger asChild>
                    <Button variant="default">Cadastrar Produto</Button>
                </DialogTrigger>
                <DialogContent onInteractOutside={(evento) => evento.preventDefault()} className="flex flex-row items-center sm:max-w-[50%] max-h-50 h-[35rem] p-[2rem] gap-8">
                    <div className="flex justify-center w-[50%] h-full">
                        <Carousel className="border max-w-[80%] h-full">
                            <CarouselNext />
                            <CarouselContent>
                                <CarouselItem>
                                    <img
                                        src="/placeholder.svg"
                                        width={448}
                                        height={252}
                                        alt="Image"
                                        className="aspect-video object-cover rounded-md"
                                    />
                                </CarouselItem>
                                <CarouselItem>
                                    <img
                                        src="/placeholder.svg"
                                        width={448}
                                        height={252}
                                        alt="Image"
                                        className="aspect-video object-cover rounded-md"
                                    />
                                </CarouselItem>
                                <CarouselItem>
                                    <img
                                        src="/placeholder.svg"
                                        width={448}
                                        height={252}
                                        alt="Image"
                                        className="aspect-video object-cover rounded-md"
                                    />
                                </CarouselItem>
                            </CarouselContent>
                            <CarouselPrevious />
                        </Carousel>
                    </div>
                    <div>
                        <DialogHeader>
                            <DialogTitle>Cadastrar Novo Produto</DialogTitle>
                            <DialogDescription>Preencha os campos abaixo para adicionar um novo produto.</DialogDescription>
                        </DialogHeader>
                        <div className="grid gap-4 py-4 pb-24">
                            <div className="grid grid-cols-2 gap-4">
                                <div className="grid gap-2">
                                    <Label htmlFor="id">ID</Label>
                                    <Input id="id" placeholder="ID do produto" disabled />
                                </div>
                                <div className="grid gap-2">
                                    <Label htmlFor="name">Nome</Label>
                                    <Input id="name" placeholder="Nome do produto" onChange={(e) => setNome(e.target.value)} />
                                </div>
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="description">Descrição</Label>
                                <Textarea id="description" placeholder="Descrição do produto" onChange={(e) => setDescricao(e.target.value)} />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="grid gap-2">
                                    <Label htmlFor="price">Preço</Label>
                                    <Input id="price" type="number" placeholder="Preço do produto" onChange={(e) => setPreco(Number(e.target.value))} />
                                </div>
                                <div className="grid gap-2">
                                    <Label htmlFor="quantity">Quantidade</Label>
                                    <Input id="quantity" type="number" placeholder="Quantidade do produto" onChange={(e) => setQuantidade(Number(e.target.value))} />
                                </div>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="grid gap-2">
                                    <Label htmlFor="stock">Estoque</Label>
                                    <Input id="stock" type="number" placeholder="Quantidade em estoque" onChange={(e) => setQuantidadeEstoque(Number(e.target.value))} />
                                </div>
                                <div className="grid gap-2 ">
                                    <Label htmlFor="category">Categoria</Label>
                                    <Select defaultValue="default">
                                        <SelectTrigger className="w-full">
                                            <SelectValue placeholder="Selecione uma categoria" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="default">Selecione uma categoria</SelectItem>
                                            <SelectItem value="eletronicos">Eletrônicos</SelectItem>
                                            <SelectItem value="vestuario">Vestuário</SelectItem>
                                            <SelectItem value="moveis">Móveis</SelectItem>
                                            <SelectItem value="esporte">Esporte</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>
                        </div>
                        <DialogFooter className="flex">
                            <Button type="submit">Salvar</Button>
                            <DialogClose>
                                <Button variant="outline">Cancelar</Button>
                            </DialogClose>
                        </DialogFooter>
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    )
}

export default CadastroProduto;