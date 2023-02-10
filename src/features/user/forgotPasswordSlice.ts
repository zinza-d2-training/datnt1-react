import { publicRequest } from 'callsApi';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UserEmail {
  email: string;
}

export interface ForgotPasswordState {
  message: string;
  status: 'idle' | 'pending' | 'succeeded' | 'failed';
  loading: true | false;
}

const initialState: ForgotPasswordState = {
  message: '',
  status: 'idle',
  loading: false
};

export const forgotPasswordAsync = createAsyncThunk(
  'forgotPassword',
  async (email: UserEmail): Promise<string> => {
    const res = await publicRequest.post<ForgotPasswordState['message']>(
      'forgot-password',
      email
    );

    return res.data;
  }
);

export const forgotPasswordSlice = createSlice({
  name: 'forgotPassword',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(forgotPasswordAsync.pending, (state) => {
        state.status = 'pending';
        state.loading = true;
      })
      .addCase(forgotPasswordAsync.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.loading = false;
        state.message = action.payload;
      })
      .addCase(forgotPasswordAsync.rejected, (state) => {
        state.status = 'failed';
        state.loading = false;
      });
  }
});

export const {} = forgotPasswordSlice.actions;
export default forgotPasswordSlice.reducer;
