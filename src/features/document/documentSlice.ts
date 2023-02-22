import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { publicRequest } from 'callsApi';

export interface Document {
  document_id: number;
  name: string;
  link: string;
}

export interface DocumentState {
  documents: Document[];
  status: 'idle' | 'pending' | 'succeeded' | 'failed';
  loading: true | false;
}

const initialState: DocumentState = {
  documents: [],
  status: 'idle',
  loading: false
};

export const getDocumentsAsync = createAsyncThunk(
  'document/get',
  async (_, { rejectWithValue }) => {
    try {
      const res = await publicRequest.get<Document[]>('document');

      return res.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const documentSlice = createSlice({
  name: 'document',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getDocumentsAsync.pending, (state) => {
        state.status = 'pending';
        state.loading = true;
      })
      .addCase(getDocumentsAsync.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.loading = false;
        state.documents = action.payload;
      })
      .addCase(getDocumentsAsync.rejected, (state, action) => {
        state.status = 'failed';
        state.loading = false;
      });
  }
});

export const {} = documentSlice.actions;

export default documentSlice.reducer;
