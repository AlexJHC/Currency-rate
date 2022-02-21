import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit';
import {allRatesType, CurrencyAllRatesResponseHeader, currencyApi} from '../api/currencyApi';
import {useDispatch} from 'react-redux';
import {numberRound} from '../assets/helpers';

const initialCurrencyState: initialCurrencyStateType = {
  allRates: {} as allRatesType,
  allCurrencyNames: [] as allNamesType,
  headerRate: {
    USD: 0,
    EUR: 0,
  },
  firstField: {
    fullName: '',
    name: 'UAH',
    amount: 1,
    exchangeRate: 0
  }, secondField: {
    fullName: '',
    name: 'USD',
    amount: '',
    exchangeRate: 0,
  },
  isFirstFieldChanged: true,
  isLoading: true,
  allCurrencyFullName: {
    AFA: 'Afghan Afghani',
    ALL: 'Albanian Lek',
    DZD: 'Algerian Dinar',
    AOA: 'Angolan Kwanza',
    ARS: 'Argentine Peso',
    AMD: 'Armenian Dram',
    AWG: 'Aruban Florin',
    AUD: 'Australian Dollar',
    AZN: 'Azerbaijani Manat',
    BSD: 'Bahamian Dollar',
    BHD: 'Bahraini Dinar',
    BDT: 'Bangladeshi Taka',
    BBD: 'Barbadian Dollar',
    BYR: 'Belarusian Ruble',
    BEF: 'Belgian Franc',
    BZD: 'Belize Dollar',
    BMD: 'Bermudan Dollar',
    BTN: 'Bhutanese Ngultrum',
    BTC: 'Bitcoin',
    BOB: 'Bolivian Boliviano',
    BAM: 'Bosnia-Herzegovina Convertible Mark',
    BWP: 'Botswanan Pula',
    BRL: 'Brazilian Real',
    GBP: 'British Pound Sterling',
    BND: 'Brunei Dollar',
    BGN: 'Bulgarian Lev',
    BIF: 'Burundian Franc',
    KHR: 'Cambodian Riel',
    CAD: 'Canadian Dollar',
    CVE: 'Cape Verdean Escudo',
    KYD: 'Cayman Islands Dollar',
    XOF: 'CFA Franc BCEAO',
    XAF: 'CFA Franc BEAC',
    XPF: 'CFP Franc',
    CLP: 'Chilean Peso',
    CNY: 'Chinese Yuan',
    COP: 'Colombian Peso',
    KMF: 'Comorian Franc',
    CDF: 'Congolese Franc',
    CRC: 'Costa Rican ColÃ³n',
    HRK: 'Croatian Kuna',
    CUC: 'Cuban Convertible Peso',
    CZK: 'Czech Republic Koruna',
    DKK: 'Danish Krone',
    DJF: 'Djiboutian Franc',
    DOP: 'Dominican Peso',
    XCD: 'East Caribbean Dollar',
    EGP: 'Egyptian Pound',
    ERN: 'Eritrean Nakfa',
    EEK: 'Estonian Kroon',
    ETB: 'Ethiopian Birr',
    EUR: 'Euro',
    FKP: 'Falkland Islands Pound',
    FJD: 'Fijian Dollar',
    GMD: 'Gambian Dalasi',
    GEL: 'Georgian Lari',
    DEM: 'German Mark',
    GHS: 'Ghanaian Cedi',
    GIP: 'Gibraltar Pound',
    GRD: 'Greek Drachma',
    GTQ: 'Guatemalan Quetzal',
    GNF: 'Guinean Franc',
    GYD: 'Guyanaese Dollar',
    HTG: 'Haitian Gourde',
    HNL: 'Honduran Lempira',
    HKD: 'Hong Kong Dollar',
    HUF: 'Hungarian Forint',
    ISK: 'Icelandic KrÃ³na',
    INR: 'Indian Rupee',
    IDR: 'Indonesian Rupiah',
    IRR: 'Iranian Rial',
    IQD: 'Iraqi Dinar',
    ILS: 'Israeli New Sheqel',
    ITL: 'Italian Lira',
    JMD: 'Jamaican Dollar',
    JPY: 'Japanese Yen',
    JOD: 'Jordanian Dinar',
    KZT: 'Kazakhstani Tenge',
    KES: 'Kenyan Shilling',
    KWD: 'Kuwaiti Dinar',
    KGS: 'Kyrgystani Som',
    LAK: 'Laotian Kip',
    LVL: 'Latvian Lats',
    LBP: 'Lebanese Pound',
    LSL: 'Lesotho Loti',
    LRD: 'Liberian Dollar',
    LYD: 'Libyan Dinar',
    LTL: 'Lithuanian Litas',
    MOP: 'Macanese Pataca',
    MKD: 'Macedonian Denar',
    MGA: 'Malagasy Ariary',
    MWK: 'Malawian Kwacha',
    MYR: 'Malaysian Ringgit',
    MVR: 'Maldivian Rufiyaa',
    MRO: 'Mauritanian Ouguiya',
    MUR: 'Mauritian Rupee',
    MXN: 'Mexican Peso',
    MDL: 'Moldovan Leu',
    MNT: 'Mongolian Tugrik',
    MAD: 'Moroccan Dirham',
    MZM: 'Mozambican Metical',
    MMK: 'Myanmar Kyat',
    NAD: 'Namibian Dollar',
    NPR: 'Nepalese Rupee',
    ANG: 'Netherlands Antillean Guilder',
    TWD: 'New Taiwan Dollar',
    NZD: 'New Zealand Dollar',
    NIO: 'Nicaraguan CÃ³rdoba',
    NGN: 'Nigerian Naira',
    KPW: 'North Korean Won',
    NOK: 'Norwegian Krone',
    OMR: 'Omani Rial',
    PKR: 'Pakistani Rupee',
    PAB: 'Panamanian Balboa',
    PGK: 'Papua New Guinean Kina',
    PYG: 'Paraguayan Guarani',
    PEN: 'Peruvian Nuevo Sol',
    PHP: 'Philippine Peso',
    PLN: 'Polish Zloty',
    QAR: 'Qatari Rial',
    RON: 'Romanian Leu',
    RUB: 'Russian Ruble',
    RWF: 'Rwandan Franc',
    SVC: 'Salvadoran ColÃ³n',
    WST: 'Samoan Tala',
    SAR: 'Saudi Riyal',
    RSD: 'Serbian Dinar',
    SCR: 'Seychellois Rupee',
    SLL: 'Sierra Leonean Leone',
    SGD: 'Singapore Dollar',
    SKK: 'Slovak Koruna',
    SBD: 'Solomon Islands Dollar',
    SOS: 'Somali Shilling',
    ZAR: 'South African Rand',
    KRW: 'South Korean Won',
    XDR: 'Special Drawing Rights',
    LKR: 'Sri Lankan Rupee',
    SHP: 'St. Helena Pound',
    SDG: 'Sudanese Pound',
    SRD: 'Surinamese Dollar',
    SZL: 'Swazi Lilangeni',
    SEK: 'Swedish Krona',
    CHF: 'Swiss Franc',
    SYP: 'Syrian Pound',
    STD: 'São Tomé and Príncipe Dobra',
    TJS: 'Tajikistani Somoni',
    TZS: 'Tanzanian Shilling',
    THB: 'Thai Baht',
    TOP: `Tongan Pa'anga`,
    TTD: 'Trinidad & Tobago Dollar',
    TND: 'Tunisian Dinar',
    TRY: 'Turkish Lira',
    TMT: 'Turkmenistani Manat',
    UGX: 'Ugandan Shilling',
    UAH: 'Ukrainian Hryvnia',
    AED: 'United Arab Emirates Dirham',
    UYU: 'Uruguayan Peso',
    USD: 'US Dollar',
    UZS: 'Uzbekistan Som',
    VUV: 'Vanuatu Vatu',
    VEF: 'Venezuelan BolÃvar',
    VND: 'Vietnamese Dong',
    YER: 'Yemeni Rial',
    ZMK: 'Zambian Kwacha'
  }
}

