import mongoose from 'mongoose';

const relationshipSchema = new mongoose.Schema({
  charA: { type: mongoose.Schema.Types.ObjectId, ref: 'characters', required: true },
  charB: { type: mongoose.Schema.Types.ObjectId, ref: 'characters', required: true },
  similarity: { type: Number, required: true },          // raw cosine score
  type: {
    type: String,
    enum: ['Close / Allies', 'Neutral / Acquaintances', 'Rivals / Distant'],
    required: true
  }
}, {
  timestamps: true
});

const relationships = mongoose.model('relationships', relationshipSchema)

export default relationships


