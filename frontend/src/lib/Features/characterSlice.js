import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axiosSecure from '../../Utils/axiosSecure'
const initialState = {
  myCharacters: null,
  singleCharacter:null,
  getCharacterLoading: false,
  getCharacterSuccess: false,
  getCharacterError: false,
  getSingleCharacterLoading: false,
  getSingleCharacterSuccess: false,
  getSingleCharacterError: false,
  createCharacterLoading: false,
  createCharacterSuccess: false,
  createCharacterError: false,
  deleteCharacterLoading: false,
  deleteCharacterSuccess: false,
  deleteCharacterError: false,
  updateCharacterLoading: false,
  updateCharacterSuccess: false,
  updateCharacterError: false,
  reGenBackstoryLoading: false,
  reGenBackstorySuccess: false,
  reGenBackstoryError: false
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

export const updateMyCharacter = createAsyncThunk(
  'updateMyCharacter',
  async ({ id, updates }, { rejectWithValue }) => {
    try {
      const response = await axiosSecure.put(`/character/update/${id}`, updates)
      return response.data.data
    } catch (err) {
      return rejectWithValue(err.response?.data.message || err.message)
    }
  }
)

export const reGenerateBackstory = createAsyncThunk(
  'reGenerateBackstory',
  async (id, { rejectWithValue }) => {
    try {
      const { data } = await axiosSecure.post(`/character/generate-backstories/${id}`)
      return data.data
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || err.message)
    }
  }
)
export const getSingleCharacter = createAsyncThunk(
  'getSingleCharacter',
  async (id, { rejectWithValue }) => {
    try {
      const response = await axiosSecure.get(`/character/${id}`)
      return response.data.data
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || err.message)
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
      state.getSingleCharacterLoading = false
      state.getSingleCharacterSuccess = false
      state.getSingleCharacterError = false
      state.createCharacterLoading = false
      state.createCharacterSuccess = false
      state.createCharacterError = false
      state.deleteCharacterLoading = false
      state.deleteCharacterSuccess = false
      state.deleteCharacterError = false
      state.updateCharacterLoading = false
      state.updateCharacterSuccess = false
      state.updateCharacterError = false
      state.reGenBackstoryLoading=false
      state.reGenBackstorySuccess=false
      state.reGenBackstoryError=false
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

      .addCase(getSingleCharacter.pending, state => {
        state.getSingleCharacterLoading = true
        state.getSingleCharacterSuccess = false
        state.getSingleCharacterError = false
      })
      .addCase(getSingleCharacter.fulfilled, (state, action) => {
        state.singleCharacter = action.payload
        state.getSingleCharacterLoading = false
        state.getSingleCharacterSuccess = true
      })
      .addCase(getSingleCharacter.rejected, state => {
        state.getSingleCharacterLoading = false
        state.getSingleCharacterError = true
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
      .addCase(updateMyCharacter.pending, state => {
        state.updateCharacterLoading = true
        state.updateCharacterSuccess = false
        state.updateCharacterError = false
      })
      .addCase(updateMyCharacter.fulfilled, state => {
        state.updateCharacterLoading = false
        state.updateCharacterSuccess = true
        state.updateCharacterError = false
      })
      .addCase(updateMyCharacter.rejected, state => {
        state.updateCharacterSuccess = false
        state.updateCharacterLoading = false
        state.updateCharacterError = true
      })

      .addCase(reGenerateBackstory.pending, state => {
        state.reGenBackstoryLoading = true
        state.reGenBackstoryError   = false
        state.reGenBackstorySuccess = false
      })
      .addCase(reGenerateBackstory.fulfilled, (state, { payload }) => {
        state.reGenBackstoryLoading = false
        state.reGenBackstorySuccess = true
        state.reGenBackstoryError   = false
        // update the character in place
        state.myCharacters = state.myCharacters?.map(char =>
          char._id === payload._id ? payload : char
        )
      })
      .addCase(reGenerateBackstory.rejected, state => {
        state.reGenBackstoryLoading = false
        state.reGenBackstoryError   = true
        state.reGenBackstorySuccess = false
      })
  }
})

export const { reset } = characterSlice.actions
export default characterSlice.reducer
