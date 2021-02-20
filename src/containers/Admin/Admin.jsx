import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { adminContext } from '../../contexts/AdminContext';
import Navibar from '../Navibar/Navibar';
import './Admin.css'

const Admin = () => {

    // check on admin
    const [state, setState] = useState(false)
    let checkStatus = JSON.parse(localStorage.getItem("login"))
    useEffect(() => {
        if(checkStatus) setState(true)
    }, [])

    const { products, getProducts, getProductToEdit, delProduct } = useContext(adminContext)

    useEffect(() => {
        getProducts()
    }, [])

    return (
        <>
        <Navibar/>
        {state ? (
        <div>
            <div className="container">
                <div className="admin-panel">
                    <div>
                        <h1>ADMIN PANEL</h1>
                    </div>
                </div>
                <div className="add-panel">
                    <div><Link to="/addProduct"><button>ADD PRODUCT</button></Link></div>
                </div>
                <table style={{ textAlign: 'center' }}>
                    <thead>
                        <tr>
                            <th>~</th>
                            <th>image</th>
                            <th>name</th>
                            <th>color</th>
                            <th>price</th>
                            <th>year</th>
                            <th>Описание</th>
                            <th>Производитель</th>
                            <th>Вес</th>
                            <th>~</th>
                            <th>~</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.map((item, index) => (
                            <tr key={item.id} className="admin-every-product">
                                <td>{index + 1}</td>
                                <td><a href={item.image}><img style={{ maxWidth: '100px' }} src={item.image} alt="" /></a></td>
                                <td>{item.name}</td>
                                <td>{item.color}</td>
                                <td>{item.price} сом</td>
                                <td>{item.year} год</td>
                                <td style={{ maxWidth: '250px', textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap' }}>{item.description}</td>
                                <td>{item.manufacturer}</td>
                                <td>{item.weight} гр</td>
                                <td><button onClick={() => delProduct(item.id)}>DEL</button></td>
                                <td><Link to="/editProduct"><button onClick={() => getProductToEdit(item.id)}>EDIT</button></Link></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
        ) : (
            <h1>Авторизуйтесь как админ</h1>
        )}
        </>
    );
};

export default Admin;