import React, { useState, useEffect } from 'react'
import { Form, Button, Row, Col, Table } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { getUserDetails, updateUserProfile } from '../actions/userActions';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message';
import { USER_UPDATE_PROFILE_RESET } from '../constants/userConstants';
import Loader from '../components/Loader';
import { listMyOrders } from '../actions/orderActions';

export default function ProfileScreen({ history }) {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [message, setMessage] = useState(null);

    const dispatch = useDispatch();

    const userDetails = useSelector((state) => state.userDetails)
    const { loading, error, user } = userDetails;

    const userLogin = useSelector((state) => state.userLogin)
    const { userInfo } = userLogin;

    const userUpdateProfile = useSelector((state) => state.userUpdateProfile)
    const { success } = userUpdateProfile;

    const orderListMy = useSelector((state) => state.orderListMy)
    const { loading: loadingOrders, error: errorOrders, orders } = orderListMy;

    console.log(orders)

    useEffect(() => {
        if (!userInfo) {
            history.push('/login')
        } else {
            if (!user || !user.name || success) {
                dispatch({ type: USER_UPDATE_PROFILE_RESET })
                dispatch(getUserDetails('profile'))
                dispatch(listMyOrders())
            } else {
                setName(user.name)
                setEmail(user.email)
            }
        }
    }, [dispatch, history, userInfo, user, success])

    const submitHandler = (e) => {
        e.preventDefault()
        if (password !== confirmPassword) {
            setMessage('Passwords do not match')
        } else {
            dispatch(updateUserProfile({ name, email, password }));
        }
    }

    return (
        <Row>
            <Col md={3}>
                <h2>用户信息</h2>
                {message && <Message variant="danger">{message}</Message>}
                {loading ? (
                    <Loader />
                ) : error ? (
                    <Message variant="danger">{error}</Message>
                ) : (
                    <Form onSubmit={submitHandler}>
                        <Form.Group controlId='name'>
                            <Form.Label>昵称</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="请输入昵称"
                                value={name}
                                required
                                onChange={(e) => setName(e.target.value)}
                            ></Form.Control>
                        </Form.Group>
                        
                        <Col>&nbsp;</Col>

                        <Form.Group controlId='email'>
                            <Form.Label>电子邮箱</Form.Label>
                            <Form.Control
                                type="email"
                                placeholder="请输入电子邮箱"
                                value={email}
                                required
                                onChange={(e) => setEmail(e.target.value)}
                            ></Form.Control>
                        </Form.Group>

                        <Col>&nbsp;</Col>

                        <Form.Group controlId='password'>
                            <Form.Label>密码</Form.Label>
                            <Form.Control
                                type="password"
                                placeholder="请输入密码"
                                value={password}
                                required
                                onChange={(e) => setPassword(e.target.value)}
                            ></Form.Control>
                        </Form.Group>

                        <Col>&nbsp;</Col>

                        <Form.Group controlId='confirmPassword'>
                            <Form.Label>确认密码</Form.Label>
                            <Form.Control
                                type="password"
                                placeholder="请确认密码"
                                value={confirmPassword}
                                required
                                onChange={(e) => setConfirmPassword(e.target.value)}
                            ></Form.Control>
                        </Form.Group>

                        <Col>&nbsp;</Col>

                        <Button type="submit" variant="primary">更新</Button>
                    </Form>
                )}
            </Col>
            <Col md={9}>
                <h2>我的订单</h2>
                {loadingOrders ? (
                    <Loader />
                ) : errorOrders ? (
                    <Message variant='danger'>{errorOrders}</Message>
                ) : (
                    <Table striped bordered hover responsive className="table-sm">
                        <thead>
                            <tr>
                                <th>订单号</th>
                                <th>日期</th>
                                <th>价格</th>
                                <th>状态</th>
                                <th>运输状态</th>
                            </tr>
                        </thead>
                        <tbody>
                            {orders.map((order) => (
                                <tr key={order._id}>
                                    <td>{order._id}</td>
                                    <td>{order.createdAt.substring(0, 10)}</td>
                                    <td>{order.totalPrice}</td>
                                    <td>
                                        已支付
                                    </td>
                                    <td>
                                        待发货
                                    </td>
                                    <td>
                                        <LinkContainer to={`/order/${order._id}`}>
                                            <Button className='btn-sm' variant='light'>
                                                更多
                                            </Button>
                                        </LinkContainer>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                )}
            </Col>
        </Row>
    )
}