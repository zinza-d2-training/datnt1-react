import { createSlice, PayloadAction } from '@reduxjs/toolkit';
// import { RootState } from 'store';
import { RootState } from 'store';

export interface UserState {
  name: string;
  email: string;
}

const initialState: UserState = {
  name: '',
  email: ''
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    // Use the PayloadAction type to declare the contents of `action.payload`
    loginUser: (state, action: PayloadAction<UserState>) => {
      state = action.payload;
    }
  }
});

export const { loginUser } = userSlice.actions;

// The function below is called a selector and allows us to select a value from
// the state Se.lectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`
export const selectUser = (state: RootState) => state.user;

export default userSlice.reducer;
