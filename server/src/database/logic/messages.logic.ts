import MessageDatabase from '../schemas/messages.schema';

import { Status } from "types/database.type";
import { CreateMessageType } from "types/message.type";

export const createMessageDB = async(msg: CreateMessageType): Promise<Status> => {
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

export const getMessageDB = async(channelId: string, messageId: string): Promise<Status> => {
    try {
        const msg = await MessageDatabase.find({channelId: channelId, messageId: messageId});

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

export const getMessagesDB = async(length: number, skip: number): Promise<Status> => {
    try {
        const list = await MessageDatabase.find({}, ['content'], { limit: length, skip: skip });

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
    };
};