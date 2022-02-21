import Header from "../header/Header";
import {allRatesType, currencyApi} from '../../api/currencyApi';
import Exchange from '../ exchange/ExchangeField';
import {ChangeEvent, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {
  initialCurrencyStateType, setFieldAmount,
  setFieldName, setisFirstFieldChanged,
  setLoading,
  setState
} from '../../store/CurrencySlice';
import {AppDispatch, RootState} from '../../store/store';
import style from './Main.module.css'

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
    secondField: {
      name: SecondFieldName,
      amount: SecondFieldAmount
    },
    allCurrencyNames,
  } = useSelector<RootState, initialCurrencyStateType>(state => state.currency)

  const handleFirstCurrencyName = (e: ChangeEvent<HTMLSelectElement>, isFirstField: boolean) => {
    dispatch(setisFirstFieldChanged(isFirstField))
    dispatch(setFieldName(e.currentTarget.value as keyof allRatesType))
  }

  const handleFirstCurrencyAmount = (e: ChangeEvent<HTMLInputElement>, isFirstField: boolean) => {
    dispatch(setisFirstFieldChanged(isFirstField))
    dispatch(setFieldAmount(+e.currentTarget.value.trim()))
  }

  return (
    <>
      <Header
        dataRates={headerRate}/>
      <section className={style.content}>
        <h1>Currency rate</h1>
        <Exchange
          firstField
          currencyNames={allCurrencyNames}
          currencyName={FirstFieldName}
          onChangeName={handleFirstCurrencyName}
          currencyAmount={FirstFieldAmount}
          onChangeAmount={handleFirstCurrencyAmount}/>
        <span>=</span>
        <Exchange
          firstField={false}
          currencyNames={allCurrencyNames}
          currencyName={SecondFieldName}
          onChangeName={handleFirstCurrencyName}
          currencyAmount={SecondFieldAmount}
          onChangeAmount={handleFirstCurrencyAmount}/>
      </section>
    </>
  )
}


