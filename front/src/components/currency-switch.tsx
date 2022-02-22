import React, {useState} from "react";
import {Currency} from "../models/currency.type";
import CurrencyService from "../services/currency.service";

function CurrencySwitch(props: { changeCurrency: () => void; }) {
    const [ currency, setCurrency ] = useState<Currency>(JSON.parse(localStorage.getItem('currentCurrency')!!));

    const currencies: Array<Currency> = JSON.parse(localStorage.getItem('currencies')!!).currencies;
    const onChangeCurrency = (e: { target: { value: string; }; }) => {
        setCurrency(currencies.filter(currency => currency.id === e.target.value)[0]);
        CurrencyService.setCurrentCurrency(currencies.filter(currency => currency.id === e.target.value)[0]);
        props.changeCurrency();
    }
    return (
        <select
            value={currency.id}
            className="float-right ml-4 border border-2 border-teal-900 ml-auto bg-teal-700 text-white rounded p-2"
            onChange={onChangeCurrency}>
            {currencies.map((c, index) =>
                <option key={index} value={c.id}>
                    {c.id}
                </option>
            )}
        </select>
    );
}
export default CurrencySwitch;
