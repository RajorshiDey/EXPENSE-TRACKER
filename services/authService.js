const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const userRepository = require('../repositories/userRepository');

const registerUser = async (name, email, password)=>{
    const existingUser = await userRepository.findUserByEmail(email);

    if(existingUser){
        throw new Error('User already exists');
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await userRepository.createUser(
        {
            name,
            email,
            password: hashedPassword
        }
    )

    console.log("USER CREATED:", user);

    return {
        id: user._id,
        name: user.name,
        email: user.email
    }
}

const loginUser = async (email, password) => {
    const user = await userRepository.findUserByEmail(email);

    if (!user){
        throw new Error('User not found');
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid){
        throw new Error('Invalid password');
    }

    const token = await jwt.sign(
        {
            userId: user._id,
            email: user.email
        },
        process.env.JWT_SECRET,
        {
            expiresIn: '2d'
        }
    )

    return {
        id: user._id,
        name: user.name,
        email: user.email,
        token
    };
}

module.exports = {registerUser, loginUser};