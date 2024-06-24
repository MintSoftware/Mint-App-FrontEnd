import { Button } from "@/components/ui/button";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import Api from "@/infra/helpers/api";
import { Categoria } from "@/types/Categoria";
import { Produto } from "@/types/Produto";
import { useEffect, useState } from "react";
import { toast } from "sonner";

interface EditarProps {
    produto: Produto;
}

const EditarProduto = ({ produto }: EditarProps) => {
    const [nome, setNome] = useState<string>(produto.nome as string);
    const [descricao, setDescricao] = useState<string>(produto.descricao as string);
    const [preco, setPreco] = useState<number>(produto.preco);
    const [quantidade, setQuantidade] = useState<number>(produto.quantidade);
    const [quantidadeEstoque, setQuantidadeEstoque] = useState<number>(produto.quantidadeestoque);
    const [categoria, setCategoria] = useState<Categoria>(produto.categoria);
    const [categoriaList, setCategoriaList] = useState<Categoria[]>([]);

    useEffect(() => {
        setNome(produto.nome as string);
        setDescricao(produto.descricao as string);
        setPreco(produto.preco);
        setQuantidade(produto.quantidade);
        setQuantidadeEstoque(produto.quantidadeestoque);
        setCategoria(produto.categoria);
        recuperarCategorias();
    }, [produto]);

    const recuperarCategorias = async () => {
        try {
            const { data } = await Api.get("/categoria/listar");
            setCategoriaList(data);
        } catch (error) {
            toast.error("Erro ao buscar categorias!");
        }
    };

    const salvar = async () => {
        const produtoAtualizado = {
            nome,
            descricao,
            preco,
            quantidade,
            quantidadeestoque: quantidadeEstoque,
            categoria
        };

        try {
            await Api.put(`/produto/${produto.id}/atualizar`, produtoAtualizado);
            toast.success("Produto atualizado com sucesso!");
        } catch (error) {
            toast.error("Erro ao atualizar produto!");
            console.error("Erro ao atualizar produto: ", error);
        }
    };

    return (
        <div>
            <Dialog>
                <DialogTrigger asChild className="relative flex cursor-pointer select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50">
                    <div>Editar</div>
                </DialogTrigger>
                <DialogContent onInteractOutside={(evento) => evento.preventDefault()} className="flex flex-row items-center sm:max-w-[50%] max-h-50 h-[35rem] p-[2rem] gap-8">
                    <div className="flex justify-center w-[50%] h-full">
                        <Carousel className="border max-w-[80%] h-full">
                            <CarouselNext />
                            <CarouselContent>
                                <CarouselItem>
                                    <img src="/placeholder.svg" width={448} height={252} alt="Image" className="aspect-video object-cover rounded-md" />
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
                            <DialogTitle>Edite o seu produto</DialogTitle>
                            <DialogDescription>Edite ai o seu Lindão.</DialogDescription>
                        </DialogHeader>
                        <div className="grid gap-4 py-4 pb-24">
                            <div className="grid grid-cols-2 gap-4">
                                <div className="grid gap-2">
                                    <Label htmlFor="name">Nome</Label>
                                    <Input id="name" placeholder="Nome do produto" value={nome} onChange={(e) => setNome(e.target.value)} />
                                </div>
                            </div>    
                            <div className="grid gap-2">
                                <Label htmlFor="description">Descrição</Label>
                                <Textarea id="description" placeholder="Descrição do produto" value={descricao} onChange={(e) => setDescricao(e.target.value)} />
                          </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="grid gap-2">
                                        <Label htmlFor="price">Preço</Label>
                                        <Input id="price" type="number" placeholder="Preço do produto" value={preco} onChange={(e) => setPreco(Number(e.target.value))} />
                                    </div>
                                    <div className="grid gap-2">
                                        <Label htmlFor="quantity">Quantidade</Label>
                                        <Input id="quantity" type="number" placeholder="Quantidade do produto" value={quantidade} onChange={(e) => setQuantidade(Number(e.target.value))} />
                                    </div>
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="grid gap-2">
                                        <Label htmlFor="stock">Estoque</Label>
                                        <Input id="stock" type="number" placeholder="Quantidade em estoque" value={quantidadeEstoque} onChange={(e) => setQuantidadeEstoque(Number(e.target.value))} />
                                    </div>
                                    <div className="flex flex-col gap-2 ">
                                        <Label htmlFor="category">Categoria</Label>
                                        <Select onValueChange={(value) => setCategoria(JSON.parse(value))}>
                                            <SelectTrigger className="w-full">
                                                <SelectValue placeholder="Selecione a categoria" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {categoriaList.map((categoria) => (
                                                    <SelectItem key={categoria.id} value={JSON.stringify(categoria)}>
                                                        {categoria.nome}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                        </div>
                                </div>
                            </div>
                        <DialogFooter className="flex">
                            <Button onClick={salvar}>Salvar</Button>
                            <DialogClose asChild>
                                <Button variant="outline">Cancelar</Button>
                            </DialogClose>
                        </DialogFooter>
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    );
};

export default EditarProduto;