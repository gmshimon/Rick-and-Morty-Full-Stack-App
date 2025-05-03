import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axiosSecure from '../../Utils/axiosSecure'

const initialState = {
  messages: [], // { id, role: 'user'|'assistant', content, timestamp }
  isFetchLoading: false,
  isFetchSuccess: false,
  isFetchError: false,
  isSendMessageLoading: false,
  isSendMessageSuccess: false,
  isSendMessageError: false
}

export const fetchMessages = createAsyncThunk(
    'fetchMessages',
    async (characterId) => {
      const res = await axiosSecure.get(`/message/${characterId}`)
      // API returns an array of { characterId, role, content, createdAt, ... }
      // we map to { id, role, content, timestamp }
      return res.data.data.map((m, idx) => ({
        id: idx,
        role: m.role,
        content: m.content,
        timestamp: m.createdAt,
      }))
    }
  )

export const sendMessage = createAsyncThunk(
  'sendMessage',
  async ({ characterId, text }) => {
    // 1) Call your backend (non‐streaming) endpoint
    const response = await axiosSecure.post('/message', {
      characterId,
      userMessage: text,
      stream: false // ensure your backend returns a single JSON payload
    })

    // 2) Extract the assistant reply
    const assistantText = response.data.choices?.[0]?.message?.content || ''

    // 3) Build user + assistant message objects
    const timestamp = new Date().toISOString()
    const userMessage = {
      id: Date.now(),
      role: 'user',
      content: text,
      timestamp
    }
    const assistantMessage = {
      id: Date.now() + 1,
      role: 'assistant',
      content: assistantText,
      timestamp
    }

    // Return both so the reducer can push them in one go
    return { userMessage, assistantMessage }
  }
)
const messagesSlice = createSlice({
    name: 'messages',
    initialState,
    reducers: {
      reset: (state) => {
        state.messages = []
        state.isFetchLoading = false
        state.isFetchSuccess = false
        state.isFetchError = false
        state.isSendMessageLoading = false
        state.isSendMessageSuccess = false
        state.isSendMessageError = false
        state.isSendMessageLoading = false
        state.isSendMessageSuccess = false
        state.isSendMessageError = false
      },
      addMessage: (state, action) => {
        state.messages.push(action.payload)
      }
    },
    extraReducers: (builder) => {
      builder
      .addCase(fetchMessages.pending, (state) => {
        state.isFetchLoading = true
        state.isFetchSuccess = false
        state.isFetchError = false
      })
      .addCase(fetchMessages.fulfilled, (state, action) => {
        state.messages = action.payload
        state.isFetchLoading = false
        state.isFetchSuccess = true
      })
      .addCase(fetchMessages.rejected, (state) => {
        state.isFetchSuccess = false
        state.isFetchLoading = false
        state.isFetchError = true
      })
        .addCase(sendMessage.pending, (state) => {
          state.isSendMessageLoading = true
          state.isSendMessageSuccess = false
          state.isSendMessageError = false
        })
        .addCase(sendMessage.fulfilled, (state, action) => {

          state.isSendMessageLoading = false
          state.isSendMessageSuccess = true
        })
        .addCase(sendMessage.rejected, (state) => {
          state.isSendMessageLoading = false
          state.isSendMessageError = true
        })
    },
  })
  
  export const { reset,addMessage  } = messagesSlice.actions
  export default messagesSlice.reducer