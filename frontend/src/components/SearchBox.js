import React, { useState } from 'react'
import { Form, Button } from 'react-bootstrap';

export default function SearchBox({ history }) {
    const [keyword, setKeyword] = useState('')

    const submitHandler = (e) => {
        e.preventDefault()
        if (keyword.trim()) {//去除空格
            history.push(`/search/${keyword}`)
        } else {
            history.push('/')
        }
    }

    return (
        // inline不换行
        <Form onSubmit={submitHandler} inline>
            <Form.Control
                type='text'
                name='q'
                onChange={(e) => setKeyword(e.target.value)}
                className='mr-sm-2 ml-sm-5'
            ></Form.Control>
            <Button type='submit' variant='outline-success' className='p-2'>
                搜索
            </Button>
        </Form>
    )
}
