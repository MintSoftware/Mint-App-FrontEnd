import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Skeleton } from "@/components/ui/skeleton"
import Api from "@/infra/helpers/api"
import { Produto } from "@/types/Produto"
import { PlusIcon, ShoppingCartIcon, StarIcon } from "lucide-react"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { toast } from "sonner"

export default function PainelProduto() {
    const [loading, setIsLoading] = useState(false)
    const [produto, setProduto] = useState<Produto>()
    const [temEstoque, setTemEstoque] = useState(true)
    const navigate = useNavigate()

    useEffect(() => {
        recuperarProduto()
    }, [])

    async function recuperarProduto() {
        try {
            setIsLoading(true)
            const idProduto = window.location.pathname.split("/").pop()
            const { data } = await Api.get(`produto/listar/${idProduto}`)
            setProduto(data)
            setIsLoading(false)
            if (data.quantidadeestoque < 1) setTemEstoque(false)
        } catch (error) {
            toast.error("Erro ao buscar produto!")
        }
    }

    function adicionarAoCarrinho(produto: Produto) {
        const carrinho = JSON.parse(localStorage.getItem("Carrinho") || "[]")
        if (carrinho.find((item: Produto) => item.id === produto.id)) {
            toast.warning("Produto já adicionado ao carrinho!")
            return
        }
        if (produto.quantidade > produto.quantidadeestoque) return toast.error("Quantidade indisponível no estoque!")
        if (produto.quantidade < 1) produto.quantidade = 1
        carrinho.push(produto)
        localStorage.setItem("Carrinho", JSON.stringify(carrinho))
        toast.success("Produto adicionado ao carrinho!")
    }

    const alterarQuantItem = (value: number) => {
        if (produto) produto.quantidade = value
    }

    const comprarAgora = (produto: Produto) => {
        if (produto.quantidade < 1) produto.quantidade = 1;
        if (produto.quantidade > produto.quantidadeestoque) return toast.error("Quantidade indisponível no estoque!");
        const usuarioJson = localStorage.getItem("UsuarioLogado");
        (usuarioJson) ? navigate("/finalizarpedido", { state: { produtos: [produto] } }) : navigate("/entrar", { state: { produtos: [produto] }});
    }

    return (
        <div className="flex flex-col">
            {loading && <div className="flex flex-col gap-6 px-4 mx-auto py-6 bg-background w-[56.5rem] border rounded-lg h-[54rem]">
                <div className="flex flex-col items-center justify-center w-full h-full">
                    <div className="flex flex-row gap-6">
                        <Skeleton className="w-[25rem] h-[33rem]" />
                        <div className="flex flex-col gap-5">
                            <Skeleton className="w-[27rem] h-[4rem]" />
                            <Skeleton className="w-[20rem] h-[2rem]" />
                            <Skeleton className="w-[15rem] mt-5 h-[2rem]" />
                            <div className="flex justify-between mt-3">
                                <div className="flex flex-col gap-2">
                                    <Skeleton className="w-[5rem] h-[2rem]" />
                                    <Skeleton className="w-[5rem] h-[2rem]" />
                                    <Skeleton className="w-[5rem] h-[2rem]" />
                                    <Skeleton className="w-[5rem] h-[2rem]" />
                                    <Skeleton className="w-[5rem] h-[2rem]" />
                                </div>
                                <div className="flex flex-col gap-2">
                                    <Skeleton className="w-[5rem] h-[2rem]" />
                                    <Skeleton className="w-[5rem] h-[2rem]" />
                                    <Skeleton className="w-[5rem] h-[2rem]" />
                                    <Skeleton className="w-[5rem] h-[2rem]" />
                                    <Skeleton className="w-[5rem] h-[2rem]" />
                                </div>
                            </div>
                            <div className="flex mt-[3rem] gap-2 justify-between">
                                <Skeleton className="w-full h-[3rem]" />
                                <Skeleton className="w-full h-[3rem]" />
                            </div>
                        </div>
                    </div>
                    <div>
                        <Skeleton className=" mt-5 w-[53.5rem] h-[17rem]" />
                    </div>
                </div>
            </div>}
            {!loading && <div className="flex flex-col gap-6 px-4 mx-auto py-6 bg-background w-[56.5rem] border rounded-lg h-[54rem]">
                <div className="flex w-full gap-5 h-[32.7rem] ">
                    <div className="flex w-full h-full md:gap-10 items-start">
                        <img
                            src={"logo.png"}
                            alt="Product Image"
                            width={400}
                            height={500}
                            className="object-cover border w-full rounded-lg overflow-hidden"
                        />
                    </div>
                    <div className="flex flex-col gap-5">
                        <div className="flex flex-col gap-4">
                            <h1 className="font-bold text-3xl lg:text-4xl">{produto?.nome}</h1>
                            <div>
                                <p>{produto?.descricao}</p>
                            </div>
                            <div className="flex items-center gap-4"></div>
                            <div className="flex items-center gap-0.5">
                                {Array.from({ length: 5 }, (_, index) => (
                                    <StarIcon
                                        key={index}
                                        className={`w-5 h-5 ${index <= Math.floor(Math.random() * 5) + 1 ? 'fill-primary' : 'fill-muted stroke-muted-foreground'}`}
                                    />
                                ))}
                            </div>
                        </div>
                        <div className="flex flex-col gap-3">
                            <div className="flex items-center justify-between">
                                <span className="text-muted-foreground">Preço:</span>
                                <span className="font-bold text-2xl">R$ {produto?.preco?.toFixed(2)}</span>
                            </div>
                            <div className="flex items-center justify-between">
                                <span className="text-muted-foreground">Estoque:</span>
                                {temEstoque ? <span>{produto?.quantidadeestoque} unidades</span> : <span className="text-red-500">Sem Estoque</span>}
                            </div>
                            <div className="flex items-center justify-between">
                                <span className="text-muted-foreground">Categoria:</span>
                                <span>{produto?.categoria.nome}</span>
                            </div>
                            <div className="flex items-center justify-between">
                                <span className="text-muted-foreground">Frete:</span>
                                <span className="text-green-500">{produto?.temFrete ? 'Pago' : 'Grátis'}</span>
                            </div>
                            <div className="flex items-center justify-between">
                                <span className="text-muted-foreground">Quantidade:</span>
                                <Select defaultValue="1" onValueChange={(value) => alterarQuantItem(Number(value))}>
                                    <SelectTrigger className="w-24">
                                        <SelectValue placeholder="Selecionar" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {[1, 2, 3, 4, 5].map((value) => (
                                            <SelectItem key={value} value={value.toString()}>
                                                {value}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>
                        <div className="flex gap-3 w-full h-full justify-center items-end">
                            <Button disabled={!temEstoque} onClick={() => adicionarAoCarrinho(produto as Produto)} size="lg" variant="outline" className="gap-2">
                                <PlusIcon className="w-5 h-5" />
                                Adicionar ao carrinho
                            </Button>
                            <Button disabled={!temEstoque} onClick={() => comprarAgora(produto as Produto)} size="lg" className="gap-2">
                                <ShoppingCartIcon className="w-5 h-5" />
                                Comprar agora
                            </Button>
                        </div>
                    </div>
                </div>
                <div>
                    <div className="flex border rounded-lg w-full h-[17rem]">
                        <ScrollArea className="w-full h-[17rem]">
                            <div className="p-4">
                                <h2 className="text-lg font-semibold">Comentários do Produto</h2>
                                <div className="mt-5 space-y-4">
                                    <div className="flex gap-4">
                                        <div className="flex-shrink-0">
                                            <img src="https://github.com/shadcn.png" alt="Avatar do Usuário" className="w-10 h-10 rounded-full" />
                                        </div>
                                        <div>
                                            <h3 className="text-sm font-semibold">José, o comprador</h3>
                                            <p className="text-sm text-gray-600">19/06/2024</p>
                                            <p className="mt-1">{produto?.nome} de qualidade, recomendo!</p>
                                        </div>
                                    </div>
                                    <div className="flex gap-4">
                                        <div className="flex-shrink-0">
                                            <img src="https://github.com/shadcn.png" alt="Avatar do Usuário" className="w-10 h-10 rounded-full" />
                                        </div>
                                        <div>
                                            <h3 className="text-sm font-semibold">Pedro Apolinário</h3>
                                            <p className="text-sm text-gray-600">19/04/2020</p>
                                            <p className="mt-1">{produto?.nome} com bom custo benefício.</p>
                                        </div>
                                    </div>
                                    <div className="flex gap-4">
                                        <div className="flex-shrink-0">
                                            <img src="https://github.com/shadcn.png" alt="Avatar do Usuário" className="w-10 h-10 rounded-full" />
                                        </div>
                                        <div>
                                            <h3 className="text-sm font-semibold">Zé da manga</h3>
                                            <p className="text-sm text-gray-600">25/12/2019</p>
                                            <p className="mt-1">{produto?.nome} de qualidade elevada, bom acabamento e cores vibrantes.</p>
                                        </div>
                                    </div>
                                    <div className="flex gap-4">
                                        <div className="flex-shrink-0">
                                            <img src="https://github.com/shadcn.png" alt="Avatar do Usuário" className="w-10 h-10 rounded-full" />
                                        </div>
                                        <div>
                                            <h3 className="text-sm font-semibold">João do alicate</h3>
                                            <p className="text-sm text-gray-600">01/07/2024</p>
                                            <p className="mt-1">{produto?.nome} OK, esperava mais</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </ScrollArea>
                    </div>
                </div>
            </div>
            }
        </div >
    )
}