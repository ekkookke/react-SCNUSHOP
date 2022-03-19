import React, { useState, useEffect } from 'react'
import { Form, Button, Row, Col } from 'react-bootstrap';
import FormContainer from '../components/FormContainer';
import { Link } from 'react-router-dom';
import { login } from '../actions/userActions';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message';

export default function LoginScreen({history,location}) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const dispatch = useDispatch()
    const userLogin = useSelector((state) => state.userLogin);
    const { error, userInfo } = userLogin;//userInfo对应localStorage中数据,通过该方法传递数据

    const redirect = location.search ? location.search.split('=')[1] : '/'//能取到value说明不在首页，跳到对应的参数地址；否则跳到首页。

    useEffect(() => {//登陆成功时对应reducer中LOGIN_SUCCESS,才会把内容传过来
        if (userInfo) {
            history.push(redirect)
        }
    }, [history, userInfo, redirect])


    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(login(email, password));
    }

    return (
        <FormContainer>
            <h1>登录</h1>
            {error && <Message variant="danger">{error}</Message>}
            <Form onSubmit={submitHandler}>

                <Form.Group controlId='email'>
                    <Form.Label>电子邮箱</Form.Label>
                    <Form.Control
                        type="email"
                        placeholder="请输入电子邮箱"
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
               
                <Button type='submit' variant='primary'>
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    登录
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                </Button>

                <Row className='py-3'>
                    <Col>
                        我是新用户,{' '}
                        <Link to={redirect ? `/register?redirect=${redirect}` : '/register'}>去注册</Link>
                    </Col> 

                </Row>
            </Form>
        </FormContainer>
    )
}
