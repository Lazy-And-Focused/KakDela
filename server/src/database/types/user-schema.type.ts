import mongoose from "mongoose";

export const UserSchema = {
    id: { type: mongoose.SchemaTypes.String, unique: true },
    username: { type: mongoose.SchemaTypes.String, required: true },
    global_name: { type: mongoose.SchemaTypes.String, required: false },
    avatar_url: { type: mongoose.SchemaTypes.String, required: false },
};