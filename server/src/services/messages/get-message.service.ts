import { getMessageDB } from "database/logic/messages.logic";
import { Message } from "types/message.type";

export const getMessageService = async(channelId: string, messageId: string): Promise<Message | false> => {
    const status = await getMessageDB(channelId, messageId);
    const msg: Message = status.tag;

    return status.type === 'successed' 
        ? msg
        : false;
};