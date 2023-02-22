import { Action, configureStore, ThunkAction } from '@reduxjs/toolkit';
import counterReducer from 'features/counter/counterSlice';
import registerReducer from 'features/user/registerSlice';
import userReducer from 'features/user/userSlice';
import vaccinationSiteReducer from 'features/vaccination/vaccinationSiteSlice';
import injectionRegistrationReducer from 'features/vaccination/injectionRegistrationSlice';
import administrativeUnitReducer from 'features/administrative_unit/administrativeSlice';
import documentReducer from 'features/document/documentSlice';

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    user: userReducer,
    register: registerReducer,
    vaccinationSite: vaccinationSiteReducer,
    injectionRegistration: injectionRegistrationReducer,
    administrativeUnit: administrativeUnitReducer,
    document: documentReducer
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
