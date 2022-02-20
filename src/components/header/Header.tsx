import {CurrencyAllRatesResponseHeader} from '../../api/currencyApi';

type HeaderPropsType = {
  dataRates: CurrencyAllRatesResponseHeader | undefined
}

export default function Header({dataRates}: HeaderPropsType) {

  const mapDataRates = dataRates
    && Object.keys(dataRates).map(item =>
      <li key={item}>
        <span>{item}</span>
        <span>{dataRates
          && dataRates[item as keyof CurrencyAllRatesResponseHeader]}</span>
      </li>)

  return (
    <nav>
      <ul>
        {mapDataRates}
      </ul>
    </nav>
  )
}