import './App.css';
import {createContext, useEffect, useState} from "react";
import {Route , Routes} from "react-router-dom";
import ProductsList from "./components/product/products-list";
import CategoriesList from "./components/category/categories-list";
import AddProduct from "./components/product/add-product";
import Spinner from "./components/spinner";
import CurrencyService from "./services/currency.service";
function App() {
const [isLoading, setIsLoading] = useState<boolean>(true);
    useEffect(() => {
        if (!localStorage.getItem('currentCurrency')) {
            localStorage.setItem('currentCurrency', JSON.stringify({
                id: 'EUR',
                rate: 1
            }))
        }
        if (!localStorage.getItem('currencies') || (Date.now() - (24 * 60 * 60 * 1000) >
            JSON.parse((localStorage.getItem('currencies')!!))?.timestamp)) {
            getCurrencies();
        } else {
            setIsLoading(false);
        }


    }, [])
    const getCurrencies = async() => {
        CurrencyService.getCurrencies().then(
            (currencies) => {
                localStorage.setItem('currencies', JSON.stringify({
                    currencies,
                    timestamp: Date.now()
                }));
                setIsLoading(false);
            }
        );
    }

    return (
            isLoading ? <Spinner/> :
            <div>
                <div>
                    <Routes>
                        <Route path="/" element={<CategoriesList/>} />
                        <Route path="/products/:id" element={<ProductsList/>} />

                        <Route path="/products/" element={

                            <ProductsList/>}
                               />

                        <Route path="/addProduct" element={<AddProduct/>} />
                    </Routes>
                </div>
            </div>
        );
}
export default App;
