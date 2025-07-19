import type { MetaFunction } from "@remix-run/node";
<<<<<<< HEAD
import {  Link, useLoaderData } from "@remix-run/react";
import { CiLogin } from "react-icons/ci";
=======
import { LoginForm } from "~/components/login-form"

export async function loader() {
  return {
    ENV: {
      API_URL: process.env.API_URL,
    },
  };
}
>>>>>>> frontend--add-shadcn-ui

export const meta: MetaFunction = () => {
  return [
    { title: "KakDela 👀" },
    {
      name: "description",
      content: "Пет-проект для обучения работе в команде…",
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


  return (
<<<<<<< HEAD
    <div className="h-full w-full flex justify-center items-center">
      <div className="p-8 flex flex-col items-center justify-center rounded-xl bg-slate-200 dark:bg-slate-800 text-center">
        <h1 className="mb-4 text-4xl text-black dark:text-white">
          Добро пожаловать в Шляполяндию
        </h1>
        <hr className="mb-8 w-full border border-black/50 dark:border-white/50" />
        <Link
          className="py-2 px-4 w-full max-w-60 rounded gap-2 flex flex-row justify-between items-center bg-slate-300 dark:bg-slate-700 text-center text-black dark:text-white"
          to={data.ENV.API_URL + "/auth/discord"}
        >
          <p>Авторизоваться</p>
          <CiLogin size={24} />
        </Link>
=======
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm">
        <LoginForm />
>>>>>>> frontend--add-shadcn-ui
      </div>
    </div>
  );
}
