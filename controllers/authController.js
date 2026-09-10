const authService = require("../services/authService");

const register = async (req, res) => {
    console.log("REGISTER ROUTE HIT");

    try {
        const { name, email, password } = req.body;

        console.log("REQUEST BODY:", req.body);

        if (!name || !email || !password) {
            return res.status(400).json({
                success: false,
                message: "All fields are required"
            });
        }

        const user = await authService.registerUser(
            name,
            email,
            password
        );

        return res.status(201).json({
            success: true,
            message: "User registered successfully",
            user
        });

    } catch (err) {
        console.error("REGISTER ERROR:", err.message);

        if (err.message === "User already exists") {
            return res.status(409).json({
                success: false,
                message: "User already exists"
            });
        }

        return res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
};

module.exports = {
    register
};