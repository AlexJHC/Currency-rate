import {configureStore} from '@reduxjs/toolkit';
import {currencyApi} from '../api/currencyApi';

const reducer = {
[currencyApi.reducerPath]: currencyApi.reducer
}

export const store = configureStore({
  reducer,
  middleware: getDefaultMiddleware =>  getDefaultMiddleware().concat()
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
