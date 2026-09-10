const mongoose = require("mongoose");
const User = require("../models/user.model");

const findUserByEmail = async (email) => {
    console.log("CHECKING USER:", email);
    console.log("MONGOOSE READY STATE:", mongoose.connection.readyState);

    try {
        const user = await User.findOne({ email }).exec();

        console.log("USER SEARCH COMPLETE:", user);

        return user;
    } catch (error) {
        console.error("FIND USER ERROR:", error);
        throw error;
    }
};

const createUser = async (userData) => {
    console.log("CREATING USER...");

    try {
        const user = await User.create(userData);

        console.log("USER CREATED:", user);

        return user;
    } catch (error) {
        console.error("CREATE USER ERROR:", error);
        throw error;
    }
};

module.exports = {
    findUserByEmail,
    createUser
};