const currencySlice = createSlice({
  name: 'currency',
  initialState: initialCurrencyState,
  reducers: {
    setState(state: initialCurrencyStateType, action: PayloadAction<allRatesType>) {
      state.allRates = action.payload
      state.headerRate.EUR = numberRound(action.payload.UAH)
      state.headerRate.USD = numberRound(action.payload.UAH / action.payload.USD)
      state.firstField.fullName = state.allCurrencyFullName[state.firstField.name as keyof allCurrencyNamesType]
      state.secondField.fullName = state.allCurrencyFullName[state.secondField.name as keyof allCurrencyNamesType]
      state.firstField.exchangeRate = action.payload[state.firstField.name]
      state.secondField.exchangeRate = action.payload[state.secondField.name]
      state.allCurrencyNames = (Object.keys(action.payload) as allNamesType)
    },
    setFieldName(state: initialCurrencyStateType, action: PayloadAction<keyof allRatesType>) {
      if (state.isFirstFieldChanged) {
        state.firstField.name = action.payload
        state.firstField.fullName = state.allCurrencyFullName[action.payload as keyof allCurrencyNamesType]
        state.firstField.exchangeRate = state.allRates[action.payload]
      } else {
        state.secondField.name = action.payload
        state.secondField.fullName = state.allCurrencyFullName[action.payload as keyof allCurrencyNamesType]
        state.secondField.exchangeRate = state.allRates[action.payload]
      }
      state.firstField.amount = ''
      state.secondField.amount = ''
    },
    setFieldAmount(state: initialCurrencyStateType, action: PayloadAction<number>) {
      if (state.isFirstFieldChanged) {
        state.firstField.amount = action.payload
        state.secondField.amount = (state.secondField.exchangeRate / state.firstField.exchangeRate * state.firstField.amount)
      } else {
        state.secondField.amount = action.payload
        state.firstField.amount = (state.firstField.exchangeRate / state.secondField.exchangeRate  * state.secondField.amount)
      }
      if (action.payload === 0) {
        state.firstField.amount = ''
        state.secondField.amount = ''
      }
    },
    setisFirstFieldChanged(state: initialCurrencyStateType, action: PayloadAction<boolean>) {
      state.isFirstFieldChanged = action.payload
    },
    setLoading(state: initialCurrencyStateType, action: PayloadAction<boolean>) {
      state.isLoading = action.payload
    }
  },
})

