import mongoose from "mongoose";

import authUser from './schemas/auth-user.schema';
import channels from './schemas/channels.schema';
import messages from './schemas/messages.schema';
import users from './schemas/users.schema';

export default async(): Promise<void> => {
    mongoose
        .connect('mongodb://127.0.0.1/ChatWithDiscordAuth')
        .catch((err) => console.error(err))
        .then(async () =>
        {
            console.log('Подключен к базе данных');
        });
};