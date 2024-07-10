import { Request, Response } from "express";
import { createMessageDB } from 'database/logic/Messages';
import { CreateMessageType, Message } from 'types/message'
import { Status } from "types/database";

export const createMessage = async(req: Request, res: Response) => {
    try {
        const data: CreateMessageType = req.body;

        const status: Status = await createMessageDB(data);
        const msg: Message = status.tag;

        status.type === 'error'
            ? res.send(400).send({msg: 'Error'})
            : res.send(msg);
    } catch (err) {
        console.error(err);
        res.status(400).send({msg: 'Error'});
    };
};