'use client'
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import z from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from "@hookform/resolvers/zod";
import { Spinner } from "@/components/ui/spinner";
import { loginUser } from "@/services/auth.service";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useAuth, UserRole } from "@/context/AuthProvider";

const loginSchema = z.object({
    email: z.string().min(1, "Email is required").pipe(z.email()),
    password: z.string().min(1, "Password is required")
})

type InputTypes = z.infer<typeof loginSchema>

export default function Login() {
    const { user, setUser } = useAuth()
    const router = useRouter()
    const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<InputTypes>({
        resolver: zodResolver(loginSchema)
    })

    const { mutate, isPending, error } = useMutation({
        mutationKey: ['user-login'],
        mutationFn: (data: InputTypes) => loginUser(data),
        onSuccess: (data) => {
            const role = data.role
            router.push(role === 'TEACHER' ? '/teacher/dashboard' : 'principal/dashboard')
            setUser({
                id: data.id,
                email: data.email,
                role: data.role as UserRole
            })
            localStorage.setItem("user", JSON.stringify(data))
        },
        onError: (error) => {
            console.log(error)
        }
    })

    const onSubmit = (data: InputTypes) => {
        mutate(data)
    }
    if (user) router.push(user.role === 'TEACHER' ? '/teacher/dashboard' : 'principal/dashboard')
    return (
        <section className="h-screen p-4 flex items-center justify-center">
            <div className="mx-auto w-full max-w-md">
                <div className="border border-background-surface rounded-xl p-4 shadow-lg">
                    <h2 className="text-3xl text-center font-bold">Login</h2>
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 mt-4">
                        <div className="space-y-1">
                            <p className="text-sm font-bold">Email*</p>
                            <Input {...register('email')} type="text" placeholder="Email address" />
                            {errors.email && <p className="text-sm text-red-500">{errors.email.message}</p>}
                        </div>
                        <div className="space-y-1">
                            <p className="text-sm font-bold">Password*</p>
                            <Input {...register('password')} type="password" placeholder="password" />
                            {errors.password && <p className="text-sm text-red-500">{errors.password.message}</p>}
                        </div>
                        <div className="w-fit mx-auto text-center space-y-4">
                            {error && <p className="text-sm text-red-500">{error.message}</p>}
                            <Button type="submit" disabled={isSubmitting || isPending}>
                                Login
                                {isSubmitting || isPending && <Spinner />}
                            </Button>
                        </div>
                    </form>
                </div>
                <div className="mt-4 rounded-xl border bg-zinc-50 p-4 text-sm space-y-4">
                    <div >
                        <h3 className="font-semibold">Principal Login</h3>
                        <p>Email: admin@gmail.com</p>
                        <p>Password: admin123</p>
                    </div>

                    <div>
                        <h3 className="font-semibold">Teacher Login</h3>
                        <p>Email: teacher@gmail.com</p>
                        <p>Password: teacher123</p>
                    </div>
                </div>
            </div>

        </section>
    )
}