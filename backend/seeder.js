import mongoose from 'mongoose'
import users from './data/users.js'
import products from './data/products.js'
import dotenv from 'dotenv'
import User from './models/userModel.js'
import Product from './models/productModel.js'
import Order from './models/orderModel.js'
import connectDB from './config/db.js'

// We must import all these things seperately as this file is completely unrelated to our server
// It runs by itself

dotenv.config()

connectDB()


const importData = async () => {
    try {
        // this will delete everything from each schema in our database
        await Order.deleteMany()
        await Product.deleteMany()
        await User.deleteMany()

        // This will insert the array of users we have created into our users schema
        const createdUsers = await User.insertMany(users)

        const adminUser = createdUsers[0]._id

        const sampleProducts = products.map(product =>{
            // We are copying the whole product into the sample products array
            // we are then changing the value of the user key to be equal to the admin user
            // this means that that admin created all these products
            return {
                ...product, user: adminUser
            }
        })

        await Product.insertMany(sampleProducts)
        console.log('Data Imported')
        process.exit()
    } catch(err) {
        console.error(err)
        process.exit(1)

    }
}



const destroyData = async () => {
    try {
        // this will delete everything from each schema in our database
        await Order.deleteMany()
        await Product.deleteMany()
        await User.deleteMany()

        console.log('Data Destroyed')
        process.exit()
    } catch(err) {
        console.error(err)
        process.exit(1)

    }
}


if(process.argv[2] === '-d') {
    destroyData()
}else {
    importData()
}