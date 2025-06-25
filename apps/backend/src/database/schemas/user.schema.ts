import mongoose, { Schema, SchemaTypes } from "mongoose";
import { SchemaParameters } from "types/mongodb.types";

import type { KakDela } from "@kakdela/types";

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

  // rights?
  // users?
};
const keys = Object.keys(data);
const schema = new Schema<KakDela.IUser>(data);

const database = mongoose.model("user", schema);

export { schema as UserSchema, data as UserData, keys as UserKeys };

export default database;
