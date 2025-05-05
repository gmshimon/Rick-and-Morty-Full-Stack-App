import { fetchGPT } from '../../Utilis/gpt.js'

export async function generateBackstory ({
  name,
  species,
  origin,
  status,
  gender
}) {
  const messages = [
    {
      role: 'system',
      content:
        'You are a creative sci-fi storyteller. Write vivid, dramatic character origins.'
    },
    {
      role: 'user',
      content: `
Generate a 2–3 sentence origin story for a character with these details:
• Name: ${name}
• Species: ${species}
• Origin world: ${origin || 'Unknown'}
• Status: ${status}
• Gender: ${gender}

Make it cinematic, world-building, and unique.
      `.trim()
    }
  ]

  // Stream the completion and accumulate text
  const stream = await fetchGPT(messages)

  let backstory = ''
  for await (const chunk of stream) {
    backstory += chunk.choices[0].delta?.content || ''
  }

  return backstory.trim()
}

export async function analyzePersonality (backstory) {
  const TRAITS = [
    'openness',
    'conscientiousness',
    'extraversion',
    'agreeableness',
    'neuroticism'
  ]

  const systemPrompt = `You are a personality analysis engine. Given the following character backstory, score each of the Big Five traits on a scale of 0 to 1 (0 = very low, 1 = very high), then provide a concise summary,given scores on a 0–1 scale, pick the highest-scoring trait and map it to its “positive” descriptor, and the lowest-scoring trait to its “negative” descriptor. Then output exactly in this format:
  <Name>: High <TopTraitName>, Low <BottomTraitName> → <TopDescriptor> but <BottomDescriptor>
  Respond in JSON like { "openness": 0.75, ..., "summary": "..." }.`

  const userPrompt = `Backstory:\n"""
${backstory}
"""`

  // start streaming
  const stream = await fetchGPT([
    { role: 'system', content: systemPrompt },
    { role: 'user', content: userPrompt }
  ])

  let raw = ''
  for await (const part of stream) {
    const delta = part.choices[0].delta?.content
    if (delta) raw += delta
  }

  raw = raw
    .replace(/```json/g, '')
    .replace(/```/g, '')
    .trim()
  // now parse, and if it fails it will throw
  let data
  try {
    data = JSON.parse(raw)
  } catch (err) {
    throw new Error(
      'Failed to parse personality analysis response: ' + err.message
    )
  }

  // validate + clamp
  const scores = {}
  for (const trait of TRAITS) {
    const v = Number(data[trait])
    if (isNaN(v)) {
      throw new Error(`Missing or invalid trait "${trait}" in analysis result.`)
    }
    scores[trait] = Math.max(0, Math.min(1, v))
  }

  // ensure summary exists
  if (typeof data.summary !== 'string') {
    throw new Error('Missing summary in analysis result.')
  }

  return {
    scores,
    summary: data.summary.trim()
  }
}
