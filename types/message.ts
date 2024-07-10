import { User } from './user';

export interface Attachment {
    id: string;
    buffer: ArrayBuffer|string; // ArrayBuffer тоже самое, что и Buffer ?
};

export interface Message {
    id: string;
    content: string;

    attachments?: Attachment[];

    user: User;
};

export interface CreateMessageType {
    id?: string;
    content: string;
    attachments?: Attachment[];

    user: User;
}