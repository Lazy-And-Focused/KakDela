import mongoose, { Schema } from "mongoose";

import { MessageSchema } from "database/types/message-schema.type";
import { UserSchema } from "database/types/user-schema.type";

import type { Channel } from 'types/channel.type';

const dbChannelsSchema = new Schema<Channel>({
    id: { type: mongoose.SchemaTypes.String, required: false, unique: true },

    name: { type: mongoose.SchemaTypes.String, required: true },
    description: { type: mongoose.SchemaTypes.String, required: false },
    avatar_url: { type: mongoose.SchemaTypes.String, required: false },

    messages: [MessageSchema],
    users: [UserSchema]
});

const database = mongoose.model('Channels', dbChannelsSchema);

export default database;