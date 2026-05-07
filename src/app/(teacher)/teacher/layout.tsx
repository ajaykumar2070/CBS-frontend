import Sidebar from "@/components/shared/Sidebar";

export default function TeacherLayout({ children }: { children: React.ReactNode }) {
    return (
        <section className="h-screen flex p-4 gap-4">
            <Sidebar />

            <div className="w-full p-4 h-full overflow-y-auto">
                {children}
            </div>
        </section>
    )
}


