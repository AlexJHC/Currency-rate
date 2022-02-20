import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/dist/query/react';

const currencyApiKey = process.env.REACT_APP_CURRENCY_KEY

export const currencyApi = createApi({
  reducerPath: 'currencyApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `https://api.exchangeratesapi.io/v1/latest?access_key=${currencyApiKey}`
  }),
  endpoints: (build) => ({
    fetchAllCurrency: build.query<any, void>({
      query: () => ({
        url: ``
      })
    })
  })
})
