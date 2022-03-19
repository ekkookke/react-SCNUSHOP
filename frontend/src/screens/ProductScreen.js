import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Rating from "../components/Rating";
import { Row, Col, ListGroup, Image, Card, Button, Form} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { listProductsDetails, createProductReview } from "../actions/productActions";
import Loader from "../components/Loader";
import Message from "../components/Message";
import { PRODUCT_CREATE_REVIEW_RESET } from '../constants/productConstants';


export default function ProductScreen({ history, match }) {
  const [qty, setQty] = useState(1);
  
  const [rating, setRating] = useState(0)
  const [comment, setComment] = useState('')
  
  const dispatch = useDispatch();
  
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const productDetails = useSelector((state) => state.productDetails);
  const { loading, error, product } = productDetails;

  const productReviewCreate = useSelector((state) => state.productReviewCreate)
  const {
    success: successProductReview,
    loading: loadingProductReview,
    error: errorProductReview
  } = productReviewCreate

  useEffect(() => {
    if (successProductReview) {
      setRating(0)
      setComment('')
    }
    if (!product._id || successProductReview || product._id !== match.params.id ) {
      dispatch(listProductsDetails(match.params.id));
      dispatch({ type: PRODUCT_CREATE_REVIEW_RESET })
    }
    // eslint-disable-next-line
  }, [dispatch, match, successProductReview]);

  const addToCartHandler = () => {
    history.push(`/cart/${match.params.id}?qty=${qty}`)
  }

  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(
      createProductReview(match.params.id, { rating, comment })
    )
  }

  return (
    <>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <>
          
          <Row>
            <Col md={6}>
              <Image src={product.image} alt={product.name} fluid />
            </Col>
            <Col md={3}>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <h3>{product.name}</h3>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Rating
                    value={product.rating}
                    text={`${product.numReviews} reviews`}
                  />
                </ListGroup.Item>
                <ListGroup.Item>价格: ${product.price}</ListGroup.Item>
                <ListGroup.Item>
                  描述: {product.description}
                </ListGroup.Item>
              </ListGroup>
            </Col>
            <Col md={3}>
              <Card>
                <ListGroup variant="flush">
                  <ListGroup.Item>
                    <Row>
                      <Col>价格:</Col>
                      <Col>
                        <strong>${product.price}</strong>
                      </Col>
                    </Row>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <Row>
                      <Col>库存:</Col>
                      <Col>
                        {product.countInStock > 0 ? "充足" : "已售完"}
                      </Col>
                    </Row>
                  </ListGroup.Item>
                  { product.countInStock > 0 && (
                    <ListGroup.Item>
                      <Row>
                        <Col>数量</Col>
                        <Col>
                          <Form.Control as="select" value={qty} onChange={(e) => setQty(e.target.value)}>
                            {[...Array(product.countInStock).keys()].map(x => (
                              <option key={x + 1} value={x + 1}>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{x + 1}</option>
                            ))}

                            
                          </Form.Control>
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  ) }
                  <ListGroup.Item>
                    <Button
                      onClick={addToCartHandler}
                      className="btn-block"
                      type="button"
                      disabled={product.countInStock === 0}
                    >
                      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                      添加至购物车
                      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    </Button>
                  </ListGroup.Item>
                </ListGroup>
              </Card>
            </Col>
          </Row>
          <Row>
            <Col md={6}>
              <h2>评论</h2>
              { product.reviews.length === 0 && <Message>这件商品还没有评论噢~</Message> }
              <ListGroup variant="flush">
                { product.reviews.map((review) => (
                  <ListGroup.Item key={review._id}>
                    <strong>{review.name}</strong>
                    <Rating value={review.rating} />
                   {/* <p>{review.createdAt.substring(0, 10)}</p> */}
                    <p>{review.comment}</p>
                  </ListGroup.Item>
                )) }
                <ListGroup.Item>
                  <h2>作出您的评价:</h2>
                  { successProductReview && (
                    <Message variant="success">
                      评价提交成功!
                    </Message>
                  ) }
                  { loadingProductReview && <Loader /> }
                  { errorProductReview && <Message variant="danger">{errorProductReview}</Message>}
                  { userInfo ? (
                    <Form onSubmit={submitHandler}>
                      <Form.Group controlId='rating'>
                        <Form.Label>评星</Form.Label>
                        <Form.Control
                          as='select'
                          value={rating}
                          onChange={(e) => setRating(e.target.value)}
                        >
                          <option value=''>请选择...</option>
                          <option value='1'>1 - 非常不推荐</option>
                          <option value='2'>2 - 比较不推荐</option>
                          <option value='3'>3 - 一般</option>
                          <option value='4'>4 - 比较推荐</option>
                          <option value='5'>5 - 非常推荐</option>
                        </Form.Control>
                      </Form.Group>

                      <Col>&nbsp;</Col>

                      <Form.Group controlId='comment'>
                        <Form.Label>您对商品的看法:</Form.Label>
                        <Form.Control
                          as='textarea'
                          value={comment}
                          onChange={(e) => setComment(e.target.value)}
                        ></Form.Control>
                      </Form.Group>

                      <Col>&nbsp;</Col>

                      <Button
                        disabled={loadingProductReview}
                        type='submit'
                        variant='primary'
                      >
                        提交
                      </Button>
                    </Form>
                  ) : (
                    <Message>
                      请 <Link to='/login'>登录</Link> 后再评价{' '}
                    </Message>
                  ) }
                </ListGroup.Item>
              </ListGroup>
            </Col>
          </Row>
        </>
      )}
    </>
  );
}
