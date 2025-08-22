import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarHeader,
  SidebarGroupLabel,
  SidebarGroupContent,
  SidebarRail,
} from '~/components/ui/sidebar';
import { Avatar, AvatarFallback, AvatarImage } from '~/components/ui/avatar';
import { data, Link } from '@remix-run/react';
import { self } from '~/mockup/self-user';
import { NavUser } from './nav-user';
import { Users } from 'lucide-react';

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const chats = [...self.chats.values()];

  return (
    <Sidebar {...props}>
      <SidebarHeader>KakDela</SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>New</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link to='' className='py-6'>
                    <Avatar className='ring-secondary rounded-md ring-2'>
                      <AvatarImage src='https://github.com/lanvalird.png' />
                      <AvatarFallback className='rounded-md'>VB</AvatarFallback>
                    </Avatar>
                    <div className='flex flex-col'>
                      <span className='text-primary/70 font-medium'>
                        Valentin Bird
                      </span>
                      <span className='text-primary/70 italic'>Чего!?</span>
                    </div>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel>All</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {chats.map((chat) => (
                <SidebarMenuItem key={`${chat.id}`}>
                  <SidebarMenuButton asChild>
                    <Link
                      to={`/chat/${chat.id}`}
                      className='grid h-min grid-cols-5'
                    >
                      {chat.type === 'single' ? (
                        <>
                          <Avatar className='col-span-1'>
                            <AvatarImage src={chat.user.avatar} />
                            <AvatarFallback>
                              {chat.user.bio?.first?.at(0) || '!'}
                              {chat.user.bio?.last?.at(0) || '!'}
                            </AvatarFallback>
                          </Avatar>
                          <div className='col-span-4 flex flex-col'>
                            <span className='text-primary/70 font-medium'>
                              {chat.user.bio?.first} {chat.user.bio?.last}
                            </span>
                            <span className='text-primary/70 italic'>
                              Пиши через @{chat.user.tag}
                            </span>
                          </div>
                        </>
                      ) : (
                        <>
                          <div className='col-span-1'>
                            <Avatar className='col-span-1'>
                              <AvatarFallback>
                                <Users className='size-4' />
                              </AvatarFallback>
                            </Avatar>
                          </div>
                          <div className='col-span-4 flex flex-col'>
                            <span className='text-primary/70 font-medium'>
                              {chat.name}
                            </span>
                            <span className='text-primary/70 italic'>
                              Да, это отличная идея!
                            </span>
                          </div>
                        </>
                      )}
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter>
        <NavUser user={self} />
      </SidebarFooter>
      <SidebarRail />
      <SidebarFooter />
    </Sidebar>
  );
}
