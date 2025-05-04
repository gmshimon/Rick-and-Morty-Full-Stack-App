import { fetchGPT } from "../../Utilis/gpt.js"


/**
 * Generate a 2–3 sentence backstory for a character,
 * using only the fields you already have on your schema.
 */
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
