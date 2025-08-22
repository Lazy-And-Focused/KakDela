import { cn } from '~/lib/utils';
import { Button } from '~/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '~/components/ui/card';
import { Form } from '@remix-run/react';

export function LoginForm({
  className,
  formAction,
  ...props
}: React.ComponentPropsWithoutRef<'div'> & {
  formAction: string;
}) {
  return (
    <div className={cn('flex flex-col gap-6', className)} {...props}>
      <Card>
        <CardHeader className='text-center'>
          <CardTitle className='text-2xl lowercase'>Добро пожаловать</CardTitle>
          <CardDescription>
            Осталось совсем немного времени до чаттинг — войди в аккаунт
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form action={formAction}>
            <Button type='submit' className='w-full'>
              Войти через Discord
            </Button>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
