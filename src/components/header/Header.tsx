import {CurrencyAllRatesResponseHeader} from '../../api/currencyApi';
import {numberRound} from '../../assets/helpers';

type HeaderPropsType = {
  rates: string[]
  dataRates: CurrencyAllRatesResponseHeader | undefined
}

export default function Header({rates, dataRates}: HeaderPropsType) {

  const usdRate = dataRates && numberRound(dataRates.UAHtoUSD)
  const eurRate = dataRates && numberRound(dataRates.UAHtoEUR)

  return (
    <nav>
      <ul>
        <li>{rates[0]}:{usdRate}</li>
        <li>{rates[1]}:{eurRate}</li>
      </ul>
    </nav>
  )
}