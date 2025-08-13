import type { MetaFunction } from '@remix-run/node';

export const meta: MetaFunction = () => {
  return [{ title: 'KakDela | Chat' }];
};

export default function Index() {
  return (
    <div className='mx-auto my-0 grid h-full w-full max-w-7xl grid-cols-12 items-center justify-center gap-8 p-8'>
      <div className='col-span-4 flex h-full flex-col gap-4 rounded-2xl bg-slate-200 p-2 dark:bg-slate-800'>
        <div className='mb-4 w-full rounded-xl bg-black/25 px-4 py-2 dark:bg-white/25'>
          <h1 className='text-lg italic text-black dark:text-white'>KakDela</h1>
        </div>

        <div className='flex w-full flex-row items-center justify-start gap-4 rounded-xl bg-black/5 px-4 py-2 dark:bg-white/5'>
          <div className='aspect-square h-12 w-auto rounded-full bg-pink-50' />
          <p>
            <p className='text-lg italic text-black dark:text-white'>
              Author 1
            </p>
            <p className='text-md italic text-black/90 dark:text-white/90'>
              Bla-bla-bla: hello and goodbay!
            </p>
          </p>
        </div>

        {/* Template */}
        <div className='flex w-full flex-row items-center justify-start gap-4 rounded-xl bg-black/5 px-4 py-2 dark:bg-white/5'>
          <div className='aspect-square h-12 w-auto rounded-full bg-pink-50' />
          <p>
            <p className='text-lg italic text-black dark:text-white'>
              Author 2
            </p>
            <p className='text-md italic text-black/90 dark:text-white/90'>
              Bla-bla-bla: hello and goodbay!
            </p>
          </p>
        </div>
        <div className='flex w-full flex-row items-center justify-start gap-4 rounded-xl bg-black/5 px-4 py-2 dark:bg-white/5'>
          <div className='aspect-square h-12 w-auto rounded-full bg-pink-50' />
          <p>
            <p className='text-lg italic text-black dark:text-white'>
              Author 3
            </p>
            <p className='text-md italic text-black/90 dark:text-white/90'>
              Bla-bla-bla: hello and goodbay!
            </p>
          </p>
        </div>
      </div>

      <div className='col-span-8 flex h-full flex-col justify-end gap-4 rounded-2xl p-2'>
        <p className='max-w-max rounded-full rounded-bl-sm bg-slate-200/50 p-2 dark:bg-slate-800/50'>
          Bla-bla-bla: hello and goodbay!
        </p>
      </div>
    </div>
  );
}
