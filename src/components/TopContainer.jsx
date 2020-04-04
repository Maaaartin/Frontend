import React from 'react';
import { Row, Col } from 'react-flexbox-grid';

// https://github.com/creativetimofficial/tailwind-starter-kit/tree/master/Landing%20Page/react-landing-page
const TopContainer = ({ transparent, title }) => {
  transparent = true;
  return (
    <nav
    style={{background: 'rgba(255,255,255,0.5)'}}
      className={
        (transparent
          ? "top-0 z-50 w-full bg-white"
          : "relative shadow-lg bg-white shadow-lg") +
        " flex flex-wrap items-center justify-between px-2 py-3 navbar-expand-lg"
      }
    >
      <Row className="container px-4 mx-auto flex flex-wrap items-center justify-between">
        <Col xs={8} className="w-full relative flex justify-between lg:w-auto lg:static lg:block lg:justify-start">
          <p className={
            (transparent ? "text-black" : "text-gray-800") +
            " text-sm font-bold leading-relaxed inline-block mr-4 py-2 whitespace-no-wrap uppercase"
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

// export const TopContainer = ({ title }) => {
//     return (
//         <Row middle='xs' className='h-16 bg-blue-100 m-0'>
//             <Col xs={2}>{title || 'Gallery'}</Col>
//             <Col className='text-right' xs={10}>Bachelor Thesis Martin Svoboda</Col>
//         </Row>
//     )
// }