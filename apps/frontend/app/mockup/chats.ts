import { type AnyChat, ChatTypes } from '~/types';
import { users } from './users';

export const chats: AnyChat[] = [
  {
    id: 0,
    type: ChatTypes.Single,
    user: users[0],
  },
  {
    id: 1,
    type: ChatTypes.Single,
    user: users[1],
  },

  {
    id: 2,
    type: ChatTypes.Group,
    name: 'Рабочий чат',
    users: users,
  },
];
