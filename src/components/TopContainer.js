import React from 'react';
import { Col, Row } from 'react-styled-flexboxgrid';

export const TopContainer = ({ title }) => {
    return (
        <Row middle='xs' className='h-16 bg-blue-100'>
            <Col xs={2}>{title || 'Gallery'}</Col>
            <Col className='text-right' xs={10}>Bachelor Thesis Martin Svoboda</Col>
        </Row>
    )
}