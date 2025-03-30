
"use client"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <form>
        <div className="flex flex-col gap-6">
          <div className="flex flex-col items-center gap-2">
          <div className="flex items-center gap-2 text-4xl font-bold">
            Welcome Back
            </div> 
            <div className="text-md text-muted-foreground text-center">
              Enter your email and password below to log into your account.
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
                id="pwd"
                type="password"
                placeholder="Password"
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
      onClick={() => window.location.href = "/register"}
    >
      Sign up
    </Button>
  )
}
