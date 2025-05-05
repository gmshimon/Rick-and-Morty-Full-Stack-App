import mongoose from 'mongoose'

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
    backstoryGeneratedAt: { type: String },
    embedding: {
      type: [Number], // 1536-dimensional
      default: []
    },
    // Personality analysis fields:
    personality: {
      openness: { type: Number, min: 0, max: 1 },
      conscientiousness: { type: Number, min: 0, max: 1 },
      extraversion: { type: Number, min: 0, max: 1 },
      agreeableness: { type: Number, min: 0, max: 1 },
      neuroticism: { type: Number, min: 0, max: 1 }
    },
    personalitySummary: { type: String },
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
