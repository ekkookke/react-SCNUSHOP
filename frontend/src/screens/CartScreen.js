import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../actions/cartActions';
import { Row, Col, ListGroup, Image, Form, Button, Card } from 'react-bootstrap';
import Message from '../components/Message';
import { Link } from 'react-router-dom';
import {removeFromCart} from '../actions/cartActions';

export default function CartScreen({ match, location,history }) {
  const productId = match.params.id;

  const qty = location.search ? Number(location.search.split('=')[1]) : 1

  const dispatch = useDispatch()

  const cart = useSelector(state => state.cart);

  const { cartItems } = cart;//cartItems对应localStroage中数据,通过该方法传递数据

  const removeFromCartHandler = (id) => {
      dispatch(removeFromCart(id))
  }

  const checkoutHandler = () => {
      history.push('/login?redirect=shipping')
  }

  useEffect(() => {
    if (productId) {
      dispatch(addToCart(productId, qty))
    }
  }, [dispatch, productId, qty])

  return (
    <Row>
      <Col md={8}>
        <h1>购物车</h1>
        {cartItems.length === 0 ? (
          <Message>购物车里还没有商品哦&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<Link to="/">去选购</Link></Message>
        ) : (
          <ListGroup variant="flush">
            {cartItems.map((item) => (//item是传进来的参数
              <ListGroup.Item key={item.product}>
                <Row>
                  <Col md={2}>
                    <Image src={item.image} alt={item.name} fluid rounded />
                  </Col>
                  <Col md={3}>
                    <Link to={`/products/${item.product}`}>{item.name}</Link>
                  </Col>
                  <Col md={2}>
                    ${item.price}
                  </Col>
                  <Col md={2}>
                    <Form.Control
                      as="select"
                      value={item.qty}
                      onChange={(e) => dispatch(addToCart(item.product, Number(e.target.value)))}
                    >
                      {[...Array(item.countInStock).keys()].map((x) => (
                        <option key={x + 1} value={x + 1}>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{x + 1}</option>
                      ))}
                    </Form.Control>
                  </Col>
                  <Col md={2}>
                    <Button
                      type="button"
                      variant="light"
                      onClick={() => removeFromCartHandler(item.product)}//删除产品方法
                    >
                      <i className="fa fa-trash"></i>
                    </Button>
                  </Col>
                </Row>
              </ListGroup.Item>
            ))}
          </ListGroup>
        )}
      </Col>
      <Col md={4}>
        <Card>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h2>总计 ({cartItems.reduce((acc, item) => acc + item.qty, 0)})</h2> 
              ${cartItems.reduce((acc, item) => acc + item.qty * item.price, 0).toFixed(2)}
            </ListGroup.Item>
            <ListGroup.Item>
              <Button
                type="button"
                className="btn-block"
                disabled={cartItems.length === 0}
                onClick={checkoutHandler}
              >
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                &nbsp;&nbsp;&nbsp;&nbsp;
                结算
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              </Button>
            </ListGroup.Item>
          </ListGroup>
        </Card>
      </Col>
    </Row>
  )
}