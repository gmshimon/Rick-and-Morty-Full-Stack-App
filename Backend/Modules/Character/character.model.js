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
    image: { type: String },
    backstory: { type: String },
    backstoryGeneratedAt: { type: String },
    embedding: {
      type: [Number],
      default: []
    },
    // Personality analysis fields with defaults
    personality: {
      openness: {
        type: Number,
        min: 0,
        max: 1,
        default: 0
      },
      conscientiousness: {
        type: Number,
        min: 0,
        max: 1,
        default: 0
      },
      extraversion: {
        type: Number,
        min: 0,
        max: 1,
        default: 0
      },
      agreeableness: {
        type: Number,
        min: 0,
        max: 1,
        default: 0
      },
      neuroticism: {
        type: Number,
        min: 0,
        max: 1,
        default: 0
      }
    },
    personalitySummary: { type: String },
    episodes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'episodes'
      }
    ],
    isCustom: { type: Boolean, default: false },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'users' }
  },
  {
    timestamps: true
  }
)

export default mongoose.model('characters', characterSchema)
