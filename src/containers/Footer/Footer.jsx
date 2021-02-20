import React from 'react';
import './Footer.css'
import { Container } from 'react-bootstrap';

const Footer = () => {
    return (
        <Container>
            <div>
                <div className="footer-block">
                    <div>
                        <ul>
                            <p>Компания</p>
                            <li>О компании</li>
                            <li>Политика</li>
                            <li>Реквизиты</li>
                            <li>Контакты</li>
                        </ul>
                    </div>
                    <div>
                        <ul>
                            <p>Информация</p>
                            <li>Доставка</li>
                            <li>Оплата</li>
                            <li>Гарантия</li>
                            <li>Возврат</li>
                        </ul>
                    </div>
                    <div>
                        <ul>
                            <p>Помощь</p>
                            <li>Блог</li>
                            <li>Новости</li>
                            <li>Вопрос-ответ</li>
                            <li>Бренды</li>
                        </ul>
                    </div>
                    <div>
                        <ul>
                            <p>Наши контакты</p>
                            <li>+996(706)66-16-16</li>
                            <li>test@test.com</li>
                            <li>Доставка по КР</li>
                            <li>Только оригинал</li>
                        </ul>
                    </div>
                </div>
                <div>
                    <div></div>
                    <div></div>
                </div>
            </div>
        </Container>
    );
};

export default Footer;