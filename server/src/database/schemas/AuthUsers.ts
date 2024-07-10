import mongoose, { Schema } from "mongoose";
import { AuthUser } from "types/user";

const UserSchema = new Schema<AuthUser>({
    discordId: {
        type: mongoose.SchemaTypes.String,
        require: true,
        unique: true,
    },
    accessToken: {type: mongoose.SchemaTypes.String, require: true},
    refreshToken: {type: mongoose.SchemaTypes.String, require: true},
});

const database = mongoose.model('AuthUsers', UserSchema);

export default database;