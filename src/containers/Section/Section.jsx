import React, { useContext, useEffect } from 'react';
import { Card, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { productsContext } from '../../contexts/ProductsContext';
import './Section.css'

const Section = () => {
    const { getLastProducts, products } = useContext(productsContext)

    useEffect(() => {
        getLastProducts()
    }, [])

    let length = products.length - 8
    let arr = products.filter((item, index) => index >= length)

    return (
        <Container className="section">
            <h4>Новинки</h4>
            <div className="section-card">
                {arr.length ? arr.map(item => (
                    <Card key={item.id} className="grow" style={{ width: '18rem' }}>
                        <Link to={`/product-details${item.id}`}>
                            <Card.Img variant="top" src={item.image} />
                            <Card.Body>
                                <Card.Title>{item.name}</Card.Title>
                            </Card.Body>
                        </Link>
                    </Card>
                )) : null}
            </div>
        </Container>
    );
};

export default Section;