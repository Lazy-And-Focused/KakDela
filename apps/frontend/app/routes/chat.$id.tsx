import { useLoaderData } from '@remix-run/react';

export const loader = async ({ params }) => {
  const chatId = params.id;
  return { chatId };
};

export default function ChatIdPage() {
  const { chatId } = useLoaderData<typeof loader>();

  return <p className='mx-auto my-0'>Selected {chatId}'s chat</p>;
}
