import { ReactNode } from "react"
import MenuLateral from "./menulateral"
import MenuSuperior from "./menusuperior"

interface props {
    children?: ReactNode
}

export function Layout({ children }: props) {
    return (
        <div className="flex w-screen h-screen bg-muted/40">
            <div className="flex flex-col ">
                <MenuLateral />
            </div>
            <div className="flex flex-col w-full">
                <MenuSuperior />
                <main className="flex justify-center items-center">
                    {children}
                </main>
            </div>
        </div>
    )
}