import type { MetaFunction } from '@remix-run/node';

import { SidebarProvider } from '~/components/ui/sidebar';
import { AppSidebar } from '~/components/app-sidebar';

export const meta: MetaFunction = () => {
  return [{ title: 'KakDela | Chat' }];
};

export default function Index() {
  return (
    <div className='mx-auto my-0 grid h-full w-full max-w-7xl grid-cols-12 items-center justify-center gap-8 p-8'>
      <SidebarProvider>
        <AppSidebar />
      </SidebarProvider>

      <div className='col-span-8 flex h-full flex-col justify-end gap-4 rounded-2xl p-2'>
        <p className='max-w-max rounded-full rounded-bl-sm bg-slate-200/50 p-2 dark:bg-slate-800/50'>
          Bla-bla-bla: hello and goodbay!
        </p>
      </div>
    </div>
  );
}
