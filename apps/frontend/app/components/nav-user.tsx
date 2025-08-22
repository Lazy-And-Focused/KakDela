'use client';

import type { User } from '~/types';

import { Settings } from 'lucide-react';

import { Avatar, AvatarFallback, AvatarImage } from '~/components/ui/avatar';
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '~/components/ui/sidebar';
import { useState } from 'react';

export function NavUser({ user }: { user: User }) {
  const [fullname, setFullname] = useState<string>(
    `${user.bio?.first || ''} ${user.bio?.last || ''}`,
  );

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <SidebarMenuButton
          size='lg'
          className='data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground'
        >
          <Avatar className='h-8 w-8 rounded-lg'>
            <AvatarImage src={user.avatar} alt={user.tag} />
            <AvatarFallback className='rounded-lg'>
              {user.bio?.first?.at(0) || '!'}
              {user.bio?.last?.at(0) || '!'}
            </AvatarFallback>
          </Avatar>
          <div className='grid flex-1 text-left text-sm leading-tight'>
            <span className='truncate font-medium'>
              {fullname !== ' ' ? fullname : user.tag}
            </span>
            <span className='truncate text-xs'>@{user.tag}</span>
          </div>
          <Settings className='ml-auto size-4' />
        </SidebarMenuButton>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
