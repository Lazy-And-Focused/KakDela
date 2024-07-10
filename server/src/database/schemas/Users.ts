import mongoose, { Schema } from 'mongoose';
import { User } from 'types/user';

const dbUsersSchema = new Schema<User>({
    id: { type: mongoose.SchemaTypes.String, unique: true },
    username: { type: mongoose.SchemaTypes.String, required: true },
    global_name: { type: mongoose.SchemaTypes.String, required: false },
    avatar_url: { type: mongoose.SchemaTypes.String, required: false },
});

const database = mongoose.model('Users', dbUsersSchema);

export default database;