import Header from "../header/Header";
import {allRatesType, currencyApi} from '../../api/currencyApi';
import Exchange from '../ exchange/ExchangeField';
import {ChangeEvent, useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {
  initialCurrencyStateType, setFirstFieldAmount,
  setFirstFieldName,
  setLoading,
  setState
} from '../../store/CurrencySlice';
import {AppDispatch, RootState} from '../../store/store';

export default function Main() {
  const dispatch = useDispatch<AppDispatch>()

  const {data, isFetching} = currencyApi.useFetchAllCurrencyQuery()

  useEffect(() => {
    data &&
    dispatch(setState(data.rates))
    dispatch(setLoading(isFetching))
  }, [data, dispatch, isFetching])

  const {
    headerRate,
    firstField: {
      name: FirstFieldName,
      amount: FirstFieldAmount
    },
    allCurrencyNames,
  } = useSelector<RootState, initialCurrencyStateType>(state => state.currency)


  // // ExchangeField data
  // const [isFirstCurrencyAmountChange, setIsFirstCurrencyAmountChange] = useState<boolean>(true)


  // first exchangeField
  const [firstCurrencyName, setFirstCurrency] = useState<string>('UAH')
  // const [firstCurrencyAmount, setFirstCurrencyAmount] = useState<number | ''>(1)
  // second exchangeField
  const [secondCurrencyName, setSecondCurrency] = useState<string>('USD')
  const [secondCurrencyAmount, setSecondCurrencyAmount] = useState<number | ''>('')


  const handleFirstCurrencyName = (e: ChangeEvent<HTMLSelectElement>) => {
    dispatch(setFirstFieldName(e.currentTarget.value as keyof allRatesType))
  }


  // const handleFirstCurrencyAmount = (e: ChangeEvent<HTMLInputElement>) => {
  //   setFirstCurrencyAmount(+e.currentTarget.value.trim())
  //   console.log(firstCurrencyAmount)
  //   // dispatch(setIsFirstCurrencyAmountChange(true))
  //   // dispatch(setFirstFieldAmount(+e.currentTarget.value.trim()))
  //   //
  //   // if (+e.currentTarget.value === 0) {
  //   //   setFirstCurrencyAmount('')
  //   //   setSecondCurrencyAmount('')
  //   // }
  // }

  const handleFirstCurrencyAmount = (e: ChangeEvent<HTMLInputElement>) => {
    dispatch(setFirstFieldAmount(+e.currentTarget.value.trim()))
  }


  //
  //
  //
  //
  // const handleSecondCurrencyName = (e: ChangeEvent<HTMLSelectElement>) => {
  //   setSecondCurrency(e.currentTarget.value)
  //   setSecondCurrencyAmount('')
  //   setFirstCurrencyAmount('')
  // }
  // const handleSecondCurrencyAmount = (e: ChangeEvent<HTMLInputElement>) => {
  //   setSecondCurrencyAmount(+e.currentTarget.value.trim())
  //   setIsFirstCurrencyAmountChange(false)
  //   if (+e.currentTarget.value === 0) {
  //     setSecondCurrencyAmount('')
  //     setFirstCurrencyAmount('')
  //   }
  // }

  // useEffect(() => {
  //   const firstExchangeRate = data && data.rates[firstCurrencyName as keyof allRatesType]
  //   const secondExchangeRate = data && data.rates[secondCurrencyName as keyof allRatesType]
  //
  //   if (isFirstCurrencyAmountChange) {
  //     firstExchangeRate
  //     && secondExchangeRate
  //     && firstCurrencyAmount
  //     && setSecondCurrencyAmount(secondExchangeRate / firstExchangeRate * firstCurrencyAmount)
  //   } else {
  //     firstExchangeRate
  //     && secondExchangeRate
  //     && secondCurrencyAmount
  //     && setFirstCurrencyAmount(firstExchangeRate / secondExchangeRate * secondCurrencyAmount)
  //   }
  // }, [data, firstCurrencyAmount, firstCurrencyName, isFirstCurrencyAmountChange, secondCurrencyAmount, secondCurrencyName])
  //
  //
  // if (isFetching) return <div>Loading...</div>

  return (
    <>
      <Header
        dataRates={headerRate}/>
      <Exchange
        currencyNames={allCurrencyNames}
        currencyName={FirstFieldName}
        onChangeName={handleFirstCurrencyName}
        currencyAmount={FirstFieldAmount}
        onChangeAmount={handleFirstCurrencyAmount}/>
      {/*<Exchange*/}
      {/*  currencyNames={currencyNames}*/}
      {/*  currencyName={secondCurrencyName}*/}
      {/*  onChangeName={handleSecondCurrencyName}*/}
      {/*  currencyAmount={secondCurrencyAmount}*/}
      {/*  onChangeAmount={handleSecondCurrencyAmount}/>*/}
    </>
  )
}


