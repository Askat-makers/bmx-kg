import React from 'react';
import Navibar from '../Navibar/Navibar';
import './Catalog.css'
import { Link } from 'react-router-dom'
import BottomBasket from '../Bottombasket/BottomBasket';
import Footer from '../Footer/Footer';

const Catalog = () => {
    return (
        <>
            <Navibar />
            <div>
                <div className="container_catalog">
                    <div style={{ marginRight: "50px", marginLeft: "50px" }}>
                        <div className="catalog-title">
                            <h2>Каталог</h2>
                        </div>
                        <div className="block-card">
                            <div className="catalog-card-1">
                                <Link to="/bmx">
                                    <div>
                                        <div className="catalog-img bmx"></div>
                                        <h5>BMX</h5>
                                    </div>
                                </Link>
                            </div>
                            <div className="catalog-card-1">
                                <Link to="/fboard">
                                    <div>
                                        <div className="catalog-img mtb"><img src="https://opt-1637796.ssl.1c-bitrix-cdn.ru/upload/iblock/c54/c54ba830b6430ef8dc7a29d8151695e6.png?16030623303377" alt="" /></div>
                                        <h5>FBoard</h5>
                                    </div>
                                </Link>
                            </div>
                            <div className="catalog-card-1">
                                <Link to="/samokats">
                                    <div>
                                        <div className="catalog-img samokat"></div>
                                        <h5>Самокаты</h5>
                                    </div>
                                </Link>
                            </div>
                            <div className="catalog-card-1">
                                <Link to="/skate">
                                    <div>
                                        <div className="catalog-img skate"></div>
                                        <h5>Скейтборды</h5>
                                    </div>
                                </Link>
                            </div>
                            <div className="catalog-card-1">
                                <Link to="/roller">
                                    <div>
                                        <div className="catalog-img roller"></div>
                                        <h5>Ролики</h5>
                                    </div>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
            <BottomBasket />
        </>
    );
};

export default Catalog;