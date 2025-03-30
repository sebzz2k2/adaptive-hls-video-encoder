
"use client"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export function RegisterForm({
    className,
    ...props
}: React.ComponentProps<"div">) {
    return (
        <div className={cn("flex flex-col gap-6", className)} {...props}>
            <form>
                <div className="flex flex-col gap-6">
                    <div className="flex flex-col items-center gap-2">
                        <div className="flex items-center gap-2 text-4xl font-bold">
                            Create an account
                        </div>
                        <div className="text-md text-muted-foreground text-center">
                            Enter your email and and password below to create your account
                        </div>
                    </div>
                    <div className="flex flex-col gap-6">
                        <div className="grid gap-3">
                            <Input
                                id="email"
                                type="email"
                                placeholder="Email"
                                required
                            />
                            <Input
                                id="register-pwd"
                                type="password"
                                placeholder="Password"
                                required
                            />
                            <Input
                                id="register-cnf-pwd"
                                type="password"
                                placeholder="Confirm Password"
                                required
                            />                        
                        </div>
                        <Button type="submit" className="w-full">
                            Sign in with email
                        </Button>
                    </div>
                </div>
            </form>
        </div>
    )
}


export function RedirectButton() {
    return (
        <Button
            variant="ghost"
            className="absolute right-6 top-6"
            onClick={() => window.location.href = "/login"}
        >
            Sign in
        </Button>
    )
}
