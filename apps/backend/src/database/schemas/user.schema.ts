import mongoose, { Schema, SchemaTypes } from "mongoose";
import { SchemaParameters } from "types/mongodb.types";

import { KakDela } from "@kakdela/types";

const data: SchemaParameters<KakDela.IUser> = {
  id: {
    type: mongoose.SchemaTypes.String,
    required: true,
    unique: true
  },

  avatar_url: { type: SchemaTypes.String, required: true, unique: true },
  username: { type: SchemaTypes.String, required: true, unique: true },
  global_name: { type: SchemaTypes.String, required: false, unique: false },

  created_at: { type: SchemaTypes.String, required: true, unique: false },

  rights: { type: SchemaTypes.String, default: KakDela.Rights.CONSTANTS.raw.default.my.toString() },
  users: { type: SchemaTypes.Map, default: new Map<string, string>() }
};
const keys = Object.keys(data);
const schema = new Schema<KakDela.IUser>(data);

const database = mongoose.model("user", schema);

export { schema as UserSchema, data as UserData, keys as UserKeys };

export default database;
