import { KakDela } from '@kakdela/types';
import mongoose, { Schema } from 'mongoose';

const userSchema = new Schema<KakDela.IUser>({
    id: {
      type: mongoose.SchemaTypes.String,
      required: true,
      unique: true
    },
    
    username: {
      type: mongoose.SchemaTypes.String,
      required: true,
      unique: true
    },
    
    created_at: {
      type: mongoose.SchemaTypes.String,
      required: true
    },

    global_name: {
      type: mongoose.SchemaTypes.String,
      required: false
    },
    
    avatar_url: {
      type: mongoose.SchemaTypes.String,
      required: false
    },
});

const Model = mongoose.model('user', userSchema);

export { Model as User, userSchema };

export default Model;