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
import { toast } from "sonner";

export default function DashBoard() {
    const [produtos, setProdutos] = useState<Produto[]>([]);
    const [categorias, setCategorias] = useState<Categoria[]>([]);
    const [loading, setLoading] = useState(true);

    const [selectedFilters, setSelectedFilters] = useState<{
        category: string[];
        price: { min: number; max: number };
    }>({
        category: [],
        price: { min: 0, max: Infinity },
    });

    const [searchQuery, setSearchQuery] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [productsPerPage, setProductsPerPage] = useState(10);

    const handleFilterChange = (type: any, value: any) => {
        if (type === "category") {
            setSelectedFilters({
                ...selectedFilters,
                category: selectedFilters.category.includes(value)
                    ? selectedFilters.category.filter((item) => item !== value)
                    : [...selectedFilters.category, value],
            });
        } else if (type === "price") {
            setSelectedFilters({
                ...selectedFilters,
                price: value,
            });
        }
    };

    const handleSearch = (event: any) => {
        setSearchQuery(event.target.value);
        setCurrentPage(1);
    };

    const [sort, setSort] = useState("featured");
    const handleSort = (value: any) => {
        setSort(value);
    };

    useEffect(() => {
        buscarProdutos();
        buscarCategorias();
    }, []);

    const buscarProdutos = async () => {
        try {
            const { data } = await Api.get('produto/listar/destaques');
            setProdutos(data);
            setLoading(false);
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

    const filteredProducts = useMemo(() => {
        return produtos
            .filter((product: Produto) => {
                if (selectedFilters.category.length > 0 && !selectedFilters.category.includes(product.categoria.nome as string)) {
                    return false;
                }
                if (product.preco < selectedFilters.price.min || product.preco > selectedFilters.price.max) {
                    return false;
                }
                if (searchQuery && !product.nome.toLowerCase().includes(searchQuery.toLowerCase())) {
                    return false;
                }
                return true;
            })
            .sort((a, b) => {
                switch (sort) {
                    case "low":
                        return a.preco - b.preco;
                    case "high":
                        return b.preco - a.preco;
                    default:
                        return 0;
                }
            });
    }, [produtos, selectedFilters, sort, searchQuery]);

    const indexOfLastProduct = currentPage * productsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
    const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);
    const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

    const handlePageChange = (pageNumber: number) => {
        setCurrentPage(pageNumber);
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
                            value={searchQuery}
                            onChange={handleSearch}
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
                                                    onCheckedChange={() => handleFilterChange("category", categoria.nome)}
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
                                                onChange={(e) => handleFilterChange("price", { ...selectedFilters.price, min: Number(e.target.value) })}
                                            />
                                        </Label>
                                        <Label className="flex items-center gap-2 font-normal">
                                            <Input
                                                type="number"
                                                placeholder="Max"
                                                className="w-full"
                                                onChange={(e) => handleFilterChange("price", { ...selectedFilters.price, max: Number(e.target.value) })}
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
                            <DropdownMenuRadioGroup value={sort} onValueChange={handleSort}>
                                <DropdownMenuRadioItem value="featured">Em destaque</DropdownMenuRadioItem>
                                <DropdownMenuRadioItem value="low">Preço: menor para maior</DropdownMenuRadioItem>
                                <DropdownMenuRadioItem value="high">Preço: maior para menor</DropdownMenuRadioItem>
                            </DropdownMenuRadioGroup>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </div>
            <div className="flex flex-col md:flex-row gap-6">
                <ScrollArea className="w-full h-[43.6rem] p-3">
                    <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-5">
                        {loading && Array.from({ length: 10 }).map((_, index) => (
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
                        {!loading &&currentProducts.map((product) => (
                            <Card key={product.id} className="p-4">
                                <div className="flex flex-col">
                                    <img src='/logo.png' className="w-full h-48 object-cover mb-4" />
                                    <h2 className="text-lg font-semibold mb-2">{product.nome}</h2>
                                    <p className="text-gray-600 mb-2">{product.categoria.nome}</p>
                                    <div className="flex items-center justify-between w-full">
                                        <span className="text-xl font-bold">
                                            R$ {product.preco.toFixed(2)}
                                        </span>
                                        <Label className="flex items-center">
                                            até 12x de {(product.preco / 12).toFixed(2)}
                                        </Label>
                                    </div>
                                    <Label className="text-green-500">{!product.temFrete && 'Frete grátis'}</Label>
                                </div>
                            </Card>
                        ))}
                    </div>
                </ScrollArea>
            </div>
            <div>
                <PaginacaoDashBoard
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={handlePageChange}
                    pageSize={productsPerPage}
                    setPageSize={setProductsPerPage}
                />
            </div>
        </div>
    );
}
