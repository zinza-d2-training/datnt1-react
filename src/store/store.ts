import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import counterReducer from 'features/counter/counterSlice';
import registerReducer from 'features/user/registerSlice';
import userReducer from 'features/user/userSlice';

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    user: userReducer,
    register: registerReducer
  }
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
