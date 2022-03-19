import axios from 'axios';
import { PayPalButton } from "react-paypal-button-v2";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Row, Col, ListGroup, Image, Card } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import Loader from "../components/Loader";
import { getOrderDetails,payOrder } from "../actions/orderActions";

export default function OrderScreen({ match , history}) {
    const orderId = match.params.id;

    const [sdkReady, setSdkReady] = useState(false);
    const dispatch = useDispatch();

    const orderDetails = useSelector((state) => state.orderDetails);
    const { order, loading, error } = orderDetails;

    const userLogin = useSelector((state) => state.userLogin)
    const { userInfo } = userLogin;

    const successPaymentHandler = (paymentResult) => {
        order.isDelivered = true;
        dispatch(payOrder(orderId, paymentResult))
    }

    if (!loading) {
        const addDecimals = (num) => {
            return (Math.round(num * 100) / 100).toFixed(2);
        };

        // 商品总价
        order.itemsPrice = addDecimals(
            order.orderItems.reduce((acc, item) => acc + item.price * item.qty, 0)
        );

    }
    console.log(order)
    useEffect(() => {

        if (!userInfo) {
            history.push('/login')
        } 

        const addPayPalScript = async () => {
            const { data: clientId } = await axios.get('/api/config/paypal')
            const script = document.createElement('script');
            script.type = 'text/javascript';
            script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}`
            script.async = true
            script.onload = () => {
                setSdkReady(true)
            }
            document.body.appendChild(script);
        }

        // 没有 order
        // 第一次加载页面时，order 是 undefined
        // 第一次只会执行 dispatch(getOrderDetails(orderId))
        // 当执行完 dispatch(getOrderDetails(orderId)) 之后，order 变化，有值就会执行 addPayPalScript
        if (!order || order._id !== orderId) {
            dispatch(getOrderDetails(orderId))
            // 有 order，还没有支付
            // 有 order 之后支付才有意义
        } else if (!order.isPaid) {
            // 没有加载 script，就是没有执行 addPayPalScript
            if (!window.paypal) {
                addPayPalScript();
                // 没有支付的情况下，已经添加了 script 脚本
            } else {
                setSdkReady(true)
            }
        }
        // eslint-disable-next-line
    }, [dispatch, orderId, order, sdkReady]);

    return loading ? <Loader /> : error ? <Message variant="danger">{error}</Message> : <>
        <h1>订单号: {order._id}</h1>
        <Row>
            <Col md={8}>
                <ListGroup variant="flush">
                    <ListGroup.Item>
                        <h2>用户信息</h2>
                        <p><strong>昵称: </strong>{order.user.name}</p>
                        <p>
                            <strong>电子邮箱: </strong>
                            <a href={`mailto:${order.user.email}`}>{order.user.email}</a>
                        </p>
                        <p>
                            <strong>地址:</strong>
                            {order.shippingAddress.country}, {order.shippingAddress.city}{' '}
                            {order.shippingAddress.postalCode}, {' '}
                            {order.shippingAddress.address}
                        </p>
                        {order.isDelivered ? (
                            <Message variant="success">正在运输 {order.deliveredAt}</Message>
                        ) : (
                            <Message variant="success">支付成功!等待发货...</Message>
                        )}
                    </ListGroup.Item>
                    {/* <ListGroup.Item>
                        <h2>支付</h2>
                        <p>
                            <strong>支付方式: </strong>
                            {order.paymentMethod}
                        </p>
                        {order.isPaid ? (
                            <Message variant="success">已支付 {order.paidAt}</Message>
                        ) : (
                            <Message variant="danger">支付失败，请重试!</Message>
                        )}
                    </ListGroup.Item> */}

                    <ListGroup.Item>
                        <h2>购物详情</h2>
                        {order.orderItems.length === 0 ? (
                            <Message>您的订单为空!</Message>
                        ) : (
                            <ListGroup variant="flush">
                                {order.orderItems.map((item, index) => (
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
                                <Col>${order.itemsPrice}</Col>
                            </Row>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <Row>
                                <Col>运费</Col>
                                <Col>${order.shippingPrice}</Col>
                            </Row>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <Row>
                                <Col>税费</Col>
                                <Col>${order.taxPrice}</Col>
                            </Row>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <Row>
                                <Col>合计</Col>
                                <Col>${order.totalPrice}</Col>
                            </Row>
                        </ListGroup.Item>

                        {!order.isPaid && (
                            <ListGroup.Item>
                                {!sdkReady ? (
                                    <Loader />
                                ) : (
                                    <PayPalButton
                                        amount={order.totalPrice}
                                        onSuccess={successPaymentHandler}
                                    />
                                )}
                            </ListGroup.Item>
                        )}

                    </ListGroup>
                </Card>
            </Col>
        </Row>
    </>
}
