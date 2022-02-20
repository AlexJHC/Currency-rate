import Header from "../header/Header";
import {currencyApi} from '../../api/currencyApi';

export default function Main() {

  const {data, isFetching} = currencyApi.useFetchAllCurrencyQuery()
  console.log(data)

  if (isFetching) return <div>Loading</div>

  const headerRatesNames = ['USD', 'UAH']
  const headerDataRates = data && data.header

  return (
    <>
      <Header rates={headerRatesNames} dataRates={headerDataRates}/>
    </>
  )
}