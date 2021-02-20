import axios from 'axios';
import React, { useReducer } from 'react';
import {JSON_API} from '../helpers/Constants'

export const adminContext = React.createContext()

const INIT_STATE = {
    products: [],
    productToEdit: null
}

const reducer = (state=INIT_STATE, action) => {
    switch(action.type){
        case "GET_PRODUCTS":
            return {...state, products: action.payload}
        case "GET_PRODUCT_TO_EDIT":
            return {...state, productToEdit: action.payload}
        default:
            return state
    }

}

const AdminContextProvider = ({children}) => {

    const [state, dispatch] = useReducer( reducer, INIT_STATE )

    const getProducts = async () => {
        const {data} = await axios(`${JSON_API}/products`)
        dispatch({
            type: "GET_PRODUCTS",
            payload: data
        })
    }

    async function addProduct(newProduct){
        await axios.post(`${JSON_API}/products`, newProduct)
        getProducts()
    }

    const delProduct = async (id) => {
        await axios.delete(`${JSON_API}/products/${id}`)
        getProducts()
    }

    const getProductToEdit = async (id) => {
        const {data} = await axios(`${JSON_API}/products/${id}`)
        dispatch({
            type: "GET_PRODUCT_TO_EDIT",
            payload: data
        })
    }

    const saveEditedProduct = async (editedProduct, history) => {
        await axios.patch(`${JSON_API}/products/${editedProduct.id}`, editedProduct)
        history.push('/admin')
        getProducts()
    }

    // Проверка на админ
    function checkOnAdmin(admin, history){
        if(admin.login === "test" && admin.password === "test"){
            localStorage.setItem("login", JSON.stringify(admin))
            history.push('/admin')
        }
        else{
            history.push('/')
        }
    }

    return (
        <adminContext.Provider value={{
            products: state.products,
            productToEdit: state.productToEdit,
            getProducts,
            addProduct,
            delProduct,
            getProductToEdit,
            saveEditedProduct,
            checkOnAdmin
        }}>
            {children}
        </adminContext.Provider>
    );
};

export default AdminContextProvider;