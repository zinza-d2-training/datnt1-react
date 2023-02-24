import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { publicRequest } from 'callsApi';
import { RootState } from 'store';

interface RegisterInfo {
  identification_card: string;
  email: string;
  password: string;
  fullname: string;
  birthday: string | Date;
  gender: string;
  ward_id: number | string;
}

export interface SerializedError {
  name?: string;
  message?: string;
  stack?: string;
  code?: string;
}

export interface RegisterState {
  registerInfo: RegisterInfo;
  status: 'idle' | 'pending' | 'succeeded' | 'rejected';
  loading: boolean;
  error: any;
}

const initialState = {
  registerInfo: {
    identification_card: '',
    email: '',
    password: '',
    fullname: '',
    birthday: '',
    gender: '',
    ward_id: ''
  },
  status: 'idle',
  loading: false,
  error: {
    name: 'string',
    message: 'string',
    stack: 'string',
    code: 'string'
  }
} as RegisterState;

export const registerAsync = createAsyncThunk(
  'user/register',
  async (registerInfo: RegisterInfo, { rejectWithValue }) => {
    try {
      const res = await publicRequest.post<RegisterInfo>(
        'auth/register',
        registerInfo
      );

      return res.data;
    } catch (error: any) {
      // Use `err.response.data` as `action.payload` for a `rejected` action,
      // by explicitly returning it using the `rejectWithValue()` utility
      return rejectWithValue(error.response.data.message);
    }
  }
);

export const registerSlice = createSlice({
  name: 'register',
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    resetStatus: (state) => {
      state.status = 'idle';
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerAsync.pending, (state) => {
        state.loading = true;
        state.status = 'pending';
      })
      .addCase(registerAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.status = 'succeeded';
        state.registerInfo = action.payload;
      })
      .addCase(registerAsync.rejected, (state, action) => {
        state.loading = false;
        state.status = 'rejected';
        state.error = action.payload;
      });
  }
});

export const { resetStatus } = registerSlice.actions;

export const selectRegister = (state: RootState) => state.register;

export default registerSlice.reducer;
