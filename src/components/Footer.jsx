import React from 'react';
import { Col, Row } from 'react-flexbox-grid';

const Footer = ({ absolute, children }) => (
    <footer
        className={`${absolute
            ? "absolute w-full bottom-0 bg-gray-900"
            : "relative"} pb-6`}
    >
        <div className="container mx-auto px-4">
            <hr className="mb-6 border-b-1 border-gray-700" />
            <Row middle='xs'>
                <Col xs={8} className="text-sm text-white font-semibold py-1">
                    {children}
                </Col>
                <Col xs={4} className="text-white text-sm font-semibold block py-1 px-3 text-right">
                    Martin Svoboda
                </Col>
            </Row>
        </div>
    </footer>
)

export default Footer;