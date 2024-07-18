import database from 'database/schemas/messages.schema';

export const deleteMessageService = async (channelId: string, messageId: string): Promise<true|false> => {
    try {
        await database.deleteOne({channelId: channelId, id: messageId});

        return true;
    } catch (err) {
        console.error(err);

        return false;
    };
};