import {useEffect, useState} from "react";
import {Link, useLocation, useParams} from "react-router-dom";
import {Product} from "../../models/product.type";
import ProductService from "../../services/product.service";
import {Category} from "../../models/category.type";
import CategoryService from "../../services/category.service";
import Spinner from "../spinner";
import {DeleteProduct} from "./delete-product";
import {BsFillPencilFill} from "react-icons/bs";
import CurrencySwitch from "../currency-switch";
import currencyService from "../../services/currency.service";
import {Currency} from "../../models/currency.type";
import CurrencyService from "../../services/currency.service";

function ProductsList() {
    const [products, setProducts] = useState<Array<Product>>([]);
    const [selectedCategory, setSelectedCategory] = useState<Category>();
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [currentCurrency, setCurrentCurrency] = useState<Currency>();
    const {id} = useParams();
    const location = useLocation();
    let categoryId: number;
    if (typeof id === "string") {
        categoryId = parseInt(id);
    }
    useEffect(() => {
        if (!categoryId) {
            retrieveProducts();
        } else {
            const categories = location.state as Array<Category>;
            if (categories && categories.length) {
                setSelectedCategory(categories.find(category => category.id === categoryId));
            } else {
                retrieveSelectedCategory();
            }
            retrieveProductsByCategory();
        }
    }, []);

    const retrieveSelectedCategory = () => {
        CategoryService.get(categoryId).then((res) => setSelectedCategory(res.data));
    }
    const retrieveProducts = () => {
        ProductService.getAll()
            .then((response: any) => {
                setProducts(response.data);
                setIsLoading(false);
            })
            .catch((e: Error) => {
                console.log(e);
            });
    }
    const changeCurrency= () => {
        setCurrentCurrency(CurrencyService.getCurrentCurrency());
    }

    const retrieveProductsByCategory = () => {
        ProductService.getByCategory(categoryId)
            .then((response: any) => {
                setProducts(response.data);
                setIsLoading(false);
            })
            .catch((e: Error) => {
                console.log(e);
            });
    }


    return (
       isLoading? <Spinner/> : (
           <div className="p-16">
                <div className="flex mb-8">
                    <span className="mt-auto mb-auto">Currency :</span>
               <CurrencySwitch  changeCurrency={changeCurrency}/>
                </div>
               <Link
                   to={{pathname: "/addProduct"}}
               ><button
                   className="fixed right-4 bottom-4 p-0 w-16 h-16 bg-green-600 rounded-full hover:bg-green-700 active:shadow-lg mouse shadow-lg transition ease-in duration-200 focus:outline-none">
                   <svg viewBox="0 0 20 20" enableBackground="new 0 0 20 20" className="w-6 h-6 inline-block">
                       <path fill="#FFFFFF" d="M16,10c0,0.553-0.048,1-0.601,1H11v4.399C11,15.951,10.553,16,10,16c-0.553,0-1-0.049-1-0.601V11H4.601
                                    C4.049,11,4,10.553,4,10c0-0.553,0.049-1,0.601-1H9V4.601C9,4.048,9.447,4,10,4c0.553,0,1,0.048,1,0.601V9h4.399
                                    C15.952,9,16,9.447,16,10z"/>
                   </svg>
               </button>
               </Link>
            <div className="col-md-6">
                <div className="flex">
                <h1 className="text-2xl mb-6">Category : <b>{selectedCategory ? selectedCategory.label : 'All'}</b></h1>
                <Link to={{pathname: "/"}} className=" ml-auto bg-teal-700 rounded p-2 pl-4 pr-4 mb-6 hover:bg-teal-600 transition ease-in duration-200">

                        <h1 className="text-2xl">Back</h1>
                </Link>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {products &&
                        products.map((product: Product, index: number) => (
                            <div key={index}
                                 className="p-6 max-w-sm bg-white rounded-lg border flex flex-col border-gray-200 shadow-md">
                                <h5 className="text-2xl font-bold tracking-tight text-gray-900">
                                    {product.label}
                                </h5>
                                <p className="mt-auto mb-3 mb-auto ml-2 font-light italic text-gray-700">
                                    - {product.category.label}
                                </p>
                                <p className="mb-3 font-normal text-gray-700">
                                    {product.description}
                                </p>
                                <p className="mb-3 font-bold text-emerald-800 mt-auto">
                                    {(product.price*currencyService.getCurrentCurrency().rate).toFixed(2)} {currencyService.getCurrentCurrency().id}
                                </p>
                                <div className="inline-flex w-full">
                                    <Link to="/addProduct" state={product}>
                                    <button
                                        className="ml-auto py-2 px-3 text-sm font-medium text-center text-white bg-teal-700 rounded-lg hover:bg-teal-600">
                                        <BsFillPencilFill/>

                                    </button>
                                    </Link>
                                    <DeleteProduct id={product.id!!}  refreshList={retrieveProductsByCategory}/>
                                </div>

                            </div>
                        ))}
                </div>

            </div>

        </div>)
    );
}

export default ProductsList;
