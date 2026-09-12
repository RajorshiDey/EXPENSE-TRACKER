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

const login = async (req, res) => {
    try {

        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: "Email and password are required"
            });
        }

        const user = await authService.loginUser(email, password);

        res.cookie(
            "token",
            user.token,
            {
                httpOnly: true,
                secure: true,
                maxAge: 2 * 24 * 60 * 60 * 1000 // 2 days
            }
        )

        return res.status(200).json({
            success: true,
            message: "User logged in successfully",
            user
        });

    } catch (err) {
        console.error("LOGIN ERROR:", err.message);
        return res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
}

const logout = (req, res) => {
    res.clearCookie("token", {
        httpOnly: true,
        secure: true
    });

    return res.status(200).json({
        success: true,
        message: "User logged out successfully"
    });
}

module.exports = {
    register,
    login,
    logout
};