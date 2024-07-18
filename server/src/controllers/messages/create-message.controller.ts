import { Request, Response } from "express";
import { createMessageService } from "services/messages/create-message.service";

export const createMessageController = async(req: Request, res: Response) => {
    try {
        const data = await createMessageService(req.body);

        !data
            ? res.send(400).send({msg: 'Error'})
            : res.send(data);
    } catch (err) {
        console.error(err);
        res.status(400).send({msg: 'Error'});
    };
};