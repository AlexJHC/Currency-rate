import {ChangeEvent} from "react"

type ExchangeFieldPropsType = {
  currencyNames: string[]
  currencyName: string
  onChangeName: (e: ChangeEvent<HTMLSelectElement>, isFirstField: boolean) => void
  currencyAmount: number | ''
  onChangeAmount: (e: ChangeEvent<HTMLInputElement>, isFirstField: boolean) => void
  firstField: boolean
}

export default function ExchangeField({
                                        currencyNames,
                                        currencyName,
                                        onChangeName,
                                        currencyAmount,
                                        onChangeAmount,
                                        firstField,
                                      }: ExchangeFieldPropsType) {

  const mapCurrencyNames = currencyNames
    && currencyNames.map(name =>
      <option key={name} value={name}>{name}</option>
    )

  const handleChangeSelect = (e: ChangeEvent<HTMLSelectElement>) => {
    onChangeName(e, firstField)
  }

  const handleChangeInput = (e: ChangeEvent<HTMLInputElement>) => {
    onChangeAmount(e, firstField)
  }

  return (
    <div>
      <input type="number" value={currencyAmount} onChange={handleChangeInput}/>
      <select value={currencyName} onChange={handleChangeSelect}>
        {mapCurrencyNames}
      </select>
    </div>
  )
}