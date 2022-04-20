import React from 'react';
import img_vite from '../img/vite.png'
import img_react from '../img/reaact.jpg'
import img_jsx from '../img/jsx.png'

const bootstrap = () => {
    return (
            <div id="carouselExampleIndicators" class="carousel slide" data-ride="carousel">
            <ol class="carousel-indicators">
                <li data-target="#carouselExampleIndicators" data-slide-to="0" class="active"></li>
                <li data-target="#carouselExampleIndicators" data-slide-to="1"></li>
                <li data-target="#carouselExampleIndicators" data-slide-to="2"></li>
            </ol>
            <div class="carousel-inner">
                <div class="carousel-item active">
                <img class="d-block w-50 h-50" src={img_react} alt="First slide"/>
                </div>
                <div class="carousel-item">
                <img class="d-block w-50 h-50" src={img_vite} alt="Second slide"/>
                </div>
                <div class="carousel-item">
                <img class="d-block w-50 h-50" src={img_jsx} alt="Third slide"/>
                </div>
            </div>
            <a class="carousel-control-prev" href="#carouselExampleIndicators" role="button" data-slide="prev">
                <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                <span class="sr-only">Previous</span>
            </a>
            <a class="carousel-control-next" href="#carouselExampleIndicators" role="button" data-slide="next">
                <span class="carousel-control-next-icon" aria-hidden="true"></span>
                <span class="sr-only">Next</span>
            </a>
            </div>
    )
}

export default bootstrap