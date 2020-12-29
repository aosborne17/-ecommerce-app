import express  from 'express'
import products from'./data/products.js'
import dotenv from 'dotenv'
import connectDB from './config/db.js'

const app = express()

dotenv.config()

connectDB()

app.get('/' , (req, res) =>{
    res.send('API is up and running')
})


app.get('/api/products' , (req, res) =>{
    // this will convert it to json content
    res.json(products)
})


app.get('/api/products/:id' , (req, res) =>{
    // depending on what product the user clicks to see, we will get that id and return the product with that id
    // thus instead of showing the whole array, we will show one product
    const product = products.find(product => product._id === req.params.id)
    res.json(product)
})


const port = process.env.PORT || 5000

app.listen(port, console.log(`Server running in ${process.env.NODE_ENV} mode on port ${port}`))