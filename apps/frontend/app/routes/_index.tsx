import type { MetaFunction } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';
import { LoginForm } from '~/components/login-form';
import { useLoaderData } from '@remix-run/react';

export const meta: MetaFunction = () => {
  return [
    { title: 'KakDela 👀' },
    {
      name: 'description',
      content: 'Пет-проект для обучения работе в команде…',
    },
  ];
};

export async function loader() {
  return {
    ENV: {
      API_URL: process.env.API_URL,
    },
  };
}

export default function Index() {
  const data = useLoaderData<typeof loader>();
  const redirectUrl = `${data.ENV.API_URL}/auth/discord`;

  return (
    <div className='flex min-h-svh w-full items-center justify-center p-6 md:p-10'>
      <div className='w-full max-w-sm'>
        <LoginForm formAction={redirectUrl} />
      </div>
    </div>
  );
}
