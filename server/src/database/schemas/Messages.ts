import mongoose, { Schema } from 'mongoose';
import { Message } from '../../utils/types/Message';

const dbMessagesSchema = new Schema<Message>({
    id: { type: mongoose.SchemaTypes.String, required: true },
    user: {
        id: { type: mongoose.SchemaTypes.String, required: true },
        username: { type: mongoose.SchemaTypes.String, required: true },
        global_name: { type: mongoose.SchemaTypes.String, required: false },
        avatar_url: { type: mongoose.SchemaTypes.String, required: false },
    },
    attachments: [{
            id: { type: mongoose.SchemaTypes.String, required: true },
            buffer: { type: mongoose.SchemaTypes.Buffer, required: true }
        }
    ]
});

const database = mongoose.model('Messages', dbMessagesSchema);

export default database;