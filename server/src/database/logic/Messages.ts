import MessageDatabase from '../schemas/Messages'

import { Status } from "src/utils/types/Database";
import { Attachment } from "src/utils/types/Message"
import { User } from "src/utils/types/Users"

type CreateMessageType = {
    content: string;
    attachments: Attachment[];

    user: User;
}

export const createMessage = async(msg: CreateMessageType): Promise<Status> =>
{
    try {
        const createdMessage = await MessageDatabase.create(msg);

        if(!createdMessage)
            return {
                text: 'Произошла ошибка, не удалось создать сообщение',
                type: 'error'
            };

        return {
            text: 'Сообщение успешно создано',
            type: 'successed',
            tag: createdMessage
        };
    } catch (err) {
        console.error(err);
        return {
            text: 'Произошла ошибка на стороне сервера',
            type: 'error',
            error: err
        };
    };
};

export const getMessage = async(id: string): Promise<Status> =>
{
    try {
        const msg = await MessageDatabase.find({id: id});

        if(!msg)
            return {
                text: 'Неудалось найти сообщение',
                type: 'error'
            }

        return {
            text: 'Успешно удалось найти сообщение',
            type: 'successed',
            tag: msg
        };
    } catch (err) {
        console.error(err);
        return {
            text: 'Произошла ошибка на стороне сервера',
            type: 'error',
            error: err
        };
    };
};

export const getMessages = async(length: number, skip: number): Promise<Status> =>
{
    try {
        const list = await MessageDatabase.find({}, ['id'], { limit: length, skip: skip });

        if(!list)
            return {
                text: 'Неудалось найти сообщения',
                type: 'error'
            };

        return {
            text: "Сообщения были успешно найдены",
            type: 'successed',
            tag: list
        };
    } catch (err) {
        console.error(err);
        return {
            text: 'Произошла ошибка на стороне сервера',
            type: 'error',
            error: err
        };
    }
};