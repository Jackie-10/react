import React, { useContext } from 'react'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import { Link } from "react-router-dom";
import Rating from './Rating';
import { Store } from '../Store';
import axios from 'axios';

function Product(props) {
    const { product } = props;

    const { state, dispatch: ctxDispatch } = useContext(Store);
    const { cart: { cartItems } } = state;

    const addToCartHandler = async (item) => {
        const existItem = cartItems.find((x) => x._id === product._id);
        const quantity = existItem ? existItem.quantity + 1 : 1;
        const { data } = await axios.get(`/api/products/product/${item._id}`);

        if (data.countInStock < quantity) {
            window.alert('Sorry. Product is out of stock')
            return;
        }

        ctxDispatch({
            type: 'CART_ADD_ITEM',
            payload: { ...item, quantity }
        });
    };

    return (
        <Card>
            <Link to={`/product/${product.slug}`} className='prod-img'>
                <img src={product.image} alt="" className='card-img-top' />
            </Link>
            <Card.Body className='card_body'>
                <Link to={`/product/${product.slug}`} style={{textDecoration: 'none'}}>
                    <Card.Title style={{height: "35px"}}>{product.name}</Card.Title>
                </Link>
                <Rating rating={product.rating} numReviews={product.numReviews}></Rating>
                <Card.Text>${product.price}</Card.Text>

                {/* show stock count */}
                <Card.Text>                    
                    <strong>In Stock:</strong>{" "}
                    {product.countInStock > 0 ? (                       
                        <span className='color__green fw-bold'> 
                            {" "}
                            {product.countInStock} items{" "}
                        </span>
                    ) : (
                        <span className='color__red fw-bold'>
                            {" "}
                            {product.countInStock} items{" "}
                        </span>
                    )}
                </Card.Text>

                {product.countInStock === 0 ? (
                    <Button variant='danger' disabled>חסר במלאי</Button>
                ) : (
                    <Button onClick={() => addToCartHandler(product)}>הוסף לסל</Button>
                )}

            </Card.Body>
        </Card>
    )
}

export default Product 
