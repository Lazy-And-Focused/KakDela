import { cn } from "~/lib/utils"
import { Button } from "~/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card"
import {  useLoaderData } from "@remix-run/react";
import { loader } from "~/routes/_index"

export function LoginForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {
  const data = useLoaderData<typeof loader>();

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl text-center lowercase">Добро пожаловать</CardTitle>
          <CardDescription>
            Осталось совсем немного времени до чаттинг — войди в аккаунт
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form action={data.ENV.API_URL + "/auth/discord"}>
              <Button type="submit" className="w-full">
                Войти через Discord
              </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
