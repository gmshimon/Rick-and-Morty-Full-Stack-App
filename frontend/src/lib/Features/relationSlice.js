import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axiosSecure from '../../Utils/axiosSecure'

const initialState = {
  relations: null,
  createRelationLoading: false,
  createRelationSuccess: false,
  createRelationError: false,
  getRelationLoading: false,
  getRelationSuccess: false,
  getRelationError: false
}

export const predictRelation = createAsyncThunk(
  'predictRelation',
  async (data, { rejectWithValue }) => {
    try {
      const response =await axiosSecure.post('/relation/predict', data)
      return response.data.data
    } catch (error) {
      return rejectWithValue(err.response?.data?.message || err.message)
    }
  }
)

export const getRelation = createAsyncThunk('getRelation',async(id,{rejectWithValue})=>{
    try {
        const response = await axiosSecure.get(`/relation/${id}`)
        return response.data.data
    } catch (error) {
        return rejectWithValue(err.response?.data?.message || err.message) 
    }
})

const relationSlice = createSlice({
  name: 'relation',
  initialState,
  reducers: {
    resetRelation: state => {
      state.createRelationLoading = false
      state.createRelationSuccess = false
      state.createRelationError = false
      state.getRelationLoading = false
      state.getRelationSuccess = false
      state.getRelationError = false
    }
  },
  extraReducers:builder=>{
    builder
    .addCase(predictRelation.pending,(state)=>{
        state.createRelationLoading = true
        state.createRelationSuccess = false
        state.createRelationError = false
    })
    .addCase(predictRelation.fulfilled,(state,action)=>{
        state.relations.push(action.payload)
        state.createRelationLoading = false
        state.createRelationSuccess = true
        state.createRelationError = false
    })
    .addCase(predictRelation.rejected,(state)=>{
        state.createRelationLoading = false
        state.createRelationSuccess = false
        state.createRelationError = true
    })

    .addCase(getRelation.pending,(state)=>{
        state.getRelationLoading = true
        state.getRelationSuccess = false
        state.getRelationError = false
    })
    .addCase(getRelation.fulfilled,(state,action)=>{
        state.relations = action.payload
        state.getRelationLoading = false
        state.getRelationSuccess = true
        state.getRelationError = false
    })
    .addCase(getRelation.rejected,(state)=>{
        state.getRelationLoading = false
        state.getRelationSuccess = false
        state.getRelationError = true
    })
  }
})

export const {resetRelation} = relationSlice.actions

export default relationSlice.reducer
