import React from 'react';
import { Carousel, Container } from 'react-bootstrap'
import './Slider.css'

const Slider = () => {
    return (
        <div className="carousel-block">
            <Container>
                <Carousel>
                    <Carousel.Item>
                        <img className="d-block w-100" src={'https://cdn.shopify.com/s/files/1/0313/5989/t/9/assets/hero.jpg?v=2309937665646667121'} alt="Winter" />
                    </Carousel.Item>
                    <Carousel.Item>
                        <img className="d-block w-100" style={{maxHeight: "373px"}} src={'https://www.hellride.ru/upload/medialibrary/15f/15f2bdf2b85a2d6c4c5784c86b67c8bc.jpg'} alt="Winter" />
                    </Carousel.Item>
                </Carousel>
            </Container>
        </div>
    );
};

export default Slider;