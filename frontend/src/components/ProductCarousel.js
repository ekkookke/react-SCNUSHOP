import React, { useEffect } from 'react'
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Loader from '../components/Loader';
import Message from '../components/Message';
import { listTopProducts } from '../actions/productActions';
import { Carousel, Image } from 'react-bootstrap';

export default function ProductCarousel() {
    const dispatch = useDispatch();

    const productTopRated = useSelector((state) => state.productTopRated)
    const { loading, error, products } = productTopRated;

    useEffect(() => {
        dispatch(listTopProducts())
    }, [dispatch])

    return loading ? (
        <Loader />
    ) : error ? (
        <Message variant='danger'>{error}</Message>
    ) : (
        //鼠标悬浮时暂停
        <Carousel pause='hover' className='bg-dark'>
            {products.map((product) => (
                <Carousel.Item key={product._id}>
                    <Link to={`/products/${product._id}`}>
                        <Image src={product.image} alt={product.name} fluid />
                        <Carousel.Caption className='carousel-caption'>
                            <h2>{product.name} (${product.price})</h2>
                        </Carousel.Caption>
                    </Link>
                </Carousel.Item>
            ))}
        </Carousel>
    )
}
