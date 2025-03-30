import { LoginForm, RedirectButton} from "@/components/login-form"

export default function LoginPage() {
  return (
    <>
      <div className="flex items-center justify-end gap-2 bg-background p-6 md:p-10">
        <RedirectButton />
      </div>
      <div className="bg-background flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10">
        <div className="w-full max-w-sm">
          <LoginForm />
        </div>
      </div>
    </>
  )
}
