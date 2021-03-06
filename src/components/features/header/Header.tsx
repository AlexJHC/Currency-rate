import {CurrencyAllRatesResponseHeader} from '../../../api/currencyApi';
import style from './Header.module.css'
import React from 'react';

type HeaderPropsType = {
  dataRates: CurrencyAllRatesResponseHeader | undefined
}

export default React.memo(function Header({dataRates}: HeaderPropsType) {
  const mapDataRates = dataRates
    && Object.keys(dataRates).map(item =>
      <li key={item}>
        <span>{item}/UAH:</span>
        <span>{dataRates
          && dataRates[item as keyof CurrencyAllRatesResponseHeader]}</span>
      </li>)

  return (
    <header className={style.NavBar}>
      <ul>
        {mapDataRates}
      </ul>
    </header>
  )
})