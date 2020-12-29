const express = require('express')
const products = require('./data/products')

const app = express()

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

app.listen(5000, console.log("Server running on port 5000"))