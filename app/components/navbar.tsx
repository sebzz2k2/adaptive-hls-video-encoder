import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export default function Navbar() {

    return (
        <header className="flex justify-between items-center border-b border-gray-800 px-8 py-4">
            <div className="text-2xl">VeloStream</div>
            <Avatar className="">
                <AvatarImage src="https://github.com/shadcn.png" />
                <AvatarFallback>CN</AvatarFallback>
            </Avatar>
        </header>
    )
}