import type { MetaFunction } from "@remix-run/node";

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
      <div className="p-8 rounded-xl bg-slate-200 dark:bg-slate-800 text-center">
        <h1 className="mb-4 text-4xl text-black dark:text-white">
          Добро пожаловать в Шляполяндию
        </h1>
        <hr className="mb-8 border border-black/50 dark:border-white/50" />
        <button className="p-2 w-full rounded bg-slate-300 dark:bg-slate-700 text-center text-black dark:text-white">
          Авторизоваться
        </button>
      </div>
    </div>
  );
}
