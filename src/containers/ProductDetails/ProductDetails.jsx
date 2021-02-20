import React, { useContext, useEffect, useState } from 'react';
import { Container, Modal, ModalBody } from 'react-bootstrap';
import { productsContext } from '../../contexts/ProductsContext';
import BottomBasket from '../Bottombasket/BottomBasket';
import Footer from '../Footer/Footer';
import Navibar from '../Navibar/Navibar';
import './ProductDetails.css'
import UserAvatar from '../../img/userAvatar.svg'
import ArrowIcon from '../../img/arrowIcon.png'
import HeartIcon from '../../img/heart.png'

const ProductDetails = (props) => {
    const {
        getDetailsOfProduct,
        productDetails,
        addAndDeleteProductInCart,
        checkProductInCart,
        addAndDeleteProductInFavorites,
        checkProductInFavorites,
        sendComment,
        sendCommentAnswer,
        addAndDeleteLikes

    } = useContext(productsContext)
    useEffect(() => {
        getDetailsOfProduct(props.match.params.id)
    }, [])

    // comments

    useEffect(() => {
        getDetailsOfProduct(props.match.params.id)
    }, [])

    const [value1, setValue1] = useState('')
    const [value2, setValue2] = useState('')
    const [value3, setValue3] = useState('')
    const [value4, setValue4] = useState('')

    const [newProduct, setNewProduct] = useState(productDetails)

    useEffect(() => {
        setNewProduct(productDetails)
    }, [productDetails])

    function handleSave(e) {
        let obj = {
            userName: value1,
            userComment: value2,
            answers: [],
            id: Date.now()
        }
        if (!obj.userName.trim() || !obj.userComment.trim()) {
            return alert("Заполните все поля")
        }
        sendComment(newProduct, obj)
        setValue1('')
        setValue2('')
    }

    function handleSaveAnswer(e) {
        let obj = {
            userName: value3,
            userComment: value4,
            answers: [],
            id: Date.now()
        }
        if (!obj.userName.trim() || !obj.userComment.trim()) {
            return alert("Заполните все поля")
        }
        sendCommentAnswer(newProduct, obj, commentId)
        handleClose()
        setValue3('')
        setValue4('')
    }

    const [commentId, setCommentId] = useState(null)

    const [show, setShow] = useState(false)
    const handleShow = (id) => {
        setCommentId(id)
        setShow(true)
    }
    const handleClose = () => setShow(false)
    //comments end
    return (
        <>
            {productDetails ?
                (
                    <div>
                        <Navibar />
                        <Container>
                            <div className="block-product-details">
                                <div>
                                    <img className="product-details-img" style={{ borderRadius: "2%", width: "300px" }} src={productDetails.image} alt="" />
                                </div>
                                <div className="details-description">
                                    <h3 className="h3">{productDetails.name}</h3>
                                    <p>{productDetails.price} сомов</p>
                                    {checkProductInCart(productDetails.id) ?
                                        (
                                            <button style={{ backgroundColor: "#1976d2", borderColor: '#1976d2', color: '#fff' }} onClick={() => addAndDeleteProductInCart(productDetails)}>В корзине</button>
                                        ) :
                                        (
                                            <button style={{ backgroundColor: "#ff6410", borderColor: '#ff6410', color: '#fff' }} onClick={() => addAndDeleteProductInCart(productDetails)}>В корзину</button>
                                        )
                                    }
                                    {checkProductInFavorites(productDetails.id) ?
                                        (
                                            <button style={{ backgroundColor: checkProductInFavorites(productDetails.id) ? "red" : "white", marginLeft: "15px", color: checkProductInFavorites(productDetails.id) ? "white" : "#573ba3" }} onClick={() => addAndDeleteProductInFavorites(productDetails)} className="btn-add-to-wishlist">В избранном</button>
                                        )
                                        :
                                        (
                                            <button onClick={() => addAndDeleteProductInFavorites(productDetails)} className="btn-add-to-wishlist btn-favorite-details">В избранное</button>
                                        )
                                    }
                                    <p>
                                        Нравится {productDetails.likes}
                                        <img style={{ cursor: "pointer" }} onClick={() => addAndDeleteLikes(productDetails)} src={HeartIcon} alt="" />
                                    </p>

                                    <p className="detail-block-description">{productDetails.description}</p>
                                </div>
                            </div>
                            <div >
                                <h3 style={{ display: "flex", justifyContent: "start" }}>Отзывы</h3>
                                <div>
                                    <div>
                                        {productDetails.comments.map((item, index) => (
                                            <div key={`${index + 1}`}>
                                                <div className="user-name" style={{ display: "flex", alignItems: "center", textAlign: "left", padding: "3%", border: "1px solid #d5d5d5", marginBottom: "20px" }}>
                                                    <div className="user" style={{ width: "100%" }}>
                                                        <div className="askat" style={{ display: "flex", justifyContent: 'space-around', width: "100%" }}>
                                                            <div>
                                                                <div style={{ display: "flex", justifyContent: "start", alignItems: "center" }}>
                                                                    <img className="user-icon" style={{ width: "5%", marginRight: "3%" }} src={UserAvatar} alt="aaa" />
                                                                    <h5>{item.userName}</h5>
                                                                </div>
                                                                <div className="comment" style={{ marginLeft: " 8%", width: "80%" }}>
                                                                    <span className="userComment-span">
                                                                        {item.userComment}
                                                                    </span>
                                                                </div>
                                                            </div>
                                                            <div>
                                                                <p style={{ cursor: "pointer" }} onClick={() => handleShow(item.id)}>Ответить</p>
                                                            </div>
                                                        </div>
                                                        {item.answers ?
                                                            (
                                                                item.answers.map(item => (
                                                                    <div key={item.id}>
                                                                        <div style={{ display: "flex", justifyContent: "center", alignItems: "flex-end" }}>
                                                                            <div>
                                                                                <img src={ArrowIcon} alt="" />
                                                                            </div>
                                                                            <div>
                                                                                <div style={{ display: "flex", justifyContent: "start", alignItems: "center" }}>
                                                                                    <img className="user-icon" style={{ width: "5%", marginRight: "3%" }} src={UserAvatar} alt="aaa" />
                                                                                    <h5>{item.userName}</h5>
                                                                                </div>
                                                                                <div className="comment" style={{ marginLeft: " 8%", width: "80%" }}>
                                                                                    <span className="userComment-span">
                                                                                        {item.userComment}
                                                                                    </span>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                ))
                                                            ) :
                                                            (
                                                                null
                                                            )}
                                                    </div>
                                                    <div>
                                                        <Modal show={show} onHide={handleClose}>
                                                            <Modal.Header closeButton>
                                                                <Modal.Title>Ответить пользователю {item.userName}</Modal.Title>
                                                            </Modal.Header>
                                                            <ModalBody>
                                                                <input placeholder="Ваше имя" onChange={(e) => setValue3(e.target.value)} type="text" />
                                                                <input placeholder="Ваш комментарий" onChange={(e) => setValue4(e.target.value)} type="text" />
                                                                <button onClick={handleSaveAnswer}>Reply</button>
                                                            </ModalBody>
                                                        </Modal>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                                <div style={{ display: "flex", flexDirection: "column", margin: "30px", justifyContent: "center", alignItems: "center" }}>
                                    <input
                                        className="comment"
                                        style={{ border: "none", borderRadius: "0%", borderBottom: "1px solid gray", width: "40%" }}
                                        value={value1}
                                        onChange={(e) => setValue1(e.target.value)}
                                        name="userName"
                                        placeholder="Ваше имя"
                                        type="text"
                                    />
                                    <textarea
                                        className="comment comment-area"
                                        style={{ width: "40%", height: "200px", margin: "30px 0" }}
                                        value={value2}
                                        onChange={(e) => setValue2(e.target.value)}
                                        name="userComment"
                                        placeholder="Ваш отзыв"
                                        type="text">
                                    </textarea>
                                    <button className="save-comment-btn" onClick={handleSave}>Оставить отзыв</button>
                                </div>
                            </div>
                        </Container>
                    </div>
                )
                :
                (
                    <h2>Loading</h2>
                )}
            <Footer />
            <BottomBasket />
        </>
    );
};

export default ProductDetails;