export const {
  setState,
  setLoading,
  setFieldName,
  setisFirstFieldChanged,
  setFieldAmount
} = currencySlice.actions
export default currencySlice.reducer

type allNamesType = Array<keyof allRatesType>

export type initialCurrencyStateType = {
  allRates: allRatesType
  allCurrencyNames: allNamesType
  headerRate: CurrencyAllRatesResponseHeader
  firstField: {
    fullName: string
    name: keyof allRatesType
    amount: number | ''
    exchangeRate: number
  },
  secondField: {
    fullName: string
    name: keyof allRatesType
    amount: number | ''
    exchangeRate: number
  },
  isFirstFieldChanged: boolean
  isLoading: boolean
  allCurrencyFullName: allCurrencyNamesType
}

export type allCurrencyNamesType = {
  AFA: 'Afghan Afghani'
  'ALL': 'Albanian Lek'
  'DZD': 'Algerian Dinar'
  'AOA': 'Angolan Kwanza'
  'ARS': 'Argentine Peso'
  'AMD': 'Armenian Dram'
  'AWG': 'Aruban Florin'
  'AUD': 'Australian Dollar'
  'AZN': 'Azerbaijani Manat'
  'BSD': 'Bahamian Dollar'
  'BHD': 'Bahraini Dinar'
  'BDT': 'Bangladeshi Taka'
  'BBD': 'Barbadian Dollar'
  'BYR': 'Belarusian Ruble'
  'BEF': 'Belgian Franc'
  'BZD': 'Belize Dollar'
  'BMD': 'Bermudan Dollar'
  'BTN': 'Bhutanese Ngultrum'
  'BTC': 'Bitcoin'
  'BOB': 'Bolivian Boliviano'
  'BAM': 'Bosnia-Herzegovina Convertible Mark'
  'BWP': 'Botswanan Pula'
  'BRL': 'Brazilian Real'
  'GBP': 'British Pound Sterling'
  'BND': 'Brunei Dollar'
  'BGN': 'Bulgarian Lev'
  'BIF': 'Burundian Franc'
  'KHR': 'Cambodian Riel'
  'CAD': 'Canadian Dollar'
  'CVE': 'Cape Verdean Escudo'
  'KYD': 'Cayman Islands Dollar'
  'XOF': 'CFA Franc BCEAO'
  'XAF': 'CFA Franc BEAC'
  'XPF': 'CFP Franc'
  'CLP': 'Chilean Peso'
  'CNY': 'Chinese Yuan'
  'COP': 'Colombian Peso'
  'KMF': 'Comorian Franc'
  'CDF': 'Congolese Franc'
  'CRC': 'Costa Rican ColÃ³n'
  'HRK': 'Croatian Kuna'
  'CUC': 'Cuban Convertible Peso'
  'CZK': 'Czech Republic Koruna'
  'DKK': 'Danish Krone'
  'DJF': 'Djiboutian Franc'
  'DOP': 'Dominican Peso'
  'XCD': 'East Caribbean Dollar'
  'EGP': 'Egyptian Pound'
  'ERN': 'Eritrean Nakfa'
  'EEK': 'Estonian Kroon'
  'ETB': 'Ethiopian Birr'
  'EUR': 'Euro'
  'FKP': 'Falkland Islands Pound'
  'FJD': 'Fijian Dollar'
  'GMD': 'Gambian Dalasi'
  'GEL': 'Georgian Lari'
  'DEM': 'German Mark'
  'GHS': 'Ghanaian Cedi'
  'GIP': 'Gibraltar Pound'
  'GRD': 'Greek Drachma'
  'GTQ': 'Guatemalan Quetzal'
  'GNF': 'Guinean Franc'
  'GYD': 'Guyanaese Dollar'
  'HTG': 'Haitian Gourde'
  'HNL': 'Honduran Lempira'
  'HKD': 'Hong Kong Dollar'
  'HUF': 'Hungarian Forint'
  'ISK': 'Icelandic KrÃ³na'
  'INR': 'Indian Rupee'
  'IDR': 'Indonesian Rupiah'
  'IRR': 'Iranian Rial'
  'IQD': 'Iraqi Dinar'
  'ILS': 'Israeli New Sheqel'
  'ITL': 'Italian Lira'
  'JMD': 'Jamaican Dollar'
  'JPY': 'Japanese Yen'
  'JOD': 'Jordanian Dinar'
  'KZT': 'Kazakhstani Tenge'
  'KES': 'Kenyan Shilling'
  'KWD': 'Kuwaiti Dinar'
  'KGS': 'Kyrgystani Som'
  'LAK': 'Laotian Kip'
  'LVL': 'Latvian Lats'
  'LBP': 'Lebanese Pound'
  'LSL': 'Lesotho Loti'
  'LRD': 'Liberian Dollar'
  'LYD': 'Libyan Dinar'
  'LTL': 'Lithuanian Litas'
  'MOP': 'Macanese Pataca'
  'MKD': 'Macedonian Denar'
  'MGA': 'Malagasy Ariary'
  'MWK': 'Malawian Kwacha'
  'MYR': 'Malaysian Ringgit'
  'MVR': 'Maldivian Rufiyaa'
  'MRO': 'Mauritanian Ouguiya'
  'MUR': 'Mauritian Rupee'
  'MXN': 'Mexican Peso'
  'MDL': 'Moldovan Leu'
  'MNT': 'Mongolian Tugrik'
  'MAD': 'Moroccan Dirham'
  'MZM': 'Mozambican Metical'
  'MMK': 'Myanmar Kyat'
  'NAD': 'Namibian Dollar'
  'NPR': 'Nepalese Rupee'
  'ANG': 'Netherlands Antillean Guilder'
  'TWD': 'New Taiwan Dollar'
  'NZD': 'New Zealand Dollar'
  'NIO': 'Nicaraguan CÃ³rdoba'
  'NGN': 'Nigerian Naira'
  'KPW': 'North Korean Won'
  'NOK': 'Norwegian Krone'
  'OMR': 'Omani Rial'
  'PKR': 'Pakistani Rupee'
  'PAB': 'Panamanian Balboa'
  'PGK': 'Papua New Guinean Kina'
  'PYG': 'Paraguayan Guarani'
  'PEN': 'Peruvian Nuevo Sol'
  'PHP': 'Philippine Peso'
  'PLN': 'Polish Zloty'
  'QAR': 'Qatari Rial'
  'RON': 'Romanian Leu'
  'RUB': 'Russian Ruble'
  'RWF': 'Rwandan Franc'
  'SVC': 'Salvadoran ColÃ³n'
  'WST': 'Samoan Tala'
  'SAR': 'Saudi Riyal'
  'RSD': 'Serbian Dinar'
  'SCR': 'Seychellois Rupee'
  'SLL': 'Sierra Leonean Leone'
  'SGD': 'Singapore Dollar'
  'SKK': 'Slovak Koruna'
  'SBD': 'Solomon Islands Dollar'
  'SOS': 'Somali Shilling'
  'ZAR': 'South African Rand'
  'KRW': 'South Korean Won'
  'XDR': 'Special Drawing Rights'
  'LKR': 'Sri Lankan Rupee'
  'SHP': 'St. Helena Pound'
  'SDG': 'Sudanese Pound'
  'SRD': 'Surinamese Dollar'
  'SZL': 'Swazi Lilangeni'
  'SEK': 'Swedish Krona'
  'CHF': 'Swiss Franc'
  'SYP': 'Syrian Pound'
  'STD': 'São Tomé and Príncipe Dobra'
  'TJS': 'Tajikistani Somoni'
  'TZS': 'Tanzanian Shilling'
  'THB': 'Thai Baht'
  'TOP': `Tongan Pa'anga`
  'TTD': 'Trinidad & Tobago Dollar'
  'TND': 'Tunisian Dinar'
  'TRY': 'Turkish Lira'
  'TMT': 'Turkmenistani Manat'
  'UGX': 'Ugandan Shilling'
  'UAH': 'Ukrainian Hryvnia'
  'AED': 'United Arab Emirates Dirham'
  'UYU': 'Uruguayan Peso'
  'USD': 'US Dollar'
  'UZS': 'Uzbekistan Som'
  'VUV': 'Vanuatu Vatu'
  'VEF': 'Venezuelan BolÃvar'
  'VND': 'Vietnamese Dong'
  'YER': 'Yemeni Rial'
  'ZMK': 'Zambian Kwacha'
}

