import mongoose, { Schema } from 'mongoose';

import { UserSchema } from 'database/types/user-schema.type';
import type { User } from 'types/user.type';

const dbUsersSchema = new Schema<User>(UserSchema);

const database = mongoose.model('Users', dbUsersSchema);

export default database;