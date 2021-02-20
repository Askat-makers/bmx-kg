import React, { useContext, useEffect } from 'react';
import { Container } from 'react-bootstrap';
import { productsContext } from '../../contexts/ProductsContext';
import Navibar from '../Navibar/Navibar';
import '../Favorites/Favorites.css'
import BottomBasket from '../Bottombasket/BottomBasket';
import Footer from '../Footer/Footer';

const Favorites = () => {

    const { favoritesData, getFavorites, addAndDeleteProductInCart, checkProductInCart } = useContext(productsContext)

    useEffect(() => {
        getFavorites()
    }, [])
    

    return (
        <>
            <Navibar />
            {!favoritesData ? (
                <>
                    <div style={{ display: 'flex', justifyContent: "center" }}>
                        <div style={{ height: "200px" }}>

                        </div>
                        <div style={{ textAlign: 'start', marginTop: "20px" }}>
                            <h5 style={{ color: "gray" }}>Список ваших избранных пуст</h5>
                        </div>
                    </div>
                </>
            ) : (
                    favoritesData.totalPrice ?
                        <div>
                            <Container>
                                <div    >
                                    {favoritesData.products.map((item) => (
                                        <div key={item.product.id} style={{ display: "flex", padding: "3%", borderBottom: "1px solid rgba(173, 170, 170, 0.747)" }} className="favorite-cards">
                                            <img className="favorite-img" style={{ width: "25%", borderRadius: "2%" }} src={item.product.image} alt="" />
                                            <div className="favorite-description" style={{ display: "flex", flexDirection: "column", alignItems: "start", marginLeft: "30px" }}>
                                                <h5>{item.product.name}</h5>
                                                <p>Описание: {item.product.description}</p>
                                                <p>Цена: {item.product.price} сом</p>
                                                {checkProductInCart(item.product.id) ?
                                                    (
                                                        <button style={{ backgroundColor: "#1976d2", borderColor: '#1976d2', color: '#fff' }} onClick={() => addAndDeleteProductInCart(item.product)}>В корзине</button>
                                                    ) :
                                                    (
                                                        <button style={{ backgroundColor: "#ff6410", borderColor: '#ff6410', color: '#fff' }} onClick={() => addAndDeleteProductInCart(item.product)}>В корзину</button>
                                                    )}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </Container>
                        </div>
                        :
                        <>
                            <div style={{ display: 'flex', justifyContent: "center" }}>
                                <div style={{ height: "200px" }}>

                                </div>
                                <div style={{ textAlign: 'start', marginTop: "20px" }}>
                                    <h5 style={{ color: "gray" }}>Список ваших избранных пуст</h5>
                                </div>
                            </div>
                        </>
                )}
            <Footer />
            <BottomBasket />
        </>
    );
};

export default Favorites;