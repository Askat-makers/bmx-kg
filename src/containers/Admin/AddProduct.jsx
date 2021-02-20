import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { adminContext } from '../../contexts/AdminContext';

const AddProduct = () => {

    // check on admin start
    const [state, setState] = useState(false)
    let checkStatus = JSON.parse(localStorage.getItem("login"))
    useEffect(() => {
        if (checkStatus) setState(true)
    }, [])
    // check on admin end

    const { addProduct } = useContext(adminContext)

    const [newProduct, setNewProduct] = useState({})

    function createNewProduct(e) {
        let obj = {
            ...newProduct,
            [e.target.name]: e.target.value,
            comments: [],
            likes: 0
        }
        setNewProduct(obj)
    }

    return (
        <>
            {state ? (
                <div>
                    <div>
                        <div>
                            <h1 style={{textAlign: "center"}}>Добавить товар</h1>
                            <div>
                                <div style={{display: "flex", justifyContent: "center"}}>
                                    <div style={{display: "flex", justifyContent: "center", flexWrap: "wrap", width: "200px"}}>
                                        <select onChange={createNewProduct} name="category" id="">
                                            <option value="">Выберите категорию</option>
                                            <option value="bmx">BMX</option>
                                            <option value="fboard">Fboard</option>
                                            <option value="roller">РОЛИКИ</option>
                                            <option value="skate">СКЕЙТБОРД</option>
                                            <option value="samokat">САМОКАТЫ</option>
                                        </select>
                                        <p className="add-product-title">Название</p>
                                        <input className="inp-add-product" onChange={createNewProduct} type="text" placeholder="Название" name="name" />
                                        <p className="add-product-title">Производитель</p>
                                        <input className="inp-add-product" onChange={createNewProduct} type="text" placeholder="Поизводитель" name="manufacturer" />
                                        <p className="add-product-title">Вес</p>
                                        <input className="inp-add-product" onChange={createNewProduct} type="text" placeholder="Вес" name="weight" />
                                        <p className="add-product-title">Гарантия</p>
                                        <input className="inp-add-product" onChange={createNewProduct} type="text" placeholder="Гарантия" name="warranty" />
                                        <p className="add-product-title">Описание</p>
                                        <input className="inp-add-product" onChange={createNewProduct} type="text" placeholder="Описание" name="description" />
                                        <p className="add-product-title">Год</p>
                                        <input className="inp-add-product" onChange={createNewProduct} type="text" placeholder="Год" name="year" />
                                        <p className="add-product-title">Фото</p>
                                        <input className="inp-add-product" onChange={createNewProduct} type="text" placeholder="Фото" name="image" />
                                        <p className="add-product-title">Цена</p>
                                        <input className="inp-add-product" onChange={createNewProduct} type="text" placeholder="Цена" name="price" />
                                        <p className="add-product-title">Цвет</p>
                                        <input className="inp-add-product" onChange={createNewProduct} type="text" placeholder="Цвет" name="color" />
                                        <Link to="/admin">
                                            <button onClick={() => addProduct(newProduct)}>Add</button>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            ) : (
                    <h1>Авторизуйтесь как админ</h1>
                )}
        </>
    );
};

export default AddProduct;