import { cn } from "@/lib/utils/cn"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useNavigate } from "react-router"
import useServiceContext from "@/hooks/use-service-context"

export function LoginForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"form">) {
  const navigate = useNavigate()
  const {userService} = useServiceContext();
  const handleIIlogin = async () => {
    try {
      const loggedInUser = await userService.login();

      if (loggedInUser) {
        console.log("Logged in user:", loggedInUser);

        if (!loggedInUser.username || loggedInUser.username.trim() === "") {
          console.log("Redirecting to edit profile...");
          
          navigate("/edit-profile"); // No username → go to edit profile
        } else {
          console.log("Redirecting to temp...");
          navigate("/temp"); // Username exists → go to temp
        }
      } else {
        console.log("Failed to retrieve user information.");
      }
    } catch (err) {
      console.error('Auth error:', err);
      console.log('Something went wrong. Try again.');
    }
  };
  return (
    <form className={cn("flex flex-col gap-6", className)} {...props}>
      <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="text-2xl font-bold">Login to your account</h1>
        <p className="text-balance text-sm text-muted-foreground">
          Login using your WEB3 Identity
        </p>
      </div>
      <div className="grid gap-6">
        <div className="grid gap-2">
        </div>
        <Button type="button" className="w-full" onClick={handleIIlogin}>
          Login
        </Button>
        <div className="relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-border">
        </div>
      </div>
    </form>
  )
}
