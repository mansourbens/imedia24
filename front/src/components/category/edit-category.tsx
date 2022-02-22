import React, {useState} from 'react';
import Modal from 'react-modal';
import CategoryService from "../../services/category.service";
import {BsFillPencilFill} from "react-icons/bs";
import {Category} from "../../models/category.type";
import {customModalStyles} from "../../utils/styles";

function EditCategory (props: { category: Category, refreshList: () => void; }) {
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [label, setLabel] = useState<string>(props.category.label);

    const onChangeLabel = (e: { target: { value: string; }; }) => {
        setLabel(e.target.value);
    }
    const setModalIsOpenToTrue =()=>{
        setModalIsOpen(true)
    }
    const setModalIsOpenToFalse =()=>{
        setModalIsOpen(false)
    }
    const submit = () => {
        CategoryService.update({
            label,
            id: props.category.id
        }, props.category.id!!).then(() => {
                setModalIsOpenToFalse();
                props.refreshList();
            }
        )
    }
    return(
        <div onClick={e => e.preventDefault()}>
            <button
                onClick={setModalIsOpenToTrue}
                className="float-right ml-2 py-2 px-3 text-sm font-medium text-center text-white bg-teal-700 rounded-lg hover:bg-teal-600">
                <BsFillPencilFill/>
            </button>
            <Modal
                style={customModalStyles}
                isOpen={modalIsOpen}>
                <button className="text-gray-800 float-right" onClick={setModalIsOpenToFalse}>x</button>
                <h2 className="text-2xl text-gray-700 mb-4">Edit category</h2>
                <input
                    type="text"
                    className="border border-2 border-teal-900 min-w-[50%] ml-auto bg-teal-700 text-white rounded p-2 mb-2"
                    id="label"
                    required
                    value={label}
                    onChange={onChangeLabel}
                    name="label"
                />
                <br/>
                <button
                    disabled={!label}
                    onClick={submit}
                    className={"float-right ml-auto py-2 px-3 text-sm font-medium text-center text-white  rounded-lg " +
                        (label ? "hover:bg-teal-600 bg-teal-700" : "bg-gray-500") }>
                    Submit
                </button>
            </Modal>
        </div>
    )
}

export default EditCategory
