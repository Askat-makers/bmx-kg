import React, { useContext, useEffect, useState } from 'react';
// import './BmxPage.css'
import { productsContext } from '../../contexts/ProductsContext';
import Navibar from '../Navibar/Navibar'
import { Card } from 'react-bootstrap';
import CartBefore from '../../img/cartBefore.png'
import CartAfter from '../../img/cartAfter.png'
import StarBefore from '../../img/starBefore.png'
import StarAfter from '../../img/starAfter.png'
import { Link, useHistory } from 'react-router-dom';
import Pagintaion from '../Pagination/Pagintaion';
import Footer from '../Footer/Footer';
import BottomBasket from '../Bottombasket/BottomBasket';

const RollerPage = (props) => {
    const {
        getRollers,
        currentPosts,
        addAndDeleteProductInCart,
        checkProductInCart,
        addAndDeleteProductInFavorites,
        checkProductInFavorites
    } = useContext(productsContext)
    useEffect(() => {
        getRollers()
    }, [])

    const history = useHistory();
    const search = new URLSearchParams(history.location.search)

    const [value, setValue] = useState('')
    const [colorValue, setColorValue] = useState('')
    const [yearValue, setYearValue] = useState('')
    const [priceValue, setPriceValue] = useState('')
    function resetFilter() {
        props.history.push('/roller')
        setValue('')
        setColorValue('')
        setYearValue('')
        setPriceValue('')
        getRollers()
    }

    function fetchParams(params, value) {
        if (value === "all") {
            props.history.push('/fboard')
            props.history.push(props.location.pathname.replace(params))
            getRollers()
            return
        }
        let search = new URLSearchParams(props.history.location.search)
        search.set(params, value)
        let url = `${props.location.pathname}?${search.toString()}`
        props.history.push(url)
        getRollers()
        setColorValue(search.get("color"))
        setYearValue(search.get("year"))
        setPriceValue(search.get("price"))
    }


    useEffect(() => {
        setColorValue(search.get("color"))
        setYearValue(search.get("year"))
        setPriceValue(search.get("price"))
    }, [])


    return (
        <>
            <Navibar />
            <div style={{ backgroundColor: "#f9f9fa", paddingBottom: "30px" }}>
                <div className="container-bmx-list">
                    <div>
                        <div style={{ display: "flex", justifyContent: "center" }}>
                            <div className="parametr-block">
                                <p className="parametr-title">Живой поиск</p>
                                <input value={value} type="text" onChange=
                                    {function handle(e) { fetchParams("q", e.target.value); setValue(e.target.value) }} />
                            </div>
                        </div>
                        <div className="bmx-products-list">
                            <div className="parametr-block">
                                <p className="parametr-title">Цвета</p>
                                <select value={colorValue} name="color" id="" onChange={(e) => fetchParams("color", e.target.value)}>
                                    <option value="">Выберите цвет</option>
                                    <option value="black">Черный</option>
                                    <option value="white">Белый</option>
                                    <option value="blue">Синий</option>
                                    <option value="purple">Фиолетовый</option>
                                    <option value="gray">Серый</option>
                                    <option value="blue">Синий</option>
                                    <option value="green">Зеленый</option>
                                </select>
                            </div>
                            <div className="parametr-block">
                                <p className="parametr-title">Год</p>
                                <select value={yearValue} name="" id="" onChange={(e) => fetchParams("year", e.target.value)}>
                                    <option value="">Выберите год</option>
                                    <option value="2017">2017</option>
                                    <option value="2018">2018</option>
                                    <option value="2019">2019</option>
                                    <option value="2020">2020</option>
                                    <option value="2021">2021</option>
                                </select>
                            </div>
                            <div className="parametr-block parametr-price">
                                <p className="parametr-title">Цена</p>
                                <select value={priceValue} name="" id="" onChange={(e) => fetchParams("price_lte", e.target.value)}>
                                    <option value="">Выберите цену</option>
                                    <option value="3000">до 3000 сом</option>
                                    <option value="5000">до 5000 сом</option>
                                    <option value="8000">до 8000 сом</option>
                                    <option value="10000">до 10000 сом</option>
                                    <option value="13000">до 13000 сом</option>
                                    <option value="15000">до 15000 сом</option>
                                    <option value="18000">до 18000 сом</option>
                                    <option value="20000">до 20000 сом</option>
                                    <option value="23000">до 23000 сом</option>
                                    <option value="25000">до 25000 сом</option>
                                    <option value="27000">до 27000 сом</option>
                                    <option value="30000">до 30000 сом</option>
                                    <option value="33000">до 33000 сом</option>
                                    <option value="35000">до 35000 сом</option>
                                    <option value="37000">до 37000 сом</option>
                                    <option value="40000">до 40000 сом</option>
                                    <option value="45000">до 45000 сом</option>
                                    <option value="50000">до 50000 сом</option>
                                </select>
                            </div>
                            <div>
                                <button className="reset-filter" onClick={resetFilter}>Сбросить параметры</button>
                            </div>
                        </div>
                    </div>
                    <div>
                        <div className="products-block">
                            {currentPosts.map(item => (
                                <Card key={item.id} className="grow product-card" style={{ width: '18rem' }}>
                                    <Card.Img variant="top" src={item.image} />
                                    <Card.Body>
                                        <Link to={`/product-details${item.id}`}><Card.Title>{item.name}</Card.Title></Link>
                                        <div className="footer-block-product-card">
                                            <div>
                                                <p className="card-price"> Цена {item.price} <span style={{ textDecoration: 'underline' }}>c</span></p>
                                            </div>
                                            <div className="cart-favorite-block">
                                                <div>
                                                    {checkProductInCart(item.id) ?
                                                        (
                                                            <img onClick={() => addAndDeleteProductInCart(item)} src={CartAfter} style={{ cursor: 'pointer' }} alt="a"/>
                                                        ) :
                                                        (
                                                            <img onClick={() => addAndDeleteProductInCart(item)} src={CartBefore} style={{ cursor: 'pointer' }} alt="a"/>
                                                        )}
                                                </div>
                                                <div>
                                                    {checkProductInFavorites(item.id) ?
                                                        (
                                                            <img onClick={() => addAndDeleteProductInFavorites(item)} src={StarAfter} style={{ cursor: 'pointer' }} alt="a"/>
                                                        ) :
                                                        (
                                                            <img onClick={() => addAndDeleteProductInFavorites(item)} src={StarBefore} style={{ cursor: 'pointer' }} alt="a"/>
                                                        )}
                                                </div>
                                            </div>
                                        </div>
                                    </Card.Body>
                                </Card>
                            ))}
                        </div>
                        <Pagintaion />
                    </div>
                </div>
            </div>
            <Footer />
            <BottomBasket />
        </>
    );
};

export default RollerPage;