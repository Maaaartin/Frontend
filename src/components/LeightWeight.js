import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Carousel } from 'react-responsive-carousel';
import _ from 'lodash';



class LightWeight extends Component {

    render() {
        const { files } = this.props.location.state;
        return (
            <Carousel>
                {_.isArray(files) && files.map(item => (
                    <div>
                        <img src={`http://localhost/img/${item}`} />
                        <p className="legend">Legend 1</p>
                    </div>
                ))}
            </Carousel>
        );
    }
}

export default LightWeight;