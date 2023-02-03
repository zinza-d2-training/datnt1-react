import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { publicRequest } from 'callsApi';
import { RootState } from 'store';

export interface LoginInfo {
  email: string;
  password: string;
}

export interface UserInfo {
  role_id: number;
  identification_card: string;
  email: string;
  fullname: string;
  birthday: string;
  gender: string;
  ward_id: number;
}

export interface UserState {
  userInfo: UserInfo;
  status: 'idle' | 'pending' | 'succeeded' | 'rejected';
  loading: boolean;
}

const initialState: UserState = {
  userInfo: {
    role_id: 1,
    identification_card: '',
    email: '',
    fullname: '',
    birthday: '',
    gender: '',
    ward_id: 0
  },
  status: 'idle',
  loading: false
};

export const loginAsync = createAsyncThunk(
  'user/login',
  async (loginInfo: LoginInfo) => {
    const res = await publicRequest.post('auth/login', loginInfo);

    return res.data;
  }
);

export const getUserInfoAsync = createAsyncThunk(
  'user/info',
  async (accessToken: string) => {
    try {
      const res = await publicRequest.get('auth/user-info', {
        headers: { Authorization: `Bearer ${accessToken}` },
        withCredentials: true
      });

      return res.data;
    } catch (error) {
      console.log(error);
    }
  }
);

export const userSlice = createSlice({
  name: 'user',
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loginAsync.pending, (state) => {
        state.status = 'pending';
        state.loading = true;
      })
      .addCase(loginAsync.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.loading = false;

        localStorage.setItem(
          'accessToken',
          JSON.stringify(action.payload.accessToken)
        );
      })
      .addCase(loginAsync.rejected, (state) => {
        state.status = 'rejected';
        state.loading = false;
      })
      .addCase(getUserInfoAsync.pending, (state) => {
        state.status = 'pending';
        state.loading = true;
      })
      .addCase(getUserInfoAsync.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.userInfo = action.payload;
        state.loading = false;
        console.log(state.userInfo);
      });
  }
});

export const {} = userSlice.actions;

// The function below is called a selector and allows us to select a value from
// the state Se.lectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`
export const selectUser = (state: RootState) => state.user;

export default userSlice.reducer;
