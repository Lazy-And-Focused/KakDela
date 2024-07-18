import { CreateMessageType, Message } from 'types/message.type'
import { createMessageDB } from 'database/logic/messages.logic';
import { Status } from 'types/database.type';

export const createMessageService = async (data: CreateMessageType): Promise<Message|false> => {
    const status: Status = await createMessageDB(data);
    const msg: Message = status.tag;

    return status.type === 'successed' 
        ? msg
        : false;
};