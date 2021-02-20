import React, { useContext } from 'react';
import './Pagination.css'
import { productsContext } from '../../contexts/ProductsContext';

const Pagintaion = () => {
    const { postsPerPage, totalPosts, paginate } = useContext(productsContext)
    const pageNumbers = []

    for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
        pageNumbers.push(i)
    }

    return (
        <div aria-label="Page navigation">
            <ul className="pagination">
                {pageNumbers.map(item => (
                    <li className="page-item" onClick={() => paginate(item)} key={item}><a className="page-link" href="#">{item}</a></li>
                ))}
            </ul>
        </div>
    );
};

export default Pagintaion;