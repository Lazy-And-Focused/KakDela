import type { MetaFunction } from '@remix-run/node';

import { Outlet } from '@remix-run/react';

import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from '~/components/ui/sidebar';
import { AppSidebar } from '~/components/app-sidebar';

export const meta: MetaFunction = () => {
  return [{ title: 'KakDela | Chat' }];
};

export default function IndexPage() {
  return (
    <SidebarProvider>
      <AppSidebar variant='' />
      <SidebarInset>
        <header className='bg-background sticky top-0 flex h-16 shrink-0 items-center gap-2 border-b px-4'>
          <SidebarTrigger />
        </header>
        <Outlet />
      </SidebarInset>
    </SidebarProvider>
  );
}
