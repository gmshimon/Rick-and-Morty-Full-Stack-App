import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axiosSecure from '../../Utils/axiosSecure'
const initialState = {
  myCharacters: null,
  getCharacterLoading: false,
  getCharacterSuccess: false,
  getCharacterError: false,
  createCharacterLoading: false,
  createCharacterSuccess: false,
  createCharacterError: false
}

export const getMyCharacter = createAsyncThunk('getMyCharacter', async () => {
  const response = await axiosSecure.get('/character/get-my-character')
  return response.data.data
})

export const createMyCharacter = createAsyncThunk(
  'createMyCharacter',
  async data => {
    const response = await axiosSecure.post('/character', data)
    return response.data.data
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
  }
})

export const { reset } = characterSlice.actions
export default characterSlice.reducer
