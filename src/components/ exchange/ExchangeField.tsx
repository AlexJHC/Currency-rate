import {ChangeEvent} from "react"

type ExchangeFieldPropsType = {
  currencyNames: string[] | undefined
  currencyName: string
  onChangeName: (e: ChangeEvent<HTMLSelectElement>) => void
  currencyAmount: number | ''
  onChangeAmount: (e: ChangeEvent<HTMLInputElement>) => void
}

export default function ExchangeField({
                                        currencyNames,
                                        currencyName,
                                        onChangeName,
                                        currencyAmount,
                                        onChangeAmount
                                      }: ExchangeFieldPropsType) {

  const mapCurrencyNames = currencyNames
    && currencyNames.map(name =>
      <option key={name} value={name}>{name}</option>
    )


  return (
    <div>
      <input type="number" value={currencyAmount} onChange={onChangeAmount}/>
      <select value={currencyName} onChange={onChangeName}>
        {mapCurrencyNames}
      </select>
    </div>
  )
}