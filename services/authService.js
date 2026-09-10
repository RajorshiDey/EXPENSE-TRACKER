const bcrypt = require('bcrypt');
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

module.exports = {registerUser};