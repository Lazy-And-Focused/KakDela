import mongoose, { Schema } from 'mongoose';
import { KakDela } from '@kakdela/types';

const messageSchema = new Schema<KakDela.IMessage>({
  id: {
    type: mongoose.SchemaTypes.String,
    require: true,
    unique: true
  },

  author_id: {
    type: mongoose.SchemaTypes.String,
    require: true
  },

  content: {
    type: mongoose.SchemaTypes.String,
    require: true
  },

  attachments: [{
    type: mongoose.SchemaTypes.String
  }]
});

const Model = mongoose.model('messages', messageSchema);

export { Model as Message, messageSchema };

export default Model;