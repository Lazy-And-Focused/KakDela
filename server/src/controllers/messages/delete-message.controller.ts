import { Request, Response } from "express";
import { deleteMessageService } from "services/messages/delete-message.service";

export const deleteMessageController = async(req: Request, res: Response) => {
    try {
        const { channelId, messageId } = req.params;
        const data = deleteMessageService(channelId, messageId);

        !data
            ? res.send(400).send({msg: 'Error'})
            : res.send(data);
    } catch (err) {
        console.error(err);
        res.status(400).send({msg: 'Error'});
    };
};