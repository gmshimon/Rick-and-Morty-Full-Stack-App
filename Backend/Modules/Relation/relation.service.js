import axios, { AxiosError } from 'axios'

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

export async function embedWithHuggingFace(text) {
  const token = process.env.HF_API_KEY;
  if (!token) {
    throw new Error('HF_API_KEY is not set in your environment.');
  }

  const url = 'https://api-inference.huggingface.co/pipeline/feature-extraction/sentence-transformers/all-MiniLM-L6-v2';
  const inputs = Array.isArray(text) ? text : [text];

  const response = await axios.post(
    url,
    {
      inputs,
      options: { wait_for_model: true },  // let HF queue you instead of a 503
    },
    {
      headers: { Authorization: `Bearer ${token}` },
      timeout: 60_000,  // optional: give it up to a minute
    }
  );

  // Axios already parses JSON for you:
  if (response.status !== 200) {
    throw new Error(`HF Error ${response.status}: ${JSON.stringify(response.data)}`);
  }

  const embeddings = response.data;
  return Array.isArray(text) ? embeddings : embeddings[0];
}
