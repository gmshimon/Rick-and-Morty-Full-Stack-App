import mongoose from 'mongoose'

const episodeSchema = mongoose.Schema(
  {
    code: { type: String, required: true, },
    title: { type: String, required: true },
    description: { type: String },
    season: { type: Number, required: true },
    episode: { type: Number, required: true },
    airDate: { type: Date },
    thumbnail: { type: String },
    tags: [String],
    characters: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'characters',          // matches the `model('characters', …)` name
          required: false
        }
      ]
  },
  {
    timestamps: true
  }
)

const episodes = mongoose.model('episodes',episodeSchema)

export default episodes