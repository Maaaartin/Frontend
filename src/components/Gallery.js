import React, { Component } from 'react';
import ImageGallery from 'react-image-gallery';
import ReactBnbGallery from 'react-bnb-gallery';

const photos = [
    {
        photo: "http://localhost/img/3.jpg",
        caption: "Test",
        subcaption: "Testy testy test",
        thumbnail: "http://localhost/img/3.jpg",
    }, 
    {
        photo: "http://localhost/img/4.jpg",
        caption: "Test2",
        subcaption: "Testy testy test2",
        thumbnail: "http://localhost/img/4.jpg",
    }, 
];

class Gallery extends Component {
    constructor() {
        super(...arguments);
        this.state = { galleryOpened: true };
        this.toggleGallery = this.toggleGallery.bind(this);
    }

    toggleGallery() {
        this.setState(prevState => ({
            galleryOpened: !prevState.galleryOpened
        }));
    }

    render() {
        return [
            <button onClick={this.toggleGallery}>Open photo gallery</button>,
            <ReactBnbGallery
                show={this.state.galleryOpened}
                photos={photos}
                onClose={this.toggleGallery} />
        ]
    }
}

export default Gallery
