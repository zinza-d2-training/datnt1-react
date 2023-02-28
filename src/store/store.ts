import {
  Action,
  combineReducers,
  configureStore,
  ThunkAction
} from '@reduxjs/toolkit';
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import counterReducer from 'features/counter/counterSlice';
import registerReducer from 'features/user/registerSlice';
import userReducer from 'features/user/userSlice';
import vaccinationSiteReducer from 'features/vaccination/vaccinationSiteSlice';
import injectionRegistrationReducer from 'features/vaccination/injectionRegistrationSlice';
import administrativeUnitReducer from 'features/administrative_unit/administrativeSlice';
import documentReducer from 'features/document/documentSlice';
import priorityGroupReducer from 'features/priority_group/priorityGroupSlice';

const persistConfig = {
  key: 'root',
  version: 1,
  storage
  // blacklist: ['user']
};

const rootReducer = combineReducers({
  counter: counterReducer,
  user: userReducer,
  register: registerReducer,
  vaccinationSite: vaccinationSiteReducer,
  injectionRegistration: injectionRegistrationReducer,
  administrativeUnit: administrativeUnitReducer,
  document: documentReducer,
  priorityGroup: priorityGroupReducer
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER]
      }
    })
});

export const persistor = persistStore(store);

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
