'use client'
import { logout } from "@/services/auth.service"
import { Button } from "../ui/button"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useMutation } from "@tanstack/react-query"
import { Spinner } from "../ui/spinner"
import { useAuth } from "@/context/AuthProvider"

interface NavItems {
    title: string,
    url: string
}
const TeacherNavItems: NavItems[] = [
    { title: "All Content", url: "/teacher/dashboard" },
    { title: "Upload Content", url: "/teacher/upload-content" },
]
const PricipalNavItems: NavItems[] = [
    { title: "All Content", url: "/principal/dashboard" },
]

export default function Sidebar() {
    const { user, setUser } = useAuth()
    const router = useRouter()
    const { mutate: onLogout, isPending } = useMutation({
        mutationKey: ['logout'],
        mutationFn: () => logout(),
        onSuccess: () => {
            localStorage.removeItem("user")
            router.push('/login')
            setUser(null)
        },
        onError: (error) => {
            console.log(error)
        }
    })
    const nav = user?.role === 'TEACHER' ? TeacherNavItems : PricipalNavItems
    return (
        <div className="w-full h-full max-w-60 rounded-xl bg-background-surface shadow-lg border border-black/5 p-4 flex flex-col justify-between">
            <div>
                <h2 className="text-2xl font-bold">CBS-Frontend</h2>
                <div className="mt-4 flex flex-col">
                    {
                        nav.map((item, i) => {
                            return (
                                <div key={item.title}>
                                    <Link key={item.title} href={`${item.url}`}>
                                        <div className="w-full p-2 rounded-md border-black/5 hover:bg-cyan-300/50 cursor-pointer transition-all duration-300">
                                            <p className="font-medium">{item.title}</p>
                                        </div>
                                    </Link>
                                    <div className="border-b border-black/20 border-dashed my-2" />
                                </div>
                            )
                        })
                    }
                </div>
            </div>
            <Button onClick={() => onLogout()} disabled={isPending}>
                Logout
                {isPending && <Spinner />}
            </Button>
        </div>
    )
}