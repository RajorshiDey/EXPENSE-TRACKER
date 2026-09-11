const {register, login} = require('../controllers/authController');
const {protect} = require('../middlewares/authMiddleware');

const router = require('express').Router();

router.post('/register', register);
router.post('/login', login);

router.get("/profile", protect, (req, res) => {
    res.json({
        success: true,
        message: "You are authenticated",
        user: req.user
    });
});


module.exports = router;