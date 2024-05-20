import { User } from './Users';

export type Attachment = {
    id: string;
    buffer: Buffer|string;
};

export type Message = {
    id: string;
    content: string;

    attachments: Attachment[];

    user: User;
};