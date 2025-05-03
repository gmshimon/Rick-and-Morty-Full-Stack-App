import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axiosSecure from '../../Utils/axiosSecure'
const initialState = {
  myCharacters: null,
  getCharacterLoading: false,
  getCharacterSuccess: false,
  getCharacterError: false,
  createCharacterLoading: false,
  createCharacterSuccess: false,
  createCharacterError: false,
  deleteCharacterLoading: false,
  deleteCharacterSuccess: false,
  deleteCharacterError: false
}

export const getMyCharacter = createAsyncThunk(
  'getMyCharacter',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosSecure.get('/character/get-my-character')
      return response.data.data
    } catch (err) {
      return rejectWithValue(err.response?.message || err.message)
    }
  }
)

export const createMyCharacter = createAsyncThunk(
  'createMyCharacter',
  async (payload, { rejectWithValue }) => {
    try {
      const response = await axiosSecure.post('/character', payload)
      return response.data.data
    } catch (err) {
      return rejectWithValue(err.response?.message || err.message)
    }
  }
)

export const deleteMyCharacter = createAsyncThunk(
  'deleteMyCharacter',
  async (id, { rejectWithValue }) => {
    try {
      await axiosSecure.delete(`/character/delete-character/${id}`)
      // return the id back so reducer can filter it out
      return id
    } catch (err) {
      // you could inspect err.response.data.message here
      return rejectWithValue(err.response?.data.message || err.message)
    }
  }
)

const characterSlice = createSlice({
  name: 'character',
  initialState,
  reducers: {
    reset: state => {
      state.getCharacterLoading = false
      state.getCharacterSuccess = false
      state.getCharacterError = false
      state.createCharacterLoading = false
      state.createCharacterSuccess = false
      state.createCharacterError = false
      state.deleteCharacterLoading = false
      state.deleteCharacterSuccess = false
      state.deleteCharacterError = false
    }
  },
  extraReducers: builder => {
    builder
      .addCase(getMyCharacter.pending, state => {
        state.getCharacterLoading = true
        state.getCharacterSuccess = false
        state.getCharacterError = false
      })
      .addCase(getMyCharacter.fulfilled, (state, action) => {
        state.myCharacters = action.payload
        state.getCharacterLoading = false
        state.getCharacterSuccess = true
        state.getCharacterError = false
      })
      .addCase(getMyCharacter.rejected, state => {
        state.getCharacterLoading = false
        state.getCharacterSuccess = false
        state.getCharacterError = true
      })
      .addCase(createMyCharacter.pending, state => {
        state.createCharacterLoading = true
        state.createCharacterSuccess = false
        state.createCharacterError = false
      })
      .addCase(createMyCharacter.fulfilled, (state, action) => {
        state.createCharacterLoading = false
        state.createCharacterSuccess = true
        state.createCharacterError = false
      })
      .addCase(createMyCharacter.rejected, state => {
        state.createCharacterLoading = false
        state.createCharacterSuccess = false
        state.createCharacterError = true
      })
      .addCase(deleteMyCharacter.pending, state => {
        state.deleteCharacterLoading = true
        state.deleteCharacterSuccess = false
        state.deleteCharacterError = false
      })
      .addCase(deleteMyCharacter.fulfilled, (state, action) => {
        // remove the deleted character from the list
        state.myCharacters = state.myCharacters?.filter(
          char => char._id !== action.payload
        )
        state.deleteCharacterError = false
        state.deleteCharacterLoading = false
        state.deleteCharacterSuccess = true
      })
      .addCase(deleteMyCharacter.rejected, state => {
        state.deleteCharacterLoading = false
        state.deleteCharacterError = true
        state.deleteCharacterSuccess = false
      })
  }
})

export const { reset } = characterSlice.actions
export default characterSlice.reducer
