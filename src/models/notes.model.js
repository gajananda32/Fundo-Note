import { Schema, model } from 'mongoose';

const notesSchema = new Schema(
  {
    Title: {
      type: String
    },
    descrption:{
      type:String
    },
   colour:{
      type:String,
    },
    userId:{
      type:String,
    },
    isArchived:{
      type:Boolean,
      default:false
    },
    isTrashed:{
        type:Boolean,
        default:false
    },
  },
  {
    timestamps: true
  }
);

export default model('notes', notesSchema);