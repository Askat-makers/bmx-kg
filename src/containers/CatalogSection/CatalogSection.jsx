import React from 'react';
import { Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './CatalogSection.css'

const CatalogSection = () => {
    return (
        <div className="catalog-section">
            <Container>
                <div className="catalog-secrtion-container">
                    <div className="block_go-catalog">
                        <Link to="/catalog">
                            <button className="btn_go-catalog">Перейти в каталог</button>
                        </Link>
                    </div>
                    <div className="catalog">
                        <div>
                            <Link to="/bmx">
                                <div className="card-in-catalog-home-page promo-card-product">
                                    <div className="photo-in-promo-catalog photo-in-catalog-of-bmx">

                                    </div>
                                    <h5>BMX Велосипеды</h5>
                                </div>
                            </Link>
                        </div>
                        <div>
                            <Link to="/samokats">
                                <div className="card-in-catalog-home-page promo-card-product">
                                    <div className="photo-in-promo-catalog photo-in-catalog-of-kick-scooter">

                                    </div>
                                    <h5>Трюковые самокаты</h5>
                                </div>
                            </Link>
                        </div>
                        <div>
                            <Link to="/skate">
                                <div className="card-in-catalog-home-page promo-card-product">
                                    <div className="photo-in-promo-catalog photo-in-catalog-of-mtb">

                                    </div>
                                    <h5>Скейтборды</h5>
                                </div>
                            </Link>
                        </div>
                        <div>
                            <Link to="/roller">
                                <div className="card-in-catalog-home-page promo-card-product">
                                    <div className="photo-in-promo-catalog photo-in-catalog-of-rollers">

                                    </div>
                                    <h5>Ролики</h5>
                                </div>
                            </Link>
                        </div>
                    </div>
                </div>
            </Container>
        </div>
    );
};

export default CatalogSection;