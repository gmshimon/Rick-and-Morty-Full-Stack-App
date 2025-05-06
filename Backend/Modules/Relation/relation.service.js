import axios, { AxiosError } from 'axios'
import { GoogleGenAI } from '@google/genai'

export function cosineSimilarity (a = [], b = []) {
  let dot = 0,
    magA = 0,
    magB = 0
  for (let i = 0; i < a.length; i++) {
    dot += a[i] * b[i]
    magA += a[i] * a[i]
    magB += b[i] * b[i]
  }
  return dot / (Math.sqrt(magA) * Math.sqrt(magB))
}

export function classifyRelationship (similarity) {
  if (similarity >= 0.8) {
    return 'Close / Allies'
  } else if (similarity >= 0.5) {
    return 'Neutral / Acquaintances'
  } else {
    return 'Rivals / Distant'
  }
}

export async function embedWithHuggingFace (text) {
  // const token = process.env.HF_API_KEY;
  // if (!token) {
  //   throw new Error('HF_API_KEY is not set in your environment.');
  // }

  // const url = 'https://api-inference.huggingface.co/pipeline/feature-extraction/sentence-transformers/all-MiniLM-L6-v2';
  // const inputs = Array.isArray(text) ? text : [text];

  // const response = await axios.post(
  //   url,
  //   {
  //     inputs,
  //     options: { wait_for_model: true },  // let HF queue you instead of a 503
  //   },
  //   {
  //     headers: { Authorization: `Bearer ${token}` },
  //     timeout: 60_000,  // optional: give it up to a minute
  //   }
  // );

  // // Axios already parses JSON for you:
  // if (response.status !== 200) {
  //   throw new Error(`HF Error ${response.status}: ${JSON.stringify(response.data)}`);
  // }

  // const embeddings = response.data;
  // return Array.isArray(text) ? embeddings : embeddings[0];

  const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY
  })
  const response = await ai.models.embedContent({
    model: 'gemini-embedding-exp-03-07',
    contents: text
  })
  let vec = response.embeddings
  if (Array.isArray(vec) && typeof vec[0] === 'number') {
    return vec
  }
  if (Array.isArray(vec) && vec.length > 0 && Array.isArray(vec[0].values)) {
    return vec[0].values
  }
  if (typeof vec === 'string') {
    try {
      const parsed = JSON.parse(vec)
      if (Array.isArray(parsed) && typeof parsed[0] === 'number') {
        return parsed
      }
      // maybe it parsed into [{ values: [...] }]
      if (
        Array.isArray(parsed) &&
        parsed.length > 0 &&
        Array.isArray(parsed[0].values)
      ) {
        return parsed[0].values
      }
    } catch (e) {
      // fall back to extracting floats via regex
      const nums = vec.match(/-?\d+\.\d+(e[+-]?\d+)?/g) || []
      return nums.map(Number)
    }
  }
  throw new Error(
    'embedWithHuggingFace: unexpected embeddings format: ' + typeof vec
  )
}
