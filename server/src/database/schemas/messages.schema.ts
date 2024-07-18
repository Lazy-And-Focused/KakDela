import mongoose, { Schema } from 'mongoose';

import { MessageSchema } from 'database/types/message-schema.type';
import type { Message } from 'types/message.type';

const dbMessagesSchema = new Schema<Message>(MessageSchema);

const database = mongoose.model('Messages', dbMessagesSchema);

export default database;