import messageModel from "./message.model.js"

export const loadHistory = async (characterId) => {
    const docs = await messageModel.find({ characterId })
      .sort({ createdAt: 1 })
      .limit(50)
      .lean()
    return docs.map(d => ({ role: d.role, content: d.content }))
  }

  export const saveMessage = async (characterId, role, content) => {
    return messageModel.create({ characterId, role, content })
  }