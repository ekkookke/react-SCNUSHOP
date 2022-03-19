import React, { useState, useEffect } from 'react'
import { Form, Button, Row, Col } from 'react-bootstrap';
import FormContainer from '../components/FormContainer';
import { Link } from 'react-router-dom';
import { register } from '../actions/userActions';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message';

export default function RegisterScreen({ history, location }) {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [message,setMessage] = useState(null);

    const dispatch = useDispatch();
    const userRegister = useSelector((state) => state.userRegister)
    const { error, userInfo } = userRegister;

    const redirect = location.search ? location.search.split('=')[1] : '/'

    useEffect(() => {
        if (userInfo) {
            history.push(redirect)
        }
    }, [history, userInfo, redirect])

    const submitHandler = (e) => {
        e.preventDefault()
        if (password !== confirmPassword) {
            setMessage('两次输入的密码不一致!')
        } else {
            dispatch(register(name, email, password));
        }
    }

    return (
        <FormContainer>
            <h1>注册</h1>
            { message && <Message variant="danger">{message}</Message> }
            {error && <Message variant="danger">{error}</Message>}
            <Form onSubmit={submitHandler}>

                <Form.Group controlId='name'>
                    <Form.Label>昵称</Form.Label>
                    <Form.Control
                        type="name"
                        placeholder="请输入昵称"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    ></Form.Control>
                </Form.Group>

                <Col>&nbsp;</Col>

                <Form.Group controlId='email'>
                    <Form.Label>电子邮件</Form.Label>
                    <Form.Control
                        type="email"
                        placeholder="请输入电子邮件"
                        value={email}
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
                        onChange={(e) => setConfirmPassword(e.target.value)}
                    ></Form.Control>
                </Form.Group>

                <Col>&nbsp;</Col>
               
                <Button type='submit' variant='primary'>
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    注册
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                </Button>

                <Row className="py-3">
                    <Col>
                        已有账号，{' '}
                        <Link to={redirect ? `/login?redirect=${redirect}` : '/login'}>去登陆</Link>
                    </Col>
                </Row>
            </Form>
        </FormContainer>
    )
}
