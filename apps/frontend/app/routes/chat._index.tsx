import type { MetaFunction } from "@remix-run/node";

export const meta: MetaFunction = () => {
  return [{ title: "KakDela | Chat" }];
};

export default function Index() {
  return (
    <div className='h-full p-8 w-full max-w-7xl mx-auto my-0 grid grid-cols-12 gap-8 justify-center items-center '>
      <div className='flex flex-col gap-4 p-2 rounded-2xl bg-slate-200 dark:bg-slate-800 col-span-4 h-full'>
        <div className='mb-4 px-4 py-2 rounded-xl w-full bg-black/25 dark:bg-white/25 '>
          <h1 className='text-black italic dark:text-white text-lg'>KakDela</h1>
        </div>

        <div className='px-4 py-2 rounded-xl w-full bg-black/5 dark:bg-white/5 justify-start items-center flex flex-row gap-4'>
          <div className='w-auto h-12 aspect-square bg-pink-50 rounded-full' />
          <p>
            <p className='text-black italic dark:text-white text-lg'>
              Author 1
            </p>
            <p className='text-black/90 italic dark:text-white/90 text-md'>
              Bla-bla-bla: hello and goodbay!
            </p>
          </p>
        </div>

        {/* Template */}
        <div className='px-4 py-2 rounded-xl w-full bg-black/5 dark:bg-white/5 justify-start items-center flex flex-row gap-4'>
          <div className='w-auto h-12 aspect-square bg-pink-50 rounded-full' />
          <p>
            <p className='text-black italic dark:text-white text-lg'>
              Author 2
            </p>
            <p className='text-black/90 italic dark:text-white/90 text-md'>
              Bla-bla-bla: hello and goodbay!
            </p>
          </p>
        </div>
        <div className='px-4 py-2 rounded-xl w-full bg-black/5 dark:bg-white/5 justify-start items-center flex flex-row gap-4'>
          <div className='w-auto h-12 aspect-square bg-pink-50 rounded-full' />
          <p>
            <p className='text-black italic dark:text-white text-lg'>
              Author 3
            </p>
            <p className='text-black/90 italic dark:text-white/90 text-md'>
              Bla-bla-bla: hello and goodbay!
            </p>
          </p>
        </div>
      </div>

      <div className='flex flex-col justify-end gap-4 p-2 rounded-2xl  col-span-8  h-full'>
        <p className='bg-slate-200/50 dark:bg-slate-800/50 p-2 rounded-full rounded-bl-sm max-w-max'>
          Bla-bla-bla: hello and goodbay!
        </p>
      </div>
    </div>
  );
}
