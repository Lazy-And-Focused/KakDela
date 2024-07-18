import type { Channel } from './channel.type';
import type { User } from './user.type';

export interface Attachment {
    id: string;
    buffer: Buffer|string; // ArrayBuffer тоже самое, что и Buffer ?
};

export interface Message {
    channelId: string;
    id: string;
    content: string;

    attachments?: Attachment[];

    user: User;
    channel: Channel;
};

export interface CreateMessageType {
    id?: string;
    content: string;
    attachments?: Attachment[];

    user: User;
}