import mongoose from 'mongoose';
import { User } from './Users';

export interface Attachment {
    id: string;
    buffer: Buffer|string;
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