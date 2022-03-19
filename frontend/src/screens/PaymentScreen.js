import React, { useState } from 'react'
import { Col, Form, Button } from 'react-bootstrap';
import FormContainer from '../components/FormContainer';
import { useDispatch, useSelector } from 'react-redux';
import { savePaymentMethod } from '../actions/cartActions';
import CheckoutSteps from '../components/CheckoutSteps';

export default function PaymentScreen({ history }) {
    const cart = useSelector((state) => state.cart);
    const { shippingAddress, paymentMethod: payment } = cart;

    if (Object.keys(shippingAddress).length === 0) {//如果没有填写地址
        history.push('/shipping');
    }

    const [paymentMethod, setPaymentMethod] = useState(payment);

    const dispatch = useDispatch();

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(savePaymentMethod(paymentMethod));
        history.push('/placeorder');
    }

    return (
        <FormContainer>
            <CheckoutSteps step1 step2 step3 />
            <h1>支付</h1>
            <Form onSubmit={submitHandler}>
                <Form.Group controlId='address'>
                    <Form.Label as="legend">请选择支付方式：</Form.Label>

                    <Col>&nbsp;</Col>

                    <Form.Check
                        type="radio"
                        label="银行卡支付"
                        id='bankPay'
                        name="paymentMethod"
                        value='银行卡支付'
                        checked={paymentMethod === '银行卡支付'}
                        onChange={(e) => setPaymentMethod(e.target.value)}
                    >
                    </Form.Check>

                    <Col>&nbsp;</Col>

                    <Form.Check
                        type="radio"
                        label="支付宝支付"
                        id='aliPay'
                        name="paymentMethod"
                        value='支付宝支付'
                        checked={paymentMethod === '支付宝支付'}
                        onChange={(e) => setPaymentMethod(e.target.value)}
                    >
                    </Form.Check>
                </Form.Group>

                <Col>&nbsp;</Col>

                <Form.Check
                    type="radio"
                    label="微信支付"
                    id='wechatPay'
                    name="paymentMethod"
                    value='微信支付'
                    checked={paymentMethod === '微信支付'}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                >
                </Form.Check>

                <Col>&nbsp;</Col>
                
                <Button type="submit" variant="primary">确认支付</Button>
            </Form>
        </FormContainer>
    )
}
