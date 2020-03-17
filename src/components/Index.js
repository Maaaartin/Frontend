import React, { Component } from 'react';
import { Col, Row } from 'react-styled-flexboxgrid';
import Form from './Form';
import { withRouter } from 'react-router-dom';

class Index extends Component {
    getTop() {
        return (
            <Row middle='xs' className='h-16 bg-blue-100'>
                <Col xs={2}>Gallery</Col>
                <Col className='text-right' xs={10}>Bachelor Thesis Martin Svoboda</Col>
            </Row>
        )
    }

    render() {
        return [
            this.getTop(),
            <Form />
        ];
    }
}

export default withRouter(Index);
