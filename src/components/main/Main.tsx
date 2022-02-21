import Header from "../header/Header";
import {allRatesType, currencyApi} from '../../api/currencyApi';
import Exchange from '../ exchange/ExchangeField';
import {ChangeEvent, useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {initialCurrencyStateType, setLoading, setState} from '../../store/CurrencySlice';
import {RootState} from '../../store/store';

export default function Main() {

  const dispatch = useDispatch()
  const {headerRate} = useSelector<RootState, initialCurrencyStateType>(state => state.currency)
  const {data, isFetching} = currencyApi.useFetchAllCurrencyQuery()

  useEffect(() => {
    data &&
    dispatch(setState(data.rates))
    dispatch(setLoading(isFetching))
  }, [data, dispatch, isFetching])


  //Headers Currency rate
  // const headerDataRates = data && data.header
  // const currencyNames = data && Object.keys(data.rates)

  // ExchangeField data
  const [isFirstCurrencyAmountChange, setIsFirstCurrencyAmountChange] = useState<boolean>(true)


  // first exchangeField
  const [firstCurrencyName, setFirstCurrency] = useState<string>('UAH')
  const [firstCurrencyAmount, setFirstCurrencyAmount] = useState<number | ''>(1)


  const handleFirstCurrencyName = (e: ChangeEvent<HTMLSelectElement>) => {
    setFirstCurrency(e.currentTarget.value)
    setSecondCurrencyAmount('')
    setFirstCurrencyAmount('')
  }

  const handleFirstCurrencyAmount = (e: ChangeEvent<HTMLInputElement>) => {
    setFirstCurrencyAmount(+e.currentTarget.value.trim())
    setIsFirstCurrencyAmountChange(true)
    if (+e.currentTarget.value === 0) {
      setFirstCurrencyAmount('')
      setSecondCurrencyAmount('')
    }
  }

  // second exchangeField
  const [secondCurrencyName, setSecondCurrency] = useState<string>('USD')
  const [secondCurrencyAmount, setSecondCurrencyAmount] = useState<number | ''>('')


  const handleSecondCurrencyName = (e: ChangeEvent<HTMLSelectElement>) => {
    setSecondCurrency(e.currentTarget.value)
    setSecondCurrencyAmount('')
    setFirstCurrencyAmount('')
  }
  const handleSecondCurrencyAmount = (e: ChangeEvent<HTMLInputElement>) => {
    setSecondCurrencyAmount(+e.currentTarget.value.trim())
    setIsFirstCurrencyAmountChange(false)
    if (+e.currentTarget.value === 0) {
      setSecondCurrencyAmount('')
      setFirstCurrencyAmount('')
    }
  }

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
      {/*<Exchange*/}
      {/*  currencyNames={currencyNames}*/}
      {/*  currencyName={firstCurrencyName}*/}
      {/*  onChangeName={handleFirstCurrencyName}*/}
      {/*  currencyAmount={firstCurrencyAmount}*/}
      {/*  onChangeAmount={handleFirstCurrencyAmount}/>*/}
      {/*<Exchange*/}
      {/*  currencyNames={currencyNames}*/}
      {/*  currencyName={secondCurrencyName}*/}
      {/*  onChangeName={handleSecondCurrencyName}*/}
      {/*  currencyAmount={secondCurrencyAmount}*/}
      {/*  onChangeAmount={handleSecondCurrencyAmount}/>*/}
      <div></div>
    </>
  )
}


