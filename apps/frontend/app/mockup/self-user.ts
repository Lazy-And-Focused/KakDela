import { SelfUser } from '~/types';
import { users } from './users';
import { chats } from './chats';

export const self: SelfUser = { ...users[0], chats };
