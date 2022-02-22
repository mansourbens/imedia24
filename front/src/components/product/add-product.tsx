import React, {useEffect, useState} from "react";
import {Product} from "../../models/product.type";
import {useLocation, useNavigate} from "react-router-dom";
import ProductService from "../../services/product.service";
import {Category} from "../../models/category.type";
import CategoryService from "../../services/category.service";
import Spinner from "../spinner";
import {Currency} from "../../models/currency.type";
import CurrencyService from "../../services/currency.service";

function AddProduct() {
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [label, setLabel] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState(0.0);
    const [categories, setCategories] = useState<Array<Category>>([]);
    const [category, setCategory] = useState<Category>({} as Category);
    const [currency, setCurrency] = useState<Currency>({} as Currency);
    const [currencies, setCurrencies] = useState<Array<Currency>>([] as Array<Currency>);
    const navigate = useNavigate();
    const location = useLocation();
    const editedProduct = location.state as Product;
    useEffect(() => {
        setCurrency(CurrencyService.getCurrentCurrency());
        if (editedProduct) {
            setLabel(editedProduct.label);
            setDescription(editedProduct.description);
            setCategory(editedProduct.category);
            setPrice(parseFloat((editedProduct.price*CurrencyService.getCurrentCurrency().rate).toFixed(2)));
        }
        CurrencyService.getCurrencies().then((c) => {
            setCurrencies(c);
        });
        CategoryService.getAll().then(
            (resp) => {
                setCategories(resp.data);
                if (!editedProduct) {
                    setCategory(resp.data[0]);
                }
                setIsLoading(false);
            }
        )

    }, [])
    const onChangeLabel = (e: { target: { value: any; }; }) => {
        setLabel(e.target.value);
    }
    const onChangeDescription = (e: { target: { value: any; }; }) => {
        setDescription(e.target.value);
    }
    const onChangePrice = (e: { target: { value: any; }; }) => {
        setPrice(e.target.value);
    }
    const onChangeCategory = (e: { target: { value: any; }; }) => {
        setCategory(categories.filter(category => category.id === parseInt(e.target.value))[0]);
    }
    const onChangeCurrency = (e: { target: { value: any; }; }) => {
        setCurrency(currencies.filter(c => c.id === (e.target.value))[0]);
    }
    const saveProduct = async () => {
        if (!editedProduct) {
            console.log(currency);
            const product: Product = {
                label,
                description,
                price : price/currency.rate,
                category,
            };
            ProductService.create(product).then(() => {
                navigate(`/products/${category.id}`);
            });
        } else {
            const product: Product = {
                id : editedProduct.id,
                label,
                description,
                price : price/currency.rate,
                category,
            };
            ProductService.update(product, editedProduct.id!!).then(() => {
                navigate(`/products/${category.id}`);
            });
        }
    }
    return (
        isLoading ? <Spinner/>
            : (
                <div className="flex h-screen">
                    <div className="m-auto p-6 max-w-sm min-w-[40%] bg-white rounded-lg border border-gray-200 shadow-md">
                        <div className="text-gray-900 mb-4 flex min-w-fit">
                            <label htmlFor="label">Product Name</label>
                            <input
                                type="text"
                                className="border border-2 border-teal-900 min-w-[50%] ml-auto bg-teal-700 text-white rounded p-2"
                                id="label"
                                required
                                value={label}
                                onChange={onChangeLabel}
                                name="label"
                            />
                        </div>

                        <div className="text-gray-900 mb-4 flex">
                            <label htmlFor="description">Description</label>
                            <textarea
                                rows={4}
                                className="border border-2 border-teal-900 min-w-[50%] ml-auto bg-teal-700 text-white rounded p-2"
                                id="description"
                                maxLength={250}
                                required
                                value={description}
                                onChange={onChangeDescription}
                                name="description"
                            />
                        </div>
                        <div className="text-gray-900 mb-4 flex">
                            <label htmlFor="price">Price</label>
                            <input
                                type="text"
                                className="border min-w-fit border-2 border-teal-900 min-w-[50%] ml-auto bg-teal-700 text-white rounded p-2"
                                id="price"
                                required
                                value={price}
                                onChange={onChangePrice}
                                name="price"
                            />
                            <select
                                value={currency.id}
                                className="border border-2 border-teal-900 ml-2  bg-teal-700 text-white rounded p-2"
                                onChange={onChangeCurrency}>
                                {currencies.map((category, index) =>
                                    <option key={index} value={category.id}>
                                        {category.id}
                                    </option>
                                )}
                            </select>
                        </div>
                        <div className="text-gray-900 mb-4 flex">
                            <label htmlFor="Category">Category</label>
                            <select
                                value={category.id}
                                className="border border-2 border-teal-900 ml-auto  min-w-[50%] bg-teal-700 text-white rounded p-2"
                                onChange={onChangeCategory}>
                                {categories.map((category, index) =>
                                    <option key={index} value={category.id}>
                                        {category.label}
                                    </option>
                                )}
                            </select>
                        </div>
                        <button onClick={saveProduct}
                                className="float-right ml-auto py-2 px-3 text-sm font-medium text-center text-white bg-teal-700 rounded-lg hover:bg-teal-600">
                            Submit
                        </button>
                    </div>
                </div>
            ));
}

export default AddProduct;

