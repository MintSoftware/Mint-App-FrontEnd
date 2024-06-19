import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { useEffect, useState } from "react"
import { PlusIcon, ShoppingCartIcon, StarIcon } from "lucide-react"
import { Produto } from "@/types/Produto"
import Api from "@/infra/helpers/api"
import { toast } from "sonner"
import { ScrollArea } from "@/components/ui/scroll-area"

export default function PainelProduto() {
    const [loading, setIsLoading] = useState(false)
    const [produto, setProduto] = useState<Produto>()

    useEffect(() => {
        recuperarProduto()
    }, [])

    async function recuperarProduto() {
        try {
            setIsLoading(true)
            const idProduto = window.location.pathname.split("/").pop()
            const { data } = await Api.get(`produto/listar/${idProduto}`);
            setProduto(data);
            setIsLoading(false);
        } catch (error) {
            toast.error("Erro ao buscar produto!")
        }
    }

    return (
        <div>
            {!loading && <div className="flex flex-col gap-6 px-4 mx-auto py-6 bg-background w-[56.5rem] border rounded-lg h-[54rem]">
                <div className="flex w-full gap-5 h-[39.3rem] ">
                    <div className="flex w-full h-full md:gap-10 items-start">
                        <img
                            src={"logo.png"}
                            alt="Product Image"
                            width={600}
                            height={900}
                            className="aspect-[2/3] object-cover border w-full rounded-lg overflow-hidden"
                        />
                    </div>
                    <div className="flex flex-col gap-5">
                        <div className="flex flex-col gap-4">
                            <h1 className="font-bold text-3xl lg:text-4xl">{produto?.nome}</h1>
                            <div>
                                <p>
                                    {produto?.descricao}
                                </p>
                            </div>
                            <div className="flex items-center gap-4"></div>
                            <div className="flex items-center gap-0.5">
                                {Array.from({ length: 5 }, (_, index) => (
                                    <StarIcon
                                        key={index}
                                        className={`w-5 h-5 ${(Math.random() * 10) > 5 ? 'fill-primary' : 'fill-muted stroke-muted-foreground'}
                                        ) ? 'fill-primary' : 'fill-muted stroke-muted-foreground'}`}
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
                                <span>{produto?.quantidadeestoque} unidades</span>
                            </div>
                            <div className="flex items-center justify-between">
                                <span className="text-muted-foreground">Categoria:</span>
                                <span>{produto?.categoria.nome}</span>
                            </div>
                            <div className="flex items-center justify-between">
                                <span className="text-muted-foreground">Frete:</span>
                                <span className="text-green-500">{produto?.temFrete ? 'Grátis' : 'Não Grátis'}</span>
                            </div>
                            <div className="flex items-center justify-between">
                                <span className="text-muted-foreground">Quantidade:</span>
                                <Select defaultValue="1">
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
                            <Button size="lg" variant="outline" className="gap-2">
                                <PlusIcon className="w-5 h-5" />
                                Adicionar ao carrinho
                            </Button>
                            <Button size="lg" className="gap-2">
                                <ShoppingCartIcon className="w-5 h-5" />
                                Comprar agora
                            </Button>
                        </div>
                    </div>
                </div>
                <div>
                    <div className="flex border rounded-lg w-full h-[10rem]">
                        <ScrollArea className="h-[10rem]">
                            <div className="p-4">
                                <h2 className="text-lg font-semibold">Comentários do Produto</h2>
                                <div className="mt-5 space-y-4">
                                    {/* Exemplo de comentário */}
                                    <div className="flex gap-4">
                                        <div className="flex-shrink-0">
                                            <img src="https://github.com/shadcn.png" alt="Avatar do Usuário" className="w-10 h-10 rounded-full" />
                                        </div>
                                        <div>
                                            <h3 className="text-sm font-semibold">Nome do Usuário</h3>
                                            <p className="text-sm text-gray-600">Data do Comentário</p>
                                            <p className="mt-1">Texto do comentário do usuário sobre o produto.</p>
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