'use client'
import Link from "next/link";
import { Button } from "../ui/button";
import { useAuth } from "@/context/AuthProvider";

export default function Header() {
    const { user } = useAuth()
    const route = user?.role === "TEACHER" ? '/teacher/dashboard' : '/principal/dashboard'
    return (
        <section className="py-3 bg-background-surface">
            <div className="max-w-7xl mx-auto flex items-center justify-between">
                <h2 className="font-bold text-2xl">CBS-Frontend</h2>
                <div className="flex gap-4 items-center justify-end">
                    {
                        user ?
                            <Button asChild><Link href={`${route}`}>Dashboard</Link></Button>
                            :
                            <Button asChild><Link href='/login'>Login</Link></Button>
                    }
                </div>
            </div>
        </section>
    )
}