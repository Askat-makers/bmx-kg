import axios from 'axios';
import React, { useEffect, useReducer, useState } from 'react';
import { JSON_API } from "../helpers/Constants";
import { calcSubPrice } from '../helpers/CalcPrice'
import { calcTotalPrice } from '../helpers/CalcPrice'

export const productsContext = React.createContext()

const INIT_STATE = {
    products: [],
    productsCountInCart: JSON.parse(localStorage.getItem('cart')) ? JSON.parse(localStorage.getItem('cart')).products.length : 0,
    cartData: {},
    userData: {},
    productsCountInFavorites: JSON.parse(localStorage.getItem('favorites')) ? JSON.parse(localStorage.getItem('favorites')).products.length : 0,
    favoritesData: {},
    productDetails: null
}

const reducer = (state = INIT_STATE, action) => {
    switch (action.type) {
        case "GET_PRODUCTS":
            return { ...state, products: action.payload }
        case "GET_LAST_PRODUCTS":
            return { ...state, products: action.payload }
        case "ADD_AND_DELETE_PRODUCT_IN_CART":
            return { ...state, productsCountInCart: action.payload }
        case "GET_CART":
            return { ...state, cartData: action.payload }
        case "SAVE_USER_DATA":
            return { ...state, userData: action.payload }
        case "ADD_AND_DELETE_PRODUCT_IN_FAVORITES":
            return { ...state, productsCountInFavorites: action.payload }
        case "GET_FAVORITES":
            return { ...state, favoritesData: action.payload }
        case "GET_DETAILS_OF_PRODUCT":
            return { ...state, productDetails: action.payload }
        case "CLEAR_CART":
            return {...state, products: [], productsCountInCart: 0}
        default :
            return {...state}
    }
}

