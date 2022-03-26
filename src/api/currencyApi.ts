import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/dist/query/react';

const currencyApiKey = process.env.REACT_APP_CURRENCY_KEY

export const currencyApi = createApi({
  reducerPath: 'currencyApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://api.currencyapi.com'
  }),
  endpoints: (build) => ({
    fetchAllCurrency: build.query<CurrencyAllRatesResponseType, void>({
      query: () => ({
        url: `/api/v2/latest`,
        params: {
          apikey: currencyApiKey,
        }
      }),
      transformResponse: (allCurrency: CurrencyAllRatesResponseType): CurrencyAllRatesResponseType | Promise<CurrencyAllRatesResponseType> => {
        return {data: {...allCurrency.data, USD: 1}}
      }
    })
  })
})

type CurrencyAllRatesResponseType = {
  data: allRatesType,
}

export type allRatesType = {
  AED: number
  AFN: number
  ALL: number
  AMD: number
  AOA: number
  ARS: number
  AUD: number
  AZN: number
  BDT: number
  BGN: number
  BHD: number
  BIF: number
  BIH: number
  BND: number
  BOB: number
  BRL: number
  BSD: number
  BTC: number
  BWP: number
  BYR: number
  CAD: number
  CDF: number
  CHF: number
  CLP: number
  CNY: number
  COP: number
  CRC: number
  CUC: number
  CVE: number
  CZK: number
  DJF: number
  DKK: number
  DOP: number
  DZD: number
  EGP: number
  ERN: number
  ETB: number
  ETH: number
  EUR: number
  FJD: number
  GBP: number
  GEL: number
  GHS: number
  GMD: number
  GNF: number
  GTQ: number
  GYD: number
  HKD: number
  HNL: number
  HRV: number
  HTG: number
  HUF: number
  IDR: number
  ILS: number
  INR: number
  IQD: number
  IRR: number
  ISK: number
  JMD: number
  JOD: number
  JPY: number
  KES: number
  KGS: number
  KHR: number
  KMF: number
  KRW: number
  KYD: number
  KZT: number
  LAK: number
  LBP: number
  LKR: number
  LRD: number
  LSL: number
  LTC: number
  LYD: number
  MAD: number
  MDL: number
  MGA: number
  MKD: number
  MMK: number
  MNT: number
  MOP: number
  MUR: number
  MVR: number
  MWK: number
  MXN: number
  MYR: number
  MZN: number
  NAD: number
  NGN: number
  NIO: number
  NOK: number
  NPR: number
  NZD: number
  OMR: number
  PAB: number
  PEN: number
  PGK: number
  PHP: number
  PKR: number
  PLN: number
  PYG: number
  QAR: number
  RON: number
  RSD: number
  RUB: number
  RWF: number
  SAR: number
  SCR: number
  SDG: number
  SEK: number
  SGD: number
  SLL: number
  SOS: number
  SRD: number
  SSP: number
  STD: number
  SVC: number
  SYP: number
  SZL: number
  THB: number
  TJS: number
  TMT: number
  TND: number
  TRY: number
  TTD: number
  TWD: number
  TZS: number
  UAH: number
  URY: number
  UZS: number
  VND: number
  XAF: number
  XOF: number
  XPF: number
  XRP: number
  YER: number
  ZAR: number
  USD: number
}

export type CurrencyAllRatesResponseHeader = {
  USD: number
  EUR: number
}
