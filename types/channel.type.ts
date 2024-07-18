import type { User } from './user.type';
import type { Message } from './message.type';

export interface Channel {
    id: string,
    
    owner_id: string,

    name: string,
    description: string,
    avatar_url: string,

    users: User[],
    messages: Message[]
};