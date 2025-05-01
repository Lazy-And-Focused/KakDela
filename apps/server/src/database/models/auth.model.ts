import mongoose, { Schema } from "mongoose";
import { KakDela } from "@kakdela/types"

const authSchema = new Schema<KakDela.IAuth>({
  id: {
    type: mongoose.SchemaTypes.String,
    require: true,
    unique: true
  },

  service_id: {
    type: mongoose.SchemaTypes.String,
    require: true,
    unique: true
  },

  profile_id: {
    type: mongoose.SchemaTypes.String,
    require: true,
  },

  created_at: {
    type: mongoose.SchemaTypes.String,
    required: true
  },
  
  access_token: {
    type: mongoose.SchemaTypes.String,
    require: true
  },
  
  refresh_token: {
    type: mongoose.SchemaTypes.String,
    require: true
  },
});

const Model = mongoose.model('auth', authSchema);

export { Model as Auth, authSchema}

export default Model;