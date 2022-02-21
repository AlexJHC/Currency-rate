import {configureStore} from '@reduxjs/toolkit';
import {currencyApi} from '../api/currencyApi';
import currencySlice from './CurrencySlice';

const reducer = {
  currency: currencySlice,
  [currencyApi.reducerPath]: currencyApi.reducer
}

export const store = configureStore({
  reducer,
  middleware: getDefaultMiddleware => getDefaultMiddleware().concat(currencyApi.middleware)
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

//@ts-ignore
window.store = store