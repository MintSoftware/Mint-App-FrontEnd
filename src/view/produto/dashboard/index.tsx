import { useState, useMemo } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuRadioGroup, DropdownMenuRadioItem } from "@/components/ui/dropdown-menu";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { FilterIcon, ListOrderedIcon, PlusIcon, SearchIcon, ShoppingCartIcon } from "lucide-react";
import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Pagination } from "@/components/ui/pagination";
import { PaginacaoDashBoard } from "@/components/paginacao/paginacaoDashBoard";

export default function DashBoard() {
    const [products, setProducts] = useState([
        {
            id: 1,
            name: "Tênis Esportivo",
            description: "Conforto e desempenho para suas atividades",
            price: 149.99,
            desconto: 0,
            image: "/logo.png",
            category: "Calçados",
            cobreFrete: true,
        },
        {
            id: 2,
            name: "Vestido Floral",
            description: "Elegância e estilo para qualquer ocasião",
            price: 89.99,
            desconto: 0,
            image: "/logo.png",
            category: "Roupas",
            cobreFrete: false,
        },
        {
            id: 3,
            name: "Relógio Analógico",
            description: "Design clássico e atemporal",
            price: 299.99,
            desconto: 0,
            image: "/logo.png",
            category: "Acessórios",
            cobreFrete: false,
        },
        {
            id: 4,
            name: "Bolsa de Couro",
            description: "Durabilidade e sofisticação em um só produto",
            price: 199.99,
            desconto: 0,
            image: "/logo.png",
            category: "Acessórios",
            cobreFrete: true,
        },
        {
            id: 5,
            name: "Camiseta Básica",
            description: "Peça versátil para o seu guarda-roupa",
            price: 39.99,
            desconto: 20,
            image: "/logo.png",
            category: "Roupas",
            cobreFrete: false,
        },
        {
            id: 6,
            name: "Calça Jeans",
            description: "Corte moderno e confortável",
            price: 79.99,
            desconto: 0,
            image: "/logo.png",
            category: "Roupas",
            cobreFrete: false,
        },
        {
            id: 7,
            name: "Óculos de Sol",
            description: "Proteção e estilo para os seus olhos",
            price: 129.99,
            desconto: 0,
            image: "/logo.png",
            category: "Acessórios",
            cobreFrete: false,
        },
        {
            id: 8,
            name: "Sapato Social",
            description: "Elegância e conforto para o dia a dia",
            price: 199.99,
            desconto: 0,
            image: "/logo.png",
            category: "Calçados",
            cobreFrete: false,
        },
        {
            id: 9,
            name: "Blusa de Frio",
            description: "Conforto e estilo para os dias mais frios",
            price: 59.99,
            desconto: 0,
            image: "/logo.png",
            category: "Roupas",
            cobreFrete: true,
        },
        {
            id: 10,
            name: "Pulseira de Prata",
            description: "Detalhe sofisticado para o seu visual",
            price: 49.99,
            desconto: 0,
            image: "/logo.png",
            category: "Acessórios",
            cobreFrete: false,
        },
        {
            id: 11,
            name: "Bermuda de Praia",
            description: "Conforto e estilo para os dias de sol",
            price: 69.99,
            desconto: 0,
            image: "/logo.png",
            category: "Roupas",
            cobreFrete: true,
        },
        {
            id: 12,
            name: "Mochila Esportiva",
            description: "Praticidade e conforto para os seus treinos",
            price: 119.99,
            desconto: 0,
            image: "/logo.png",
            category: "Acessórios",
            cobreFrete: false,
        }
    ]);

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

    const filteredProducts = useMemo(() => {
        return products
            .filter((product) => {
                if (selectedFilters.category.length > 0 && !selectedFilters.category.includes(product.category)) {
                    return false;
                }
                if (product.price < selectedFilters.price.min || product.price > selectedFilters.price.max) {
                    return false;
                }
                if (searchQuery && !product.name.toLowerCase().includes(searchQuery.toLowerCase())) {
                    return false;
                }
                return true;
            })
            .sort((a, b) => {
                switch (sort) {
                    case "low":
                        return a.price - b.price;
                    case "high":
                        return b.price - a.price;
                    default:
                        return 0;
                }
            });
    }, [selectedFilters, sort, searchQuery]);

    const indexOfLastProduct = currentPage * productsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
    const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);
    const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

    const handlePageChange = (pageNumber: number) => {
        setCurrentPage(pageNumber);
    };

    return (
        <div className="w-full max-w-fullcontainer mx-auto px-4 md:px-6 ">
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
                        <Button variant="outline" className="flex items-center gap-2">
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
                                        <Label className="flex items-center gap-2 font-normal">
                                            <Checkbox onCheckedChange={() => handleFilterChange("category", "Roupas")} />
                                            Roupas
                                        </Label>
                                        <Label className="flex items-center gap-2 font-normal">
                                            <Checkbox onCheckedChange={() => handleFilterChange("category", "Eletrônicos")} />
                                            Eletrônicos
                                        </Label>
                                        <Label className="flex items-center gap-2 font-normal">
                                            <Checkbox onCheckedChange={() => handleFilterChange("category", "Alimentos")} />
                                            Alimentos
                                        </Label>
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
                <ScrollArea className="w-full h-[47rem]">
                    <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-5">
                        {currentProducts.map((product) => (
                            <Card key={product.id} className="p-4">
                                <div className="flex flex-col">
                                    <img src={product.image} alt={product.name} className="w-full h-48 object-cover mb-4" />
                                    <h2 className="text-lg font-semibold mb-2">{product.name}</h2>
                                    <p className="text-gray-600 mb-2">{product.category}</p>
                                    <div className="flex items-center justify-between w-full">
                                        <span className="text-xl font-bold">
                                            R$ {product.price.toFixed(2)}
                                            <Label className="text-green-500 ml-2">{product.desconto > 1 && `-${product.desconto}% desconto`}</Label>
                                        </span>
                                        <Label className="flex items-center">
                                            12x de {(product.price / 12).toFixed(2)}
                                        </Label>
                                    </div>
                                    <Label className="text-green-500">{!product.cobreFrete && 'Frete gratis'}</Label>
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
