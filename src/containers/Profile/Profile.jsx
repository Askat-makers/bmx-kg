import printJS from 'print-js';
import React, { useContext, useEffect, useState } from 'react';
import { Button, Modal, ModalBody } from 'react-bootstrap';
import { authContext } from '../../contexts/AuthContext';
import Navibar from '../Navibar/Navibar';
import "./Profile.css"
import Printer from '../../img/printer.png'

const Profile = () => {
    const { getUserData, user } = useContext(authContext)
    const [orderDetail, setOrderDetail] = useState({})

    const userId = JSON.parse(localStorage.getItem("user"))
    useEffect(() => {
        getUserData(userId)
    }, [])

    const [show, setShow] = useState(false)
    const handleShow = () => setShow(true)
    const handleClose = () => setShow(false)
    function handleClick(obj) {
        setOrderDetail(obj)
        handleShow()
    }
    
    return (
        <>
            {user ?
                (<>
                    <Navibar />
                    <div>
                        {/* <div>
                            <h3>Это ваш личный профиль {user.name}</h3>
                        </div> */}
                        <div>
                            <h4>История ваших заказов</h4>
                            {user.historyOrders.length ? 
                            (
                            <div>
                                <table style={{ textAlign: 'center' }}>
                                    <thead>
                                        <tr>
                                            <th>~</th>
                                            <th>Номер заказа</th>
                                            <th>Дата заказа</th>
                                            <th className="admin-profile-price">Стоимость</th>
                                            <th>~</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {user.historyOrders.map((item, index) => (
                                            <tr key={item.id}>
                                                <td>{index + 1}</td>
                                                <td>№ {item.orderNumber}</td>
                                                <td>{`${item.date.year}-${item.date.month}-${item.date.day} ${item.date.hours}:${item.date.minutes}:${item.date.seconds}`}</td>
                                                <td className="admin-profile-price">{item.totalPrice} сом</td>
                                                <td>
                                                    <Button onClick={() => handleClick(item)}>Детали заказа</Button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                    {orderDetail ?
                                        (
                                            <Modal show={show} onHide={handleClose}>
                                                <Modal.Header closeButton>
                                                    <Modal.Title>Детали заказа {orderDetail.orderNumber}</Modal.Title>
                                                </Modal.Header>
                                                <ModalBody>
                                                    <table>
                                                        <thead>
                                                            <tr>
                                                                <th></th>
                                                                <th>Название</th>
                                                                <th>Кол-во</th>
                                                                <th>Цена</th>
                                                                <th></th>
                                                            </tr>
                                                        </thead>
                                                        {orderDetail.products ?
                                                            (
                                                                < tbody >
                                                                    {
                                                                        orderDetail.products.map(item => (
                                                                            <tr key={item.product.id}>
                                                                                <td className="cart-image">
                                                                                    <img className="cart-image" src={item.product.image} alt="" />
                                                                                </td>
                                                                                <td>
                                                                                    {item.product.name}
                                                                                </td>
                                                                                <td style={{ textAlign: "center" }} className="cart-count">{item.count}</td>
                                                                                <td className="cart-price">{item.subPrice} сом</td>
                                                                            </tr>
                                                                        ))
                                                                    }
                                                                </tbody>
                                                            ) :
                                                            (
                                                                null
                                                            )}
                                                    </table>
                                                    <p style={{ textAlign: "end" }}>Сумма: {orderDetail.totalPrice} сом</p>
                                                    <button className="print-btn" type="button" onClick={() => printJS({
                                                        printable: orderDetail.products,
                                                        properties: [
                                                            {field: 'product.name', displayName: 'Название'}, 
                                                            {field: 'product.category', displayName: "Категория"}, 
                                                            {field: 'count', displayName: "Кол-во"}, 
                                                            {field: "subPrice", displayName: "Сумма"}],
                                                            header: '<h3>RIDER.KG</h3>',
                                                        type: 'json'
                                                    })}>
                                                        <img src={Printer} alt=""/>
                                                    </button>
                                                </ModalBody>
                                            </Modal>
                                        ) :
                                        (
                                            null
                                        )}

                                </table>
                            </div>
                            ) : 
                            (
                                <p style={{textAlign: "center"}}>Ваша история заказов пуста</p>
                            )}
                        </div>
                    </div>
                </>
                )
                :
                (null)}
        </>
    );
};

export default Profile;