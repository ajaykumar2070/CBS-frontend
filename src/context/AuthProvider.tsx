'use client'
import { createContext, Dispatch, SetStateAction, useContext, useEffect, useState } from 'react'

export type UserRole = "PRINCIPAL" | "TEACHER"
type User = {
    id:string
    role: UserRole
    email: string
}
interface AuthContextType {
    user: User | null
    setUser: Dispatch<SetStateAction<User | null>>
}
const AuthContext = createContext<AuthContextType | null>(null)

export default function AuthProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<User | null>(null)

    useEffect(() => {
        const savedUser = localStorage.getItem("user")
        if (savedUser) {
            const parsed = JSON.parse(savedUser)
            setUser({
                id:parsed.id,
                role: parsed.role,
                email: parsed.email
            })
        }
    }, [])
    return (
        <AuthContext.Provider value={{ user, setUser }}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => {
    const context = useContext(AuthContext)
    if (!context) throw new Error("useAuth must be inside Auth Provider")
    return context
}