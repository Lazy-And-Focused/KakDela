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
} from '~/components/ui/sidebar';
import { Avatar, AvatarFallback, AvatarImage } from '~/components/ui/avatar';
import { Link } from '@remix-run/react';

const chats = [
  {
    id: 0,
    type: 'single',
    user: {
      username: 'lanvalird',
      firstName: 'Valentin',
      lastName: 'Bird',
    },
  },
  {
    id: 1,
    type: 'single',
    user: {
      username: 'fockusty',
      firstName: 'FOCKUSTY',
      lastName: '',
    },
  },

  {
    id: 2,
    type: 'group',
    name: 'Рабочий чат',
    users: [
      {
        username: 'lanvalird',
        firstName: 'Valentin',
        lastName: 'Bird',
      },
      {
        username: 'fockusty',
        firstName: 'FOCKUSTY',
        lastName: '',
      },
    ],
  },
];

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
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
                            <AvatarImage
                              src={`https://github.com/${chat.user.username}.png`}
                            />
                            <AvatarFallback>
                              {chat.user.firstName[0] || '!'}
                              {chat.user.lastName[0] || '!'}
                            </AvatarFallback>
                          </Avatar>
                          <div className='col-span-4 flex flex-col'>
                            <span className='text-primary/70 font-medium'>
                              {chat.user.firstName} {chat.user.lastName}
                            </span>
                            <span className='text-primary/70 italic'>
                              Пиши через @{chat.user.username}
                            </span>
                          </div>
                        </>
                      ) : (
                        <>
                          <div className='flex flex-col -space-y-2 *:data-[slot=avatar]:h-6 *:data-[slot=avatar]:w-6'>
                            {chat.users.map((user) => (
                              <Avatar>
                                <AvatarImage
                                  src={`https://github.com/${user.username}.png`}
                                />
                                <AvatarFallback>
                                  {user.firstName[0] || '!'}
                                  {user.lastName[0] || '!'}
                                </AvatarFallback>
                              </Avatar>
                            ))}
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

      <SidebarFooter />
    </Sidebar>
  );
}
