import { Request, Response } from "express";
import { getMessageService } from "services/messages/get-message.service";

export const getMessageController = async(req: Request, res: Response) => {
    try {
        const { channelId, messageId } = req.params;
        const data = await getMessageService(channelId, messageId);

        !data
            ? res.send(400).send({msg: 'Error'})
            : res.send(data);
    } catch (err) {
        console.error(err);
        res.status(400).send({msg: 'Error'});
    };
};