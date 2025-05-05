import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from '../../Utils/axios'
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, updateProfile } from 'firebase/auth'
import auth from '@/Firebase/firebase'
const initialState = {
  userDetails: null,
  adminDetails: null,
  user: null,
  users: [],
  isLoading: true,
  isLoginLoading: false,
  isLoginError: false,
  isLoginSuccess: false,
  isCreateUserLoading: false,
  isCreateUserError: false,
  isCreateUserSuccess: false,
  isGetUserDataLoading: false,
  isGetUserDataSuccess: false,
  isGetUserDataError: false,
  isGetUsersLoading: false,
  isGetUsersSuccess: false,
  isGetUsersError: false,
  isUpdateUserLoading: false,
  isUpdateUserError: false,
  isUpdateUserSuccess: false
}
export const saveUserData = async userData => {
  const response = await axios.post('/user', userData)
  const data = response.data.data
  const tokenExpiration = new Date().getTime() + 10 * 60 * 60 * 1000
  localStorage.setItem(
    'userToken',
    JSON.stringify({
      access_token: response.data.token,
      expiration: tokenExpiration
    })
  )
  return data
}
export const fetchUser = createAsyncThunk('fetchUser', async email => {
  const response = await axios.post(`/user/get-user`, { email: email })
  return response.data.data
})
export const loginUser = createAsyncThunk(
  'loginUser',
  async ({ email, password }) => {
    const res = await signInWithEmailAndPassword(auth, email, password)
    const data = await saveUserData({
      name: res?.user?.displayName,
      email: res?.user?.email
    })
    return data
  }
)

export const createUser = createAsyncThunk(
  'createUser',
  async ({ username, email, phone, password }) => {
    const res = await createUserWithEmailAndPassword(auth, email, password)
    const result = updateProfile(auth.currentUser, {
      displayName: username
    })
    const data = await saveUserData({
      name: username,
      email: email,
      phone: phone
    })
    return data
  }
)

export const logOut = createAsyncThunk('logOut', async () => {
  const response = await signOut(auth)
  localStorage.removeItem('userToken')
  return response
})

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    reset: state => {
      state.userDetails = null
      state.adminDetails = null
      // state.isLoading = true
      state.isLoginLoading = false
      state.isLoginError = false
      state.isLoginSuccess = false
      state.isCreateUserLoading = false
      state.isCreateUserError = false
      state.isCreateUserSuccess = false
      state.isGetUserDataLoading = false
      state.isGetUserDataSuccess = false
      state.isGetUserDataError = false
      state.isGetUsersLoading = false
      state.isGetUsersSuccess = false
      state.isGetUsersError = false
      state.isUpdateUserLoading = false
      state.isUpdateUserError = false
      state.isUpdateUserSuccess = false
    },
    startLoading: (state, action) => {
      state.isLoading = true
    },
    setUsers: (state, action) => {
      state.isLoading = false
      state.users = action.payload
    }
  },
  extraReducers: builder => {
    builder
      .addCase(loginUser.pending, state => {
        state.isLoginLoading = true
        state.isLoginError = false
        state.isLoginSuccess = false
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.user = action.payload
        state.isLoginLoading = false
        state.isLoginSuccess = true
        state.isLoginError = false
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoginLoading = false
        state.isLoginError = true
        state.isLoginSuccess = false
      })
      .addCase(createUser.pending, state => {
        state.isCreateUserLoading = true
        state.isCreateUserError = false
        state.isCreateUserSuccess = false
      })
      .addCase(createUser.fulfilled, (state, action) => {
        state.isCreateUserError = false
        state.isCreateUserSuccess = true
        state.isCreateUserLoading = false
        state.user = action.payload
      })
      .addCase(createUser.rejected, (state, action) => {
        state.isCreateUserLoading = false
        state.isCreateUserError = true
        state.isCreateUserSuccess = false
      })
      .addCase(fetchUser.pending, state => {
        state.isGetUserDataLoading = true
        state.isGetUserDataError = false
        state.isGetUserDataSuccess = false
      })
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.user = action.payload
        state.isLoading = false
        state.isGetUserDataLoading = false
        state.isGetUserDataSuccess = true
        state.isGetUserDataError = false
      })
      .addCase(fetchUser.rejected, (state, action) => {
        state.isGetUserDataLoading = false
        state.isGetUserDataError = true
        state.isGetUserDataSuccess = false
      })
  }
})

export const { reset, setUser, startLoading } = userSlice.actions
export default userSlice.reducer
