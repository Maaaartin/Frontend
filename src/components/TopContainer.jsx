import React from 'react';
import { Row, Col } from 'react-flexbox-grid';

const TopContainer = ({ title }) => {
  return (
    <nav
      style={{ background: 'rgba(255,255,255,0.5)' }}
      className={
        'top-0 z-50 w-full bg-white flex flex-wrap items-center justify-between px-2 py-3 navbar-expand-lg mb-3'
      }
    >
      <Row className="container px-4 mx-auto flex flex-wrap items-center justify-between">
        <Col xs={8} className="w-full relative flex justify-between lg:w-auto lg:static lg:block lg:justify-start">
          <p className={
            'text-black text-sm font-bold leading-relaxed inline-block mr-4 py-2 whitespace-no-wrap'
          }>
            {title || 'Gallery'}
          </p>
        </Col>
        <Col xs={4} className='text-right'>
          Bachelor's Thesis of Martin Svoboda
        </Col>
      </Row>
    </nav>
  );
}

export default TopContainer;