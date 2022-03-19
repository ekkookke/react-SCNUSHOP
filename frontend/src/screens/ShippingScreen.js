import React, { useState } from 'react'
import { Col, Form, Button } from 'react-bootstrap';
import FormContainer from '../components/FormContainer';
import { useDispatch, useSelector } from 'react-redux';
import { saveShippingAddress } from '../actions/cartActions';
import CheckoutSteps from '../components/CheckoutSteps';

export default function ShippingScreen({ history }) {
    const cart = useSelector((state) => state.cart);//store中的cart->reducer中的CART_SAVE_SHIPPING_ADDRESS
    const { shippingAddress } = cart;

    const [address, setAddress] = useState(shippingAddress.address);
    const [city, setCity] = useState(shippingAddress.city);
    const [postalCode, setPostalCode] = useState(shippingAddress.postalCode);
    const [country, setCountry] = useState(shippingAddress.country);

    const dispatch = useDispatch();

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(saveShippingAddress({ address, city, postalCode, country }))
        history.push('/payment');
    }

    return (
        <FormContainer>
            <CheckoutSteps step1 step2/>
            <h1>您的信息</h1>
            <Form onSubmit={submitHandler}>
                <Form.Group controlId='address'>

                    <Form.Group controlId='country'>
                        <Form.Label>国家</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="请输入国家"
                            value={country}
                            required
                            onChange={(e) => setCountry(e.target.value)}
                        ></Form.Control>
                    </Form.Group>

                    <Col>&nbsp;</Col>

                    <Form.Group controlId='city'>
                        <Form.Label>省市</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="请输入省市"
                            value={city}
                            required
                            onChange={(e) => setCity(e.target.value)}
                        ></Form.Control>
                    </Form.Group>

                    <Col>&nbsp;</Col>

                    <Form.Label>住址</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="请输入详细住址"
                        value={address}
                        required
                        onChange={(e) => setAddress(e.target.value)}
                    ></Form.Control>
                </Form.Group>

                <Col>&nbsp;</Col>

                <Form.Group controlId='postalCode'>
                    <Form.Label>邮政编码</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="请输入邮政编码"
                        value={postalCode}
                        required
                        onChange={(e) => setPostalCode(e.target.value)}
                    ></Form.Control>
                </Form.Group>

                <Col>&nbsp;</Col>

                <Button type='submit' variant='primary'>
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    确认订单
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                </Button>
            </Form>
        </FormContainer>
    )
}
