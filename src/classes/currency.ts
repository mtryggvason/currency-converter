// @ts-ignore
import { getCurrencyList } from "country-currency-map";
import iso2ToCountry from '../data/iso2ToCountry.json';

import {RawCurrencyData} from '../types';

type genericDict = {
  [propName: string]: any;
};

const currencyList = getCurrencyList().reduce((state: Map<string, any>, item:genericDict)=> {
    state.set(item.abbr, item.name)
    return state;
}, new Map());

export default class Currency {
    currency: string;
    countryISO2?: string;
    countryFull?: string;
    nameI18N?: string;
    buy: number = 0;
    middle: number= 0;
    sell: number = 0;
    constructor(rawCurrency: RawCurrencyData) {
        this.currency = rawCurrency.currency;
        this.nameI18N = rawCurrency.nameI18N
        if( !this.nameI18N) {
            this.nameI18N = currencyList.get(rawCurrency.currency.toUpperCase());
        }
        //  Assuming this is the case: https://en.wikipedia.org/wiki/ISO_4217#National_currencies
        this.countryISO2 =  rawCurrency.currency.substr(0,2);

        // @ts-ignore
        this.countryFull = iso2ToCountry[this.countryISO2];

        if (rawCurrency.exchangeRate) {
            this.buy = rawCurrency.exchangeRate.buy;
            this.middle = rawCurrency.exchangeRate.middle;
            this.sell = rawCurrency.exchangeRate.middle;
        }
    }
}