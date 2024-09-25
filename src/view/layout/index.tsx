import { ReactNode } from "react"
import MenuSuperior from "./menusuperior/menuSuperior"

interface props {
    children?: ReactNode
}

export function Layout({ children }: props) {
    return (
        <div className="flex w-screen h-screen ">
            <div className="flex flex-col w-full">
                <MenuSuperior />
                <main className="flex justify-center items-center">
                    {children}
                </main>
            </div>
        </div>
    )
}