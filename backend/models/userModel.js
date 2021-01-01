import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'



const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    isAdmin: {
        type: Boolean,
        required: true,
        default: false
    }
}, {
    timestamps: true
})

userSchema.methods.matchPassword = async function(enteredPassword) {

    // As we are calling the function on the userSchema we use this.password to access the password
    return await bcrypt.compare(enteredPassword, this.password)
}

userSchema.pre('save', async function(next) {

    // We only want to generate a salt if our password field has been modified
    if (!this.isModified('password')) {
        next()
    }
    const salt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password, salt)

})

const User = mongoose.model('User', userSchema)

export default User