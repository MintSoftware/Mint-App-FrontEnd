import { PaginacaoDashBoard } from "@/components/paginacao/paginacaoDashBoard";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { DropdownMenu, DropdownMenuContent, DropdownMenuLabel, DropdownMenuRadioGroup, DropdownMenuRadioItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Skeleton } from "@/components/ui/skeleton";
import Api from "@/infra/helpers/api";
import { Categoria } from "@/types/Categoria";
import { Produto } from "@/types/Produto";
import { FilterIcon, ListOrderedIcon, SearchIcon } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "sonner";

export default function PainelDeControle() {
    const [produtos, setProdutos] = useState<Produto[]>([]);
    const [categorias, setCategorias] = useState<Categoria[]>([]);
    const [carregando, setCarregando] = useState(true);

    const [filtrosSelecionados, setFiltrosSelecionados] = useState<{
        categoria: string[];
        preco: { min: number; max: number };
    }>({
        categoria: [],
        preco: { min: 0, max: Infinity },
    });

    const [consultaDePesquisa, setConsultaDePesquisa] = useState("");
    const [paginaAtual, setPaginaAtual] = useState(1);
    const [produtosPorPagina, setProdutosPorPagina] = useState(10);

    const alterarFiltros = (tipo: any, valor: any) => {
        if (tipo === "preco" && valor.max === 0) {
            setFiltrosSelecionados((filtrosAnteriores) => ({
                ...filtrosAnteriores,
                preco: { min: valor.min, max: Infinity },
            }));
        } else if (tipo === "preco" && valor.max !== 0) {
            setFiltrosSelecionados({
                ...filtrosSelecionados,
                preco: valor,
            });
        } else if (tipo === "categoria") {
            setFiltrosSelecionados({
                ...filtrosSelecionados,
                categoria: filtrosSelecionados.categoria.includes(valor)
                    ? filtrosSelecionados.categoria.filter((item) => item !== valor)
                    : [...filtrosSelecionados.categoria, valor],
            });
        }
    };

    const alterarPesquisa = (evento: any) => {
        setConsultaDePesquisa(evento.target.value);
        setPaginaAtual(1);
    };

    const [ordenacao, setOrdenacao] = useState("destaque");
    const alterarOrdenacao = (valor: any) => {
        setOrdenacao(valor);
    };

    useEffect(() => {
        buscarProdutos();
        buscarCategorias();
    }, []);

    const buscarProdutos = async () => {
        setCarregando(true);
        try {
            const { data } = await Api.get('produto/listar/destaques');
            setProdutos(data);
            setCarregando(false);
        } catch (error) {
            toast.error("Erro ao buscar produtos!");
        }
    };

    const buscarCategorias = async () => {
        try {
            const { data } = await Api.get('categoria/listar');
            setCategorias(data);
        } catch (error) {
            toast.error("Erro ao buscar categorias!");
        }
    };

    const produtosFiltrados = useMemo(() => {
        return produtos
            .filter((produto: Produto) => {
                if (filtrosSelecionados.categoria.length > 0 && !filtrosSelecionados.categoria.includes(produto.categoria.nome as string)) {
                    return false;
                }
                if (produto.preco < filtrosSelecionados.preco.min || produto.preco > filtrosSelecionados.preco.max) {
                    return false;
                }
                if (consultaDePesquisa && !produto.nome.toLowerCase().includes(consultaDePesquisa.toLowerCase())) {
                    return false;
                }
                return true;
            })
            .sort((a, b) => {
                switch (ordenacao) {
                    case "baixo":
                        return a.preco - b.preco;
                    case "alto":
                        return b.preco - a.preco;
                    default:
                        return 0;
                }
            });
    }, [produtos, filtrosSelecionados, ordenacao, consultaDePesquisa]);

    const indiceUltimoProduto = paginaAtual * produtosPorPagina;
    const indicePrimeiroProduto = indiceUltimoProduto - produtosPorPagina;
    const produtosAtuais = produtosFiltrados.slice(indicePrimeiroProduto, indiceUltimoProduto);
    const totalDePaginas = Math.ceil(produtosFiltrados.length / produtosPorPagina);

    const alterarPagina = (numeroDaPagina: number) => {
        setPaginaAtual(numeroDaPagina);
    };

    return (
        <div className="w-full max-w-fullcontainer mx-auto px-4 md:px-6 mt-[3rem]">
            <div className="flex items-center justify-between mb-6">
                <h1 className="text-2xl font-bold">Produtos em Destaque</h1>
                <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2">
                        <Input
                            type="search"
                            placeholder="Pesquisar produtos..."
                            value={consultaDePesquisa}
                            onChange={alterarPesquisa}
                            className="w-[200px] md:w-[300px]"
                        />
                        <Button onClick={() => buscarProdutos()} variant="outline" className="flex items-center gap-2">
                            <SearchIcon className="w-4 h-4" />
                            Pesquisar
                        </Button>
                    </div>
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="outline" className="flex items-center gap-2">
                                <FilterIcon className="w-4 h-4" />
                                Filtros
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="w-[300px]">
                            <DropdownMenuLabel>Filtrar por</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <div className="grid gap-4">
                                <div>
                                    <h3 className="text-sm font-medium mb-2">Categoria</h3>
                                    <div className="grid gap-2">
                                        {categorias.map((categoria) => (
                                            <Label key={categoria.id} className="flex items-center gap-2 font-normal">
                                                <Checkbox
                                                    onCheckedChange={() => alterarFiltros("categoria", categoria.nome)}
                                                />
                                                {categoria.nome}
                                            </Label>
                                        ))}
                                    </div>
                                </div>
                                <div>
                                    <h3 className="text-sm font-medium mb-2">Preço</h3>
                                    <div className="grid gap-2">
                                        <Label className="flex items-center gap-2 font-normal">
                                            <Input
                                                type="number"
                                                placeholder="Min"
                                                className="w-full"
                                                onChange={(e) => alterarFiltros("preco", { ...filtrosSelecionados.preco, min: Number(e.target.value) })}
                                            />
                                        </Label>
                                        <Label className="flex items-center gap-2 font-normal">
                                            <Input
                                                type="number"
                                                placeholder="Max"
                                                className="w-full"
                                                onChange={(e) => alterarFiltros("preco", { ...filtrosSelecionados.preco, max: Number(e.target.value) })}
                                            />
                                        </Label>
                                    </div>
                                </div>
                            </div>
                        </DropdownMenuContent>
                    </DropdownMenu>
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="outline" className="flex items-center gap-2">
                                <ListOrderedIcon className="w-4 h-4" />
                                Ordenar
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="w-[200px]">
                            <DropdownMenuLabel>Ordenar por</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuRadioGroup value={ordenacao} onValueChange={alterarOrdenacao}>
                                <DropdownMenuRadioItem value="destaque">Em destaque</DropdownMenuRadioItem>
                                <DropdownMenuRadioItem value="baixo">Preço: menor para maior</DropdownMenuRadioItem>
                                <DropdownMenuRadioItem value="alto">Preço: maior para menor</DropdownMenuRadioItem>
                            </DropdownMenuRadioGroup>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </div>
            <div className="flex flex-col md:flex-row gap-6">
                <ScrollArea className="w-full h-[43.6rem] p-3">
                    <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-5">
                        {carregando && Array.from({ length: 10 }).map((_, index) => (
                            <div key={index} className="p-4">
                                <Skeleton className="w-full h-48 object-cover mb-4" />
                                <Skeleton className="w-full h-8 mb-2" />
                                <Skeleton className="w-32 h-5 mb-2" />
                                <div className="flex items-center justify-between w-full">
                                    <Skeleton className="w-24 h-8 mb-2" />
                                    <Skeleton className="w-24 h-4" />
                                </div>
                                <Skeleton className="w-full h-4 p-2" />
                            </div>
                        ))}
                        {!carregando && produtosAtuais.map((produto) => (
                            <Link to={`/produtos/${produto.id}`} key={produto.id}>
                                <Card key={produto.id} className="h-[22rem] p-4 cursor-pointer">
                                    <div className="flex flex-col max-h-[22rem]">
                                        <img src='/logo.png' className="w-full h-48 object-cover mb-4" />
                                        <h2 className="h-[2rem] overflow-hidden text-lg font-semibold mb-2">{produto.nome}</h2>
                                        <p className="text-gray-600 mb-2">{produto.categoria.nome}</p>
                                        <div className="flex items-center justify-between w-full cursor-pointer">
                                            <span className="text-xl font-bold cursor-pointer">
                                                R$ {produto.preco.toFixed(2)}
                                            </span>
                                            <Label className="flex items-center cursor-pointer">
                                                até 12x de {(produto.preco / 12).toFixed(2)}
                                            </Label>
                                        </div>
                                        <Label className="text-green-500 cursor-pointer">{!produto.temFrete && 'Frete grátis'}</Label>
                                    </div>
                                </Card>
                            </Link>
                        ))}
                    </div>
                </ScrollArea>
            </div>
            <div>
                <PaginacaoDashBoard
                    currentPage={paginaAtual}
                    totalPages={totalDePaginas}
                    onPageChange={alterarPagina}
                    pageSize={produtosPorPagina}
                    setPageSize={setProdutosPorPagina}
                />
            </div>
        </div>
    );
}
