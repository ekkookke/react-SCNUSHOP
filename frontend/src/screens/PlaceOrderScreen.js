import React, { useEffect } from 'react'
import { Link } from 'react-router-dom';
import { Row, Col, ListGroup, Image, Button, Card } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import CheckoutSteps from '../components/CheckoutSteps';
import Message from '../components/Message';
import { createOrder } from '../actions/orderActions';
import { ORDER_CREATE_RESET } from '../constants/orderConstants';

export default function PlaceOrderScreen({history}) {
    const dispatch = useDispatch()
    const cart = useSelector((state) => state.cart)

    const orderCreate = useSelector((state) => state.orderCreate);
    const { order, success, error } = orderCreate;

    const addDecimals = (num) => {
        return (Math.round(num * 100) / 100).toFixed(2)
    }

    //商品价格
    cart.itemsPrice = addDecimals(cart.cartItems.reduce((acc, item) => acc + item.price * item.qty, 0))
    //商品运费
    cart.shippingPrice = addDecimals(cart.itemsPrice > 100 ? 0 : 10);//物品价格大于100则免运费，否则10$
    // 计算税费
    cart.taxPrice = addDecimals(0.1 * Number(cart.itemsPrice))
    //总价
    cart.totalPrice = (
        Number(cart.itemsPrice) +
        Number(cart.shippingPrice) +
        Number(cart.taxPrice)
    ).toFixed(2)

    useEffect(() => {
        if (success) {
            history.push(`/order/${order._id}`);
            dispatch({ type: ORDER_CREATE_RESET });
        }
        // eslint-disable-next-line
    }, [history, success]);

    const placeOrderHandler = () => {
        dispatch(
            createOrder({
                orderItems: cart.cartItems,
                shippingAddress: cart.shippingAddress,
                paymentMethod: cart.paymentMethod,
                itemsPrice: cart.itemsPrice,
                shippingPrice: cart.shippingPrice,
                taxPrice: cart.taxPrice,
                totalPrice: cart.totalPrice,
            })
        );
    };



    return (
        <>
            <CheckoutSteps step1 step2 step3 step4 />
            <Row>
                <Col md={8}>
                    <ListGroup variant="flush">
                        <ListGroup.Item>
                            <h2>用户信息</h2>
                            <p>
                                <strong>地址:</strong>
                                {cart.shippingAddress.country}, {cart.shippingAddress.city}{' '}
                                {cart.shippingAddress.postalCode}, {' '}
                                {cart.shippingAddress.address}
                            </p>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <h2>支付</h2>
                            <strong>支付方式: </strong>
                            {cart.paymentMethod}
                        </ListGroup.Item>

                        <ListGroup.Item>
                            <h2>购物详情</h2>
                            {cart.cartItems.length === 0 ? (
                                <Message>您的购物车为空!</Message>
                            ) : (
                                <ListGroup variant="flush">
                                    {cart.cartItems.map((item, index) => (
                                        <ListGroup.Item key={index}>
                                            <Row>
                                                <Col md={1}>
                                                    <Image
                                                        src={item.image}
                                                        alt={item.name}
                                                        fluid
                                                        rounded
                                                    />
                                                </Col>
                                                <Col>
                                                    <Link to={`/product/${item.product}`}>
                                                        {item.name}
                                                    </Link>
                                                </Col>
                                                <Col md={4}>
                                                    价格：{item.qty} x ${item.price} = ${item.qty * item.price}
                                                </Col>
                                            </Row>
                                        </ListGroup.Item>
                                    ))}
                                </ListGroup>
                            )}
                        </ListGroup.Item>

                        <ListGroup.Item>
                            <h3>注:(1)商品价格大于$100时免运费&nbsp;(2)税费计算规则为0.1*商品价格</h3>
                        </ListGroup.Item>

                    </ListGroup>
                </Col>

                <Col md={4}>
                    <Card>
                        <ListGroup variant="flush">
                            <ListGroup.Item>
                                <h2>订单信息</h2>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col>商品价格</Col>
                                    <Col>${cart.itemsPrice}</Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col>运费</Col>
                                    <Col>${cart.shippingPrice}</Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col>税费</Col>
                                    <Col>${cart.taxPrice}</Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col>合计</Col>
                                    <Col>${cart.totalPrice}</Col>
                                </Row>
                            </ListGroup.Item>

                            <ListGroup.Item>
                                {error && <Message variant="danger">{error}</Message>}
                            </ListGroup.Item>

                            <ListGroup.Item>
                                <Button
                                    type="button"
                                    className="btn-block"
                                    disabled={cart.cartItems.length === 0}
                                    onClick={placeOrderHandler}
                                >
                                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                    确认订单
                                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                </Button>
                            </ListGroup.Item>
                        </ListGroup>
                    </Card>
                </Col>

            </Row>
        </>
    )
}