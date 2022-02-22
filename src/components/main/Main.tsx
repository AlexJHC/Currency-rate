import Header from "../features/header/Header";
import {allRatesType, currencyApi} from '../../api/currencyApi';
import Exchange from '../features/exchange/ExchangeField';
import {ChangeEvent, useCallback, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {
  initialCurrencyStateType, setError, setFieldAmount,
  setFieldName, setIsFirstFieldChanged,
  setLoading,
  setState
} from '../../store/CurrencySlice';
import {AppDispatch, RootState} from '../../store/store';
import style from './Main.module.css'
import Loading from '../features/loading/Loading';
import Error from '../features/error/Error';

export default function Main() {
  const dispatch = useDispatch<AppDispatch>()

  const {data, isFetching, isError} = currencyApi.useFetchAllCurrencyQuery()

  useEffect(() => {
    data &&
    dispatch(setState(data.data))
    dispatch(setLoading(isFetching))
    dispatch(setError(isError))
  }, [data, dispatch, isFetching, isError])

  const {
    headerRate,
    firstField: {
      name: FirstFieldName,
      amount: FirstFieldAmount,
      fullName: FirstFieldFullName,
    },
    secondField: {
      name: SecondFieldName,
      amount: SecondFieldAmount,
      fullName: SecondFieldFullName,
    },
    allCurrencyNames,
    isLoading,
    isError: globalError,
  } = useSelector<RootState, initialCurrencyStateType>(state => state.currency)

  const handleFirstCurrencyName = useCallback((e: ChangeEvent<HTMLSelectElement>, isFirstField: boolean) => {
    dispatch(setIsFirstFieldChanged(isFirstField))
    dispatch(setFieldName(e.currentTarget.value as keyof allRatesType))
  }, [dispatch])

  const handleFirstCurrencyAmount = useCallback((e: ChangeEvent<HTMLInputElement>, isFirstField: boolean) => {
    dispatch(setIsFirstFieldChanged(isFirstField))
    if (+e.currentTarget.value >= 0) {
      dispatch(setFieldAmount(+e.currentTarget.value.trim()))
    }
  }, [dispatch])

  const handleDisableError = useCallback (() => {
    dispatch(setError(false))
  },[dispatch])

  return (
    <>
      <Header
        dataRates={headerRate}/>
      <section className={style.content}>
        <h1>Currency rate</h1>
        <Exchange
          firstField
          fullName={FirstFieldFullName}
          currencyNames={allCurrencyNames}
          currencyName={FirstFieldName}
          onChangeName={handleFirstCurrencyName}
          currencyAmount={FirstFieldAmount}
          onChangeAmount={handleFirstCurrencyAmount}/>
        <span>💸</span>
        <Exchange
          firstField={false}
          fullName={SecondFieldFullName}
          currencyNames={allCurrencyNames}
          currencyName={SecondFieldName}
          onChangeName={handleFirstCurrencyName}
          currencyAmount={SecondFieldAmount}
          onChangeAmount={handleFirstCurrencyAmount}/>
        <Error
          disableError={handleDisableError}
          isError={globalError}/>
        {isLoading && <Loading/>}
      </section>
    </>
  )
}


