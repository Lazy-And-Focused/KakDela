import type { MetaFunction } from "@remix-run/node";
import { LoginForm } from "~/components/login-form"

export async function loader() {
  return {
    ENV: {
      API_URL: process.env.API_URL,
    },
  };
}

export const meta: MetaFunction = () => {
  return [
    { title: "KakDela 👀" },
    {
      name: "description",
      content: "Пет-проект для обучения работе в команде…",
    },
  ];
};

export default function Index() {
  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm">
        <LoginForm />
      </div>
    </div>
  );
}
