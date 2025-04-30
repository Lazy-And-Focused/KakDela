import type { MetaFunction } from "@remix-run/node";
import { Link } from "@remix-run/react";
import { CiLogin } from "react-icons/ci";

export const meta: MetaFunction = () => {
  return [
    { title: "Чат + Discord Auth" },
    {
      name: "description",
      content: "Пет-проект для обучения работе в команде…",
    },
  ];
};

export default function Index() {
  return (
    <div className="h-full w-full flex justify-center items-center">
      <div className="p-8 flex flex-col items-center justify-center rounded-xl bg-slate-200 dark:bg-slate-800 text-center">
        <h1 className="mb-4 text-4xl text-black dark:text-white">
          Добро пожаловать в Шляполяндию
        </h1>
        <hr className="mb-8 w-full border border-black/50 dark:border-white/50" />
        <Link
          className="py-2 px-4 w-full max-w-60 rounded gap-2 flex flex-row justify-between items-center bg-slate-300 dark:bg-slate-700 text-center text-black dark:text-white"
          to={"http://localhost:3001/api/auth/discord"}
        >
          <p>Авторизоваться</p>
          <CiLogin size={24} />
        </Link>
      </div>
    </div>
  );
}
