import {BsFillTrashFill} from "react-icons/bs";
import {useState} from "react";
import ProductService from "../../services/product.service";
import Modal from 'react-modal';
import {customModalStyles} from "../../utils/styles";

export function DeleteProduct(props: {id: number, refreshList: () => void}) {
    const [modalIsOpen, setModalIsOpen] = useState(false);


    const setModalIsOpenToTrue =(e: { stopPropagation: () => void; preventDefault: () => void; })=>{
        e.preventDefault();
        e.stopPropagation();
        setModalIsOpen(true)
    }
    const setModalIsOpenToFalse =()=>{
        setModalIsOpen(false)
    }
    const deleteProduct = () => {
        ProductService.delete(props.id).then(() => {
                setModalIsOpenToFalse();
                props.refreshList();
            }
        )
    }
    return (
        <>

            <button
                onClick={setModalIsOpenToTrue}
                className="ml-1 py-2 px-3 text-sm font-medium text-center text-white bg-red-900 rounded-lg hover:bg-red-800">
                <BsFillTrashFill/>
            </button>
            <Modal
                style={customModalStyles}
                isOpen={modalIsOpen}>
                <h2 className="text-gray-800 text-2xl mb-4">Are you sure you want to delete this product ?</h2>
                <button
                    onClick={deleteProduct}
                    className="float-right ml-1 py-2 px-3 text-sm font-medium text-center text-white bg-green-900 rounded-lg hover:bg-green-800">
                    Yes
                </button>
                <button
                    onClick={setModalIsOpenToFalse}
                    className="float-right  ml-1 py-2 px-3 text-sm font-medium text-center text-white bg-gray-900 rounded-lg hover:bg-gray-800">
                    Cancel
                </button>
            </Modal>
        </>
    )
}
