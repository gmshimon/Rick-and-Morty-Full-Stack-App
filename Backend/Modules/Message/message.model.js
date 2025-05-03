// src/models/Message.js
import mongoose from 'mongoose'

const MessageSchema = new mongoose.Schema(
  {
    characterId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'characters',
      required: true,
      index: true
    },
    role: { type: String, enum: ['user', 'assistant'], required: true },
    content: { type: String, required: true }
  },
  { timestamps: true }
)

const messageModel = mongoose.model('message', MessageSchema)

export default messageModel
