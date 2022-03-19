import React, { useState, useEffect } from 'react'
import { Col, Form, Button } from 'react-bootstrap';
import FormContainer from '../components/FormContainer';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message';
import Loader from '../components/Loader';
import { getUserDetails, updateUser } from '../actions/userActions';
import { USER_UPDATE_RESET } from '../constants/userConstants';

export default function UserEditScreen({ history, match }) {
    const userId = match.params.id;

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [isAdmin, setIsAdmin] = useState(false)

    const dispatch = useDispatch();

    const userDetails = useSelector((state) => state.userDetails)
    const { loading, error, user } = userDetails;

    const userUpdate = useSelector((state) => state.userUpdate)
    const { loading: loadingUpdate, error: errorUpdate, success: successUpdate } = userUpdate

    useEffect(() => {
        if (successUpdate) {
            dispatch({ type: USER_UPDATE_RESET })
            history.push('/admin/userlist')
        } else {
            // 没有 user
            if (!user.name || user._id !== userId) {
                dispatch(getUserDetails(userId))
            } else {
                setName(user.name)
                setEmail(user.email)
                setIsAdmin(user.isAdmin)
            }
        }
    }, [dispatch, history, user, userId, successUpdate])

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(updateUser({ _id: userId, name, email, isAdmin }))
    }

    return (
        <>
            <FormContainer>
                <h1>编辑用户</h1>
                {loadingUpdate && <Loader />}
                {errorUpdate && <Message variant="danger">{errorUpdate}</Message>}
                {loading ? (
                    <Loader />
                ) : error ? (
                    <Message variant='danger'>{error}</Message>
                ) : (
                    <Form onSubmit={submitHandler}>
                        <Form.Group controlId='name'>
                            <Form.Label>昵称</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="请输入昵称"
                                value={name}
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
                                onChange={(e) => setEmail(e.target.value)}
                            ></Form.Control>
                        </Form.Group>

                        <Col>&nbsp;</Col>

                        <Form.Group controlId='isAdmin'>
                            <Form.Check
                                type="checkbox"
                                label='设为管理员'
                                checked={isAdmin}
                                onChange={(e) => setIsAdmin(e.target.checked)}
                            ></Form.Check>
                        </Form.Group>

                        <Col>&nbsp;</Col>

                        <Button type="submit" variant="primary">更新</Button>
                    </Form>
                )}
            </FormContainer>
        </>

    )
}