const ProductsContextProvider = ({ children }) => {

    const [state, dispatch] = useReducer(reducer, INIT_STATE)

    // section start home page
    
    const getLastProducts = async () => {
        const { data } = await axios(`${JSON_API}/products`)
        dispatch({
            type: "GET_LAST_PRODUCTS",
            payload: data
        })
    }

    // section end home page

    // products list start

    const getBmx = async () => {
        const { data } = await axios(`${JSON_API}/products?category=bmx&${window.location.search.replace(/\?/, '')}`)
        dispatch({
            type: "GET_PRODUCTS",
            payload: data
        })
    }

    const getFboard = async () => {
        const { data } = await axios(`${JSON_API}/products?category=fboard&${window.location.search.replace(/\?/, '')}`)
        dispatch({
            type: "GET_PRODUCTS",
            payload: data
        })
    }

    const getSamokats = async () => {
        const { data } = await axios(`${JSON_API}/products?category=samokat&${window.location.search.replace(/\?/, '')}`)
        dispatch({
            type: "GET_PRODUCTS",
            payload: data
        })
    }

    const getSkateboards = async () => {
        const { data } = await axios(`${JSON_API}/products?category=skate&${window.location.search.replace(/\?/, '')}`)
        dispatch({
            type: "GET_PRODUCTS",
            payload: data
        })
    }

    const getRollers = async () => {
        const { data } = await axios(`${JSON_API}/products?category=roller&${window.location.search.replace(/\?/, '')}`)
        dispatch({
            type: "GET_PRODUCTS",
            payload: data
        })
    }

    // products list end

    //pagination start
    const [posts, setPosts] = useState([])
    const [currentPage, setCurrentPage] = useState(1)
    const [postsPerPage] = useState(6)

    useEffect(() => {
        const fetchPosts = async () => {
            const data = state.products
            setPosts(data)
        }
        fetchPosts()
    }, [state.products])


    const indexOfLastPost = currentPage * postsPerPage
    const indexOfFirstPost = indexOfLastPost - postsPerPage
    const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost)
    const totalPosts = posts.length

    const paginate = pageNumber => setCurrentPage(pageNumber)

    // pagination end

    //cart start
    function addAndDeleteProductInCart(product) {
        let cart = JSON.parse(localStorage.getItem("cart"))
        if (!cart) {
            cart = {
                products: [],
                totalPrice: 0
            }
        }

        let newProduct = {
            product: product,
            count: 1,
            subPrice: 0
        }
        newProduct.subPrice = calcSubPrice(newProduct)

        let newCart = cart.products.filter(item => item.product.id === product.id)
        if (newCart.length > 0) {
            cart.products = cart.products.filter(item => item.product.id !== product.id)
        }
        else {
            cart.products.push(newProduct)
        }

        cart.totalPrice = calcTotalPrice(cart.products)
        localStorage.setItem("cart", JSON.stringify(cart))
        dispatch({
            type: "ADD_AND_DELETE_PRODUCT_IN_CART",
            payload: cart.products.length
        })
    }

    function checkProductInCart(id) {
        let cart = JSON.parse(localStorage.getItem('cart'));
        if (!cart) {
            cart = {
                products: [],
                totalPrice: 0
            };
        }
        let newCart = cart.products.filter(item => item.product.id === id)
        return newCart.length > 0 ? true : false
    }

    function getCart() {
        let cart = JSON.parse(localStorage.getItem("cart"))
        dispatch({
            type: "GET_CART",
            payload: cart
        })
    }

    function changeCountProducts(count, id) {
        let cart = JSON.parse(localStorage.getItem('cart'))
        cart.products = cart.products.map(item => {
            if (item.product.id === id) {
                item.count = count
                item.subPrice = calcSubPrice(item)
            }
            return item
        })
        cart.totalPrice = calcTotalPrice(cart.products)
        localStorage.setItem('cart', JSON.stringify(cart))
        getCart()
    }

    function deleteProductInCart({ product }) {
        let cart = JSON.parse(localStorage.getItem("cart"))

        let newCart = cart.products.filter(item => item.product.id !== product.id)
        cart.products = newCart
        cart.totalPrice = calcTotalPrice(cart.products)
        localStorage.setItem("cart", JSON.stringify(cart))
        dispatch({
            type: "ADD_AND_DELETE_PRODUCT_IN_CART",
            payload: cart.products.length
        })
        getCart()
    }

    function clearCartAfterPay() {
        dispatch({
            type: "CLEAR_CART"
        })
    }

    async function saveOrderInHistory(order) {
        let id = JSON.parse(localStorage.getItem("user"))
        if(!id) return
        if(id){
            let a = new Date()
            let year = a.getFullYear()
            let month = a.getMonth()
            let day = a.getDay()
            let hours = a.getHours()
            let minutes = a.getMinutes()
            let seconds = a.getSeconds()
            const { data } = await axios(`${JSON_API}/users/${id}`)
            let obj = {
                ...order,
                date: {
                    year: year,
                    month: month,
                    day: day,
                    hours: hours,
                    minutes: minutes,
                    seconds: seconds
                },
                orderNumber: Date.now()
            }
            data.historyOrders.push(obj)
            await axios.patch(`${JSON_API}/users/${id}`, data)
            // clearCartAfterPay()
        }
    }
    //

    //start favorites

    function addAndDeleteProductInFavorites(product) {
        let favorites = JSON.parse(localStorage.getItem("favorites"))
        if (!favorites) {
            favorites = {
                products: [],
                totalPrice: 0
            }
        }

        let newProduct = {
            product: product,
            count: 1,
            subPrice: 0
        }

        newProduct.subPrice = calcSubPrice(newProduct)

        let newFavorites = favorites.products.filter(item => item.product.id === product.id)
        if (newFavorites.length > 0) {
            favorites.products = favorites.products.filter(item => item.product.id !== product.id)
        }
        else {
            favorites.products.push(newProduct)
        }

        favorites.totalPrice = calcTotalPrice(favorites.products)
        localStorage.setItem("favorites", JSON.stringify(favorites))
        dispatch({
            type: "ADD_AND_DELETE_PRODUCT_IN_FAVORITES",
            payload: favorites.products.length
        })
    }

    function checkProductInFavorites(id) {
        let favorites = JSON.parse(localStorage.getItem('favorites'));
        if (!favorites) {
            favorites = {
                products: []
            };
        }
        let newFavorites = favorites.products.filter(item => item.product.id === id)
        return newFavorites.length > 0 ? true : false
    }

    function getFavorites() {
        let favorites = JSON.parse(localStorage.getItem('favorites'))
        dispatch({
            type: "GET_FAVORITES",
            payload: favorites
        })
    }

    // favorites end

    // details of product start

    const getDetailsOfProduct = async (id) => {
        const { data } = await axios(`${JSON_API}/products/${id}`)
        dispatch({
            type: "GET_DETAILS_OF_PRODUCT",
            payload: data
        })
    }

    // details of product end

    //comments start

    async function sendComment(product, value) {
        product.comments.push(value)
        await axios.patch(`${JSON_API}/products/${product.id}`, product)
        getDetailsOfProduct(product.id)
    }

    const sendCommentAnswer = async (product, value, commentId) => {
        const { data } = await axios(`${JSON_API}/products/${product.id}`)
        data.comments.forEach(item => {
            if (item.id === commentId) {
                return item.answers.push(value)
            }
            return
        })
        await axios.patch(`${JSON_API}/products/${product.id}`, data)
        getDetailsOfProduct(product.id)
    }

    // comments end

    //likes start

    async function addAndDeleteLikes(product) {
        let likes = JSON.parse(localStorage.getItem("likes"))
        if (!likes) {
            likes = {
                products: []
            }
        }

        let newProduct = {
            product: product
        }

        let newLikes = likes.products.filter(item => item.product.id === product.id)
        if (newLikes.length > 0) {
            likes.products = likes.products.filter(item => item.product.id !== product.id)
            product.likes -= 1
            await axios.patch(`${JSON_API}/products/${product.id}`, product)
            getDetailsOfProduct(product.id)
        }
        else {
            likes.products.push(newProduct)
            product.likes += 1
            await axios.patch(`${JSON_API}/products/${product.id}`, product)
            getDetailsOfProduct(product.id)
        }
        localStorage.setItem("likes", JSON.stringify(likes))
    }


    function checkProductInLikes(id) {
        let likes = JSON.parse(localStorage.getItem('likes'));
        if (!likes) {
            likes = {
                products: []
            };
        }
        let newLikes = likes.products.filter(item => item.product.id === id)
        return newLikes.length > 0 ? true : false
    }

    //likes end


    return (
        <productsContext.Provider value={{
            products: state.products,
            postsPerPage: postsPerPage,
            totalPosts: totalPosts,
            currentPosts: currentPosts,
            productsCountInCart: state.productsCountInCart,
            cartData: state.cartData,
            productsCountInFavorites: state.productsCountInFavorites,
            favoritesData: state.favoritesData,
            productDetails: state.productDetails,
            paginate,
            getBmx,
            getFboard,
            getSamokats,
            getSkateboards,
            getRollers,
            addAndDeleteProductInCart,
            checkProductInCart,
            getCart,
            changeCountProducts,
            clearCartAfterPay,
            saveOrderInHistory,
            getLastProducts,
            addAndDeleteProductInFavorites,
            checkProductInFavorites,
            getFavorites,
            deleteProductInCart,
            getDetailsOfProduct,
            sendComment,
            sendCommentAnswer,
            addAndDeleteLikes,
            checkProductInLikes,
        }}>
            {children}
        </productsContext.Provider>
    );
};

export default ProductsContextProvider;