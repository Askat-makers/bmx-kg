import React from 'react';
import { Carousel } from 'react-bootstrap';
import HomePageVideo1 from '../../video/homePageVideo.mp4'
import HomePageVideo2 from '../../video/homePageVideo2.mp4'
import HomePageVideo3 from '../../video/homePageVideo3.mp4'
import HomePageVideo4 from '../../video/homePageVideo4.mp4'


const VideoSlider = () => {
    return (
        <div>
            <Carousel>
                <Carousel.Item>
                    <video style={{width: '100%', height: '600px'}} autoPlay loop muted>
                        <source src={HomePageVideo2} />
                    </video>
                </Carousel.Item>
                <Carousel.Item>
                    <video style={{width: '100%', height: '600px'}} autoPlay loop muted>
                        <source src={HomePageVideo1} />
                    </video>
                </Carousel.Item>
                <Carousel.Item>
                    <video style={{width: '100%', height: '600px'}} autoPlay loop muted>
                        <source src={HomePageVideo3} />
                    </video>
                </Carousel.Item>
                <Carousel.Item>
                    <video style={{width: '100%', height: '600px'}} autoPlay loop muted>
                        <source src={HomePageVideo4} />
                    </video>
                </Carousel.Item>
            </Carousel>
        </div>
    );
};

export default VideoSlider;