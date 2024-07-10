import mongoose from "mongoose";

export default async(): Promise<void> => {
    mongoose
        .connect('mongodb://127.0.0.1/ChatWithDiscordAuth')
        .catch((err) => console.error(err))
        .then(async () =>
        {
            console.log('Подключен к базе данных');
        });
};