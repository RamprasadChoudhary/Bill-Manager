import { configureStore } from '@reduxjs/toolkit';
import {thunk} from 'redux-thunk';
import billsReducer from '../features/billsSlice';

export const store = configureStore({
  reducer: {
    bills: billsReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk),
});

