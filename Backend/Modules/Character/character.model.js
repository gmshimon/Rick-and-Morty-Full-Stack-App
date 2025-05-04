import mongoose from 'mongoose'
import validate from 'validator'

const characterSchema = mongoose.Schema(
  {
    name: { type: String, required: true, index: true },
    species: { type: String, required: true },
    status: {
      type: String,
      enum: ['Alive', 'Dead', 'unknown'],
      default: 'unknown'
    },
    gender: {
      type: String,
      enum: ['Male', 'Female', 'Genderless', 'unknown'],
      default: 'unknown'
    },
    origin: { type: String },
    image: { type: String }, // URL to portrait image
    backstory: { type: String }, // AI-generated narrative
    backstoryGeneratedAt:{type:String},
    embedding: { 
      type: [Number],    // 1536-dimensional
      default: [] 
    },
    // Custom vs. API-sourced
    isCustom: { type: Boolean, default: false },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'users' }
  },
  {
    timestamps: true
  }
)

const character = mongoose.model('characters', characterSchema)

export default character
