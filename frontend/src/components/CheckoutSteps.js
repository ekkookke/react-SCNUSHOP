import React from 'react'
import { Nav } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

export default function CheckoutSteps({ step1, step2, step3, step4 }) {
    return (
        <Nav className="justify-content-center mb-4">
            <Nav.Item>
                {step1 ? (
                    <LinkContainer to="/login">
                        <Nav.Link>登录&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|</Nav.Link>
                    </LinkContainer>
                ) : (
                    <Nav.Link disabled>登录&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|</Nav.Link>
                )}

            </Nav.Item>
            <Nav.Item>
                {step2 ? (
                    <LinkContainer to="/shipping">
                        <Nav.Link>确认订单&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|</Nav.Link>
                    </LinkContainer>
                ) : (
                    <Nav.Link disabled>确认订单&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|</Nav.Link>
                )}
            </Nav.Item>

            <Nav.Item>
                {step3 ? (
                    <LinkContainer to="/payment">
                        <Nav.Link>选择支付方式&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|</Nav.Link>
                    </LinkContainer>
                ) : (
                    <Nav.Link disabled>选择支付方式&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|</Nav.Link>
                )}
            </Nav.Item>

            <Nav.Item>
                {step4 ? (
                    <LinkContainer to="/placeorder">
                        <Nav.Link>最终确认</Nav.Link>
                    </LinkContainer>
                ) : (
                    <Nav.Link disabled>最终确认</Nav.Link>
                )}
            </Nav.Item>
        </Nav>
    )
}