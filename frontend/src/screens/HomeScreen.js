import React, { useEffect } from "react";
import { Row, Col } from "react-bootstrap";
import Product from "../components/Product";
import { useDispatch, useSelector } from 'react-redux';
import { listProducts } from '../actions/productActions';
import ProductCarousel from "../components/ProductCarousel";
import { Link } from 'react-router-dom';

export default function HomeScreen({ match }) {
  const keyword = match.params.keyword;

  const dispatch = useDispatch();
  const productList = useSelector((state) => state.productList);
  const { products} = productList;

  useEffect(() => {
    dispatch(listProducts(keyword));
  }, [dispatch, keyword]);


  return (
    <>

      {!keyword ? (
        <ProductCarousel />
      ) : (
        <Link to='/' className='btn btn-light'>
          Go Back
        </Link>
      )}

      <h1>正在热销</h1>
      <Row>
        {products.map((product) => (
          <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
            <Product product={product} />
          </Col>
        ))}
      </Row>
    </>
  );
}