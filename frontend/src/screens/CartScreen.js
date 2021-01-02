import React, {useEffect} from 'react'
import {Link} from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'
import Message from '../components/Message'
import {Row, Col, ListGroup, Image, Form, Button, Card} from 'react-bootstrap'
import {addToCart, removeFromCart} from '../actions/cartActions'




const CartScreen = ({match, location, history}) => {

    // Getting the product id from the url
    const productId = match.params.id

    // To access query strings in the url, we must use location.search
    // location.search will return a string like '?qty=4'
    // However we only want the number, this means we can split the sstring at the = sign
    // This will then return to us two strings, and we can access the last string by getting it's index, (1)
    // Finally we will change the string type to a number by wrapping it in the Number() method

    const qty = location.search ? Number(location.search.split('=')[1]) : 1

    const dispatch = useDispatch()

    // useSelector allow us to get the data from our cart so we can actually display it in our frontend
    // Here we are getting everything from the cart state

    // Also, the useSelector reruns whenever the cart state changes, this means that when we change the quantity, the component will re-render to show the price changes etc
    const cart = useSelector(state => state.cart)
    // We now destructure our cart state and get the cartItems as that is all we need for this screen
    // In our return method we can now display all the items in the users cart, the total cost of the cart etc.
    const {cartItems} = cart


    // We only want to dispatch the addToCart if there is a productId attached to it
    useEffect(() => {
        if (productId) {
            // When we dispatch the action, we pass the product id and the quantity, both come from the url
            // This will allow us to update our cart items state
            dispatch(addToCart(productId, qty))
        }
        // We only want useEffect to rerun when either two of these dependencies are changed

    }, [dispatch, productId, qty])

    const removeFromCartHandler = (id) => {
        dispatch(removeFromCart(id))
    }

    const checkoutHandler = () => {
        history.push('/login?redirect=shipping')
        
    }
    return (
        <Row>
            <Col md={8}>
                <h1>Shopping Cart</h1>
                {cartItems.length === 0 ? <Message>Your cart is empty <Link to='/'>Go Back</Link></Message> : (
                    <ListGroup variant='flush'>
                        {cartItems.map(item =>(
                            <ListGroup.Item key={item.product}>
                                <Row>
                                    <Col md={2}>
                                        <Image src={item.image} alt={item.name} fluid rounded />
                                    </Col>
                                    <Col md={3}>
                                        <Link to={`/product/${item.product}`}>{item.name}</Link>
                                    </Col>
                                    <Col md={2}>
                                        ${item.price}
                                    </Col>
                                    
                                    <Col md={2}>
                                    {/* The onChange function here means that everytime we change the quantity or remove a product
                                    we will dispatch another action to our cart, and the state will be updated accordingly
                                    this will mean the price of the cart and the items in our basket will then also update automatically
                                    We pass in the item that we are selecting along with the quantity we are changing it to in our dispatch*/}
                                            <Form.Control as='select' value={item.qty} onChange={(e) => dispatch(addToCart(item.product, Number(e.target.value)))}>
                                                {[...Array(item.countInStock).keys()].map(x => (
                                                    <option key={x+1} value={x + 1}>
                                                        {x + 1}
                                                    </option>
                                                ))}
                                            </Form.Control>
                                    </Col>
                                    <Col md={2}>
                                            <Button type='button' variant='light' onClick={() => removeFromCartHandler(item.product)}>
                                                <i className='fas fa-trash'></i>
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
                    <ListGroup variant='flush'>
                        <ListGroup.Item>
                            <h2>Subtotal ({cartItems.reduce((acc, item) => acc + item.qty, 0)}) items</h2>
                            ${cartItems.reduce((acc,item) => acc + item.qty * item.price, 0).toFixed(2)}
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <Button type='button' className='btn-block' disabled={cartItems.length === 0} onClick={checkoutHandler}>
                                Proceed To Checkout
                            </Button>
                        </ListGroup.Item>
                    </ListGroup>
                </Card>
            </Col>
        </Row>
    )
}

export default CartScreen
