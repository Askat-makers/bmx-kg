import React, { useContext, useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import { authContext } from '../../contexts/AuthContext';
import Footer from '../Footer/Footer';
import Navibar from '../Navibar/Navibar';

const Authorization = (props) => {
    const { users, authUser, getUsersData } = useContext(authContext)
    const [user, setUser] = useState({})

    useEffect(() => {
        getUsersData()
    }, [])

    function handleChange(e) {
        let obj = {
            ...user,
            [e.target.name]: e.target.value
        }
        setUser(obj)
    }


    function handleClick() {
        let regexp = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)
        let regexp2 = new RegExp(/(?=.{8,})/)
        let result = regexp.test(user.login)
        let result2 = regexp2.test(user.password)
        if (result2 && result) {
            let newArr = users.filter(item => (
                item.login === user.login && item.password === user.password
            ))
            newArr.length ? authUser(newArr[0].id, props.history) : alert("Не правильный пароль или почта")
        }
        if (!result && !result2) {
            return alert("Введите корректную почту и пароль должен быть больше восьми символов")
        }
        if (!result) {
            return alert("Введите корректную почту")
        }
        if (!result2) {
            return alert("Пароль должен быть больше восьми символов")
        }
    }


    return (
        <>
            <Navibar />
            <div className="register-page">
                <div className="register-block">
                    <div className="register-block-only">
                        <p className="register-title">Авторизация</p>
                        <div>
                            <p className="label-register">Email</p>
                            <input className="register-input" placeholder="Введите ваш email" required type="email" name="login" onChange={handleChange} />
                        </div>
                        <div>
                            <p className="label-register">Пароль</p>
                            <input className="register-input" placeholder="Введите пароль" required type="password" name="password" onChange={handleChange} />
                        </div>
                        <div style={{ display: 'flex', justifyContent: "center" }}>
                            <Button className="btn-register" onClick={handleClick}>Войти</Button>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
};

export default Authorization;