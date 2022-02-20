import Header from "../header/Header";
import {currencyApi} from '../../api/currencyApi';

export default function Main() {

  const {data, isFetching} = currencyApi.useFetchAllCurrencyQuery()

  const headerDataRates = data && data.header

  if (isFetching) return <div>Loading</div>

  return (
    <>
      <Header dataRates={headerDataRates}/>
    </>
  )
}