import mongoose, { Schema } from "mongoose";
import { AuthUser } from "src/utils/types/Users";

const UserSchema = new Schema<AuthUser>({
    discordId: {
        type: mongoose.SchemaTypes.String,
        require: true,
        unique: true,
    },
    accessToken: {type: mongoose.SchemaTypes.String, require: true},
    refreshToken: {type: mongoose.SchemaTypes.String, require: true},
});

const database = mongoose.model('users', UserSchema);

export default database;