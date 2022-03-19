import React, { useEffect } from 'react'
import { Table, Button, Row, Col } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message';
import Loader from '../components/Loader';
import { listProducts, deleteProduct, createProduct } from '../actions/productActions';
import { PRODUCT_CREATE_RESET } from '../constants/productConstants';

export default function ProductListScreen({ history }) {
    const dispatch = useDispatch();

    const productList = useSelector((state) => state.productList)
    const { loading, error, products } = productList;

    const userLogin = useSelector((state) => state.userLogin)
    const { userInfo } = userLogin;

    //删除商品
    const productDelete = useSelector((state) => state.productDelete)
    const { loading: loadingDelete, error: errorDelete, success: successDelete } = productDelete;

    //创建商品
    const productCreate = useSelector((state) => state.productCreate)
    const {
        loading: loadingCreate,
        error: errorCreate,
        success: successCreate,
        product: createdProduct
    } = productCreate;

    useEffect(() => {
        if (!userInfo && !userInfo.isAdmin) {
            history.push('/login')
        }

        if (successCreate) {
            dispatch({type:PRODUCT_CREATE_RESET})
            history.push(`/admin/product/${createdProduct._id}/edit`)
        } else {
            dispatch(listProducts())
        }
    }, [dispatch, history, userInfo, successDelete, successCreate, createdProduct])

    const deleteHandler = (id) => {
        if (window.confirm("确认要删除该商品吗?")) {
            dispatch(deleteProduct(id));
        }
    }

    const createProductHandler = () => {
        dispatch(createProduct())
    }

    return (
        <>
            <Row>
                <Col className="align-items-center">
                    <h1>商品</h1>
                </Col>
                <Col className="text-right">
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    <Button className="my-3" onClick={createProductHandler}>
                        <i className="fa fa-plus"></i> 添加商品
                    </Button>
                </Col>
            </Row>

            {loadingDelete && <Loader />}
            {errorDelete && <Message variant="danger">{errorDelete}</Message>}

            {loadingCreate && <Loader />}
            {errorCreate && <Message variant="danger">{errorCreate}</Message>}

            {loading ? (
                <Loader />
            ) : error ? (
                <Message variant='danger'>{error}</Message>
            ) : (
                <Table striped bordered hover responsive className="table-sm">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>商品名</th>
                            <th>价格</th>
                            <th>种类</th>
                            <th>品牌</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.map((product) => (
                            <tr key={product._id}>
                                <td>{product._id}</td>
                                <td>{product.name}</td>
                                <td>
                                    ${product.price}
                                </td>
                                <td>
                                    {product.category}
                                </td>
                                <td>{product.brand}</td>
                                <td>
                                    <LinkContainer to={`/admin/product/${product._id}/edit`}>
                                        <Button className='btn-sm' variant='light'>
                                            <i className="fas fa-edit"></i>
                                        </Button>
                                    </LinkContainer>
                                    <Button
                                        variant='danger'
                                        className="btn-sm"
                                        onClick={() => deleteHandler(product._id)}
                                    >
                                        <i className="fas fa-trash"></i>
                                    </Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            )}

        </>
    )
}
