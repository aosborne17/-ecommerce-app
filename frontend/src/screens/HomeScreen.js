import React, {useState, useEffect} from 'react'
import { Col, Row } from 'react-bootstrap'
// import products from '../products'
import Product from '../components/Product'
import axios from 'axios'

const HomeScreen = () => {
    const [products, setProducts] = useState([])

    // We could of used .then after the axios.get request and that would wait for the promise to finish
    // Or we could set the the function as async and then tell it to await the axios request before continuing
    useEffect(() => {
        const fetchProducts = async () => {
            const response = await axios.get('/api/products')

            setProducts(response.data)
        }

        fetchProducts()   
    }, [])
    return (
        <>
            <h1>Latest Products</h1>
            <Row>
                {products.map((product) =>(
                    <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                        <Product product={product} />
                    </Col>
                ))}
            </Row>
        </>
    )
}

export default HomeScreen
