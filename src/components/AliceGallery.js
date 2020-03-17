import React from 'react';
import AliceCarousel from 'react-alice-carousel';
import "react-alice-carousel/lib/alice-carousel.css";

// class AliceGallery extends React.Component {

//     onSlideChange(e) {
//         console.log('Item`s position during a change: ', e.item);
//         console.log('Slide`s position during a change: ', e.slide);
//     }

//     onSlideChanged(e) {
//         console.log('Item`s position after changes: ', e.item);
//         console.log('Slide`s position after changes: ', e.slide);
//     }

//     render() {
//         const responsive = {
//             0: {
//                 items: 1
//             },
//             600: {
//                 items: 2
//             },
//             1024: {
//                 items: 3
//             }
//         };

//         return (
//             <AliceCarousel
//                 duration={400}
//                 autoPlay={true}
//                 startIndex={1}
//                 fadeOutAnimation={true}
//                 mouseDragEnabled={true}
//                 playButtonEnabled={true}
//                 responsive={responsive}
//                 autoPlayInterval={2000}
//                 autoPlayDirection="rtl"
//                 autoPlayActionDisabled={true}
//                 onSlideChange={this.onSlideChange}
//                 onSlideChanged={this.onSlideChanged}
//             >
//                 <div className="yours-custom-class"><img src='http://localhost/img/4.jpg'></img></div>
//                 <div className="yours-custom-class"><img src='http://localhost/img/3.jpg'></img></div>
//                 <div className="yours-custom-class"><h2>3</h2></div>
//                 <div className="yours-custom-class"><h2>4</h2></div>
//                 <div className="yours-custom-class"><h2>5</h2></div>
//             </AliceCarousel>
//         );
//     }
// }

class AliceGallery extends React.Component {
    constructor() {
        super();
        this.state = {
            currentIndex: 0,
            items: [<img src='http://localhost/img/4.jpg' />, <img src='http://localhost/img/3.jpg'></img>]
        };
    }

    slideTo = (i) => this.setState({ currentIndex: i });

    onSlideChanged = (e) => this.setState({ currentIndex: e.item });

    slideNext = () => this.setState({ currentIndex: this.state.currentIndex + 1 });

    slidePrev = () => this.setState({ currentIndex: this.state.currentIndex - 1 });

    renderThumbs = () =>
        <ul>{this.state.items.map((item, i) =>
            <li key={i} onClick={() => this.slideTo(i)}>Thumb {item}</li>)}
        </ul>;

    renderGallery() {
        const { currentIndex, items } = this.state;

        return (<AliceCarousel
            dotsDisabled={true}
            buttonsDisabled={true}
            slideToIndex={currentIndex}
            onSlideChanged={this.onSlideChanged}
        >
            {items.map((item, i) => <div key={i} className="yours-custom-class"><h2>{item}</h2></div>)}
        </AliceCarousel>);
    }

    render() {
        return (
            <div>
                <h3>Navigation</h3>
                {this.renderThumbs()}
                <button onClick={() => this.slidePrev()}>Prev button</button>
                <button onClick={() => this.slideNext()}>Next button</button>
                <h3>React Alice Carousel</h3>
                {this.renderGallery()}
            </div>
        );
    }
}

export default AliceGallery