import {Currency} from "../models/currency.type";
import httpFixer from "../utils/http-fixer";

class CurrencyService {
    readonly API_KEY = '030c8ebe1b80a3fe19e5470309694315';
    readonly SYMBOLS = 'USD,CAD,PLN,MAD';

    async getCurrencies(): Promise<Array<Currency>> {
        let currencies = [] as Array<Currency>;
        await httpFixer.get(`latest?access_key=${(this.API_KEY)}&symbols=${(this.SYMBOLS)}=&format=1`).then(
            (resp) => {
                currencies = Object.keys(resp.data.rates).map((key) => {
                    return {
                    id : key,
                    rate: resp.data.rates[key],
                    }
                });
            }
        );
        currencies.push({
            id: 'EUR',
            rate: 1
        })
        return currencies;
    }
    setCurrentCurrency(currency: Currency): void {
        localStorage.setItem('currentCurrency', JSON.stringify(currency));
    }
    getCurrentCurrency(): Currency {
        return localStorage.getItem('currentCurrency') ? JSON.parse(localStorage.getItem('currentCurrency')!!) :
            {
                id: 'EUR',
                rate: 1
            }
    }
}
export default new CurrencyService();
