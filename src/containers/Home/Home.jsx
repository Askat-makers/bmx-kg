import React from 'react';
import CatalogSection from '../CatalogSection/CatalogSection';
import Footer from '../Footer/Footer';
import BottomBasket from '../Bottombasket/BottomBasket';
import Navibar from '../Navibar/Navibar';
import Section from '../Section/Section';
import Slider from '../Carousel/Slider'
import VideoSlider from '../VIdeoSlider/VideoSlider';

const Home = () => {
    return (
        <>
            <Navibar/>
            <Slider/>
            <Section/>
            <CatalogSection/>
            <VideoSlider/>
            <Footer/>
            <BottomBasket/>
        </>
    );
};

export default Home;