import {useEffect, useState} from "react";
import {Category} from "../../models/category.type";
import CategoryService from "../../services/category.service";
import {Link} from "react-router-dom";
import Spinner from "../spinner";
import AddCategory from "./add-category";
import {DeleteProduct} from "../product/delete-product";
import {DeleteCategory} from "./delete-category";
import EditCategory from "./edit-category";


function CategoriesList() {
    const [categories, setCategories] = useState<Array<Category>>([])
    const [loading, setLoading] = useState<boolean>(true)

    useEffect(() => {
        getCategories();
    }, []);

    const getCategories = () => {
        setLoading(true);
        CategoryService.getAll().then((response) => {
            setCategories(response.data);
            setLoading(false);
        });
    }


    return (
        loading ?
                <Spinner/>
            :
            (<div className="p-4">
                <AddCategory refreshList ={getCategories}/>
                <div>
                    <h1 className="mb-6">Categories : </h1>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        <Link
                            to={{
                                pathname: `/products/`,
                            }}
                            className="cursor-pointer hover:bg-slate-200 p-6 max-w-sm bg-white rounded shadow-sm shadow-teal-100 transition ease-in duration-100 ">
                            <h5 className="text-2xl font-bold tracking-tight text-gray-900">
                                All
                            </h5>
                        </Link>
                        {categories &&
                            categories.map((category: Category, index: number) => (
                                <Link key={index}
                                      to={{
                                          pathname: `/products/${category.id}`,
                                      }}
                                      state={categories}
                                      className="cursor-pointer hover:bg-slate-200 p-6 max-w-sm bg-white rounded shadow-sm shadow-teal-100 transition ease-in duration-100 ">
                                    <h5 className="text-2xl font-bold tracking-tight text-gray-900">
                                        {category.label}
                                    </h5>
                                    <EditCategory
                                        category={category}
                                        refreshList={getCategories}
                                        />
                                    <DeleteCategory
                                        id={category.id!!}  refreshList={getCategories}/>
                                </Link>
                            ))}
                    </div>

                </div>
            </div>)

    );

}

export default CategoriesList;
