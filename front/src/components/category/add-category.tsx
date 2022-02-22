import React, {useState} from 'react';
import Modal from 'react-modal';
import CategoryService from "../../services/category.service";
import {customModalStyles} from "../../utils/styles";

function AddCategory (props: { refreshList: () => void; }) {

    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [label, setLabel] = useState<string>('');

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
        CategoryService.create({
            label
        }).then(() => {
            setModalIsOpenToFalse();
            props.refreshList();
            }
        )
   }
    return(
        <>
        <button
            onClick={setModalIsOpenToTrue}
            className="fixed right-4 bottom-4 p-0 w-16 h-16 bg-green-600 rounded-full hover:bg-green-700 active:shadow-lg mouse shadow-lg transition ease-in duration-200 focus:outline-none">
            <svg viewBox="0 0 20 20" enableBackground="new 0 0 20 20" className="w-6 h-6 inline-block">
                <path fill="#FFFFFF" d="M16,10c0,0.553-0.048,1-0.601,1H11v4.399C11,15.951,10.553,16,10,16c-0.553,0-1-0.049-1-0.601V11H4.601
                                    C4.049,11,4,10.553,4,10c0-0.553,0.049-1,0.601-1H9V4.601C9,4.048,9.447,4,10,4c0.553,0,1,0.048,1,0.601V9h4.399
                                    C15.952,9,16,9.447,16,10z"/>
            </svg>
        </button>
    <Modal
        style={customModalStyles}
        isOpen={modalIsOpen}>
        <button className="text-gray-800 float-right" onClick={setModalIsOpenToFalse}>x</button>
        <h2 className="text-2xl text-gray-700 mb-4">Add a new category</h2>
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
        </>
            )
}

export default AddCategory
