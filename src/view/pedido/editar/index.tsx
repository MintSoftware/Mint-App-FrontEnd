import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog"
import { SearchIcon } from "lucide-react"

export const EditarPedido = (pedido: any) => {
    return (
        <div>
            <Dialog>
                <DialogTrigger asChild className="relative flex cursor-pointer select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50">
                    <Button variant="ghost" className="h-8 w-8 p-0">
                        <SearchIcon className="h-4 w-4" />
                    </Button>
                </DialogTrigger>
                <DialogContent>
                    <div>
                        <h1>Editar Pedido</h1>
                        <div>
                            <p>{pedido.status}</p>
                            <p>{pedido.valorTotal}</p>
                        </div>
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    )
}