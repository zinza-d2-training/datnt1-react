import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { publicRequest, userRequest } from 'callsApi';
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
  async (loginInfo: LoginInfo, { rejectWithValue }) => {
    try {
      const res = await publicRequest.post('auth/login', loginInfo);

      return res.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const getUserInfoAsync = createAsyncThunk(
  'user/info',
  async (_, { rejectWithValue }) => {
    try {
      const res = await userRequest.get('auth/user-info');

      return res.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const logoutAsync = createAsyncThunk(
  'user/logout',
  async (_, { rejectWithValue }) => {
    try {
      localStorage.removeItem('accessToken');
      const res = await publicRequest.get('auth/logout');

      return res.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
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
      });

    builder
      .addCase(getUserInfoAsync.pending, (state) => {
        state.status = 'pending';
        state.loading = true;
      })
      .addCase(getUserInfoAsync.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.userInfo = action.payload;
        state.loading = false;
      })
      .addCase(getUserInfoAsync.rejected, (state, action) => {
        state.status = 'rejected';
        state.loading = false;
      });

    builder
      .addCase(logoutAsync.pending, (state) => {
        state.status = 'pending';
        state.loading = true;
      })
      .addCase(logoutAsync.fulfilled, (state) => {
        state.status = 'succeeded';
        state.loading = false;
        state.userInfo = initialState.userInfo;
      })
      .addCase(logoutAsync.rejected, (state) => {
        state.status = 'rejected';
        state.loading = false;
      });
  }
});

export const {} = userSlice.actions;

// The function below is called a selector and allows us to select a value from
// the state Se.lectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`
export const selectUser = (state: RootState) => state.user;

export default userSlice.reducer;
