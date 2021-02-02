import mongoose from 'mongoose'
const Schema = mongoose.Schema
const ObjectId = mongoose.Schema.Types.ObjectId
const Note = new Schema(
  {
    content: { type: String, required: true },
    bug: { type: ObjectId, ref: 'Bug', required: true },
    flagged: { type: String, enum: ['pending', 'completed', 'rejected'] },
    creatorEmail: { type: String, required: true },
    creatorId: { type: String }

  }
  , { timestamps: true, toJSON: { virtuals: true } }
)
export default Note
