import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { publicRequest } from 'callsApi';

export interface PriorityGroup {
  priority_group_id: number;
  description: string;
}

export interface PriorityGroupState {
  priorityGroups: PriorityGroup[];
  status: 'idle' | 'pending' | 'succeeded' | 'failed';
  loading: true | false;
}

const initialState: PriorityGroupState = {
  priorityGroups: [],
  status: 'idle',
  loading: false
};

export const getPriorityGroupsAsync = createAsyncThunk(
  'priorityGroup/get',
  async (_, { rejectWithValue }) => {
    try {
      const res = await publicRequest.get<PriorityGroup[]>('priority-group');

      return res.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const priorityGroupSlice = createSlice({
  name: 'priorityGroup',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getPriorityGroupsAsync.pending, (state) => {
        state.status = 'pending';
        state.loading = true;
      })
      .addCase(getPriorityGroupsAsync.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.loading = false;
        state.priorityGroups = action.payload;
      })
      .addCase(getPriorityGroupsAsync.rejected, (state, action) => {
        state.status = 'failed';
        state.loading = false;
      });
  }
});

export const {} = priorityGroupSlice.actions;

export default priorityGroupSlice.reducer;
