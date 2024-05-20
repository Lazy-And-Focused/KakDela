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
    <div style={{ fontFamily: "system-ui, sans-serif" }}>
      <h1>Добро пожаловать в Шляполяндию</h1>
    </div>
  );
}
