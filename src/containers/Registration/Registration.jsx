import React, { useContext, useEffect, useState } from 'react';
import { authContext } from '../../contexts/AuthContext';
import './Registration.css'
import Navibar from '../Navibar/Navibar'
import Footer from '../Footer/Footer'
import { Button } from 'react-bootstrap';

const Registration = (props) => {
    const { users, getUsersData, registrNewUser } = useContext(authContext)
    const [newUser, setNewUser] = useState({})

    useEffect(() => {
        getUsersData()
    }, [])

    const handleInpChange = (e) => {
        let obj = {
            ...newUser,
            historyOrders: [],
            [e.target.name]: e.target.value
        }
        setNewUser(obj)
    }

    function handleClick() {
        let regexp = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)
        let regexp2 = new RegExp(/(?=.{8,})/)
        let result = regexp.test(newUser.login)
        let result2 = regexp2.test(newUser.password)
        if (result && result2) {
            let newArr = users.filter(item => item.login === newUser.login)
            return newArr.length ? alert("Аккаунт с таким email адресом уже существует") : registrNewUser(newUser, props.history)
        }
        if(!result && !result2 && !newUser.name){
            return alert("Заполните все поля")
        }
        if(!result && !result2){
            return alert("Введите корректную почту и пароль должен быть больше восьми символов")
        }
        if(!result){
            return alert("Введите корректную почту")
        }
        if(!result2){
            return alert("Пароль должен быть больше восьми символов")
        }
        if(!newUser.name){
            return alert("Введите ваше имя")
        }
    }

    return (
        <>
            <Navibar />
            <div className="register-page">
                <div className="register-block">
                    <div className="register-block-only">
                        <p className="register-title">Регистрация</p>
                        <div>
                            <p className="label-register">Email</p>
                            <input className="register-input" placeholder="Введите ваш email" required type="email" name="login" onChange={handleInpChange} />
                        </div>
                        <div>
                            <p className="label-register">Имя</p>
                            <input className="register-input" placeholder="Введите своё имя" required type="text" name="name" onChange={handleInpChange} />
                        </div>
                        <div>
                            <p className="label-register">Пароль</p>
                            <input className="register-input" placeholder="Введите пароль" required type="password" name="password" onChange={handleInpChange} />
                        </div>
                        <div style={{display: 'flex', justifyContent: "center"}}>
                            <Button className="btn-register" onClick={handleClick}>Зарегистрироваться</Button>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
};

export default Registration;