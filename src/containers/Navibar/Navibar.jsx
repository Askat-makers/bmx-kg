import React, { useEffect, useState } from 'react';
import './Navibar.css'
import { Nav, Navbar, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import logo from '../../img/logo.svg'
import logout from '../../img/logout.png'

const Navibar = () => {

    const [state, setState] = useState(false)
    let checkStatus = JSON.parse(localStorage.getItem("user"))
    useEffect(() => {
        if (checkStatus) setState(true)
    }, [])

    function logout1(){
        localStorage.setItem("user", JSON.stringify(0))
        setState(false)
    }

    return (
        <>
            <Navbar collapseOnSelect expand="lg" variant="dark" bg="dark">
                <Container>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse id="responsive-navbar-nav" className="justify-content-between">
                        <Nav>
                            <Nav>
                                <Link className="nav-link" to="/">
                                    Главная
                                </Link>
                            </Nav>
                            <Nav>
                                <Link className="nav-link" to="/bmx">
                                    BMX
                                </Link>
                            </Nav>
                            <Nav>
                                <Link className="nav-link" to="/skate">
                                    Скейтборды
                                </Link>
                            </Nav>
                            <Nav>
                                <Link className="nav-link" to="/samokats">
                                    Самокаты
                                </Link>
                            </Nav>
                        </Nav>
                        {state ?
                            (
                                <Nav>
                                    <Link to="/profile" className="nav-link" role="button">
                                        Профиль
                                    </Link>
                                    <Link to="" className="nav-link" role="button">
                                        <img onClick={logout1} src={logout} alt=""/>
                                    </Link>
                                </Nav>
                            )
                            :
                            (
                                <Nav>
                                    <Link to="/auth" className="nav-link" role="button">
                                        Вход
                                    </Link>
                                    <Link to="/registration" className="nav-link" role="button">
                                        Регистрация
                                    </Link>
                                </Nav>
                            )}
                    </Navbar.Collapse>
                </Container>
            </Navbar>
            <div>
                <div className="under-navbar-block">
                    <div className="under-navbar">
                        <div>
                            <Link to="/"><img className="navbar-img" src={logo} alt="" />Rider.Kg</Link>
                        </div>
                    </div>
                    <div className="search-block">
                        <Link to="/catalog">
                            <button className="btn_go-catalog navibar-btn">Каталог</button>
                        </Link>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Navibar;