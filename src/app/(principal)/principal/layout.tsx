
import Sidebar from "@/components/shared/Sidebar";

export default function PrincipalLayout({ children }: { children: React.ReactNode }) {
    // const router = useRouter()
    // const { user } = useAuth()
    // if (!user) {
    //     router.push('/login')
    //     return
    // }
    return (
        <section className="h-screen flex p-4 gap-4">
            <Sidebar />

            <div className="w-full p-4 h-full overflow-y-auto">
                <div className="flex items-center justify-between">
                    <h2 className="text-2xl font-bold">Dashboard</h2>
                </div>
                {children}
            </div>
        </section >
    )
}


