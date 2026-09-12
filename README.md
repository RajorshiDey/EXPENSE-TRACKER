# Expense Tracker API – Backend
### Approach Documentation

A secure REST API for expense management with Express.js, MongoDB, JWT authentication, and bcrypt password hashing.


## STEP 1: Set up Express + MongoDB connection ##
* Creating db.js inside '/config' folder
* In db.js, we will write a function named 'connectDB' that will connect with the MongoDB URI (**NOTE:** The connectDB function will use async-await and try-catch block)
* connectDB( ) will be imported in server.js file and then it will be called

## STEP 2: Create the User Model ##
* Creating user.model.js inside '/models' folder
* In user.model.js, we will create userSchema which will include:
    1. name
    2. email
    3. passwords
    4. timestamps

## STEP 3: Create the Expense Model ##
* Creating expense.model.js inside '/models' folder
* In expense.model.js, we will create expenseSchema which will include:
    1. user [This field type will be of objectID refering to the User Model]
    2. amount
    3. category
    4. description
    5. date
    6. timestamps

## STEP 4: Create Registration API ##

#### Flow of Registration ####

```
POST /api/auth/register
        ↓
Controller
        ↓
Check input
        ↓
Check if email already exists
        ↓
Hash password using bcrypt
        ↓
Save user in MongoDB
        ↓
Return success response
```

#### Files we will create for Registration API ####

```
controllers/
└── authController.js

services/
└── authService.js

repositories/
└── userRepository.js

routes/
└── authRoutes.js
```

* Inside userRepository.js we will craete functions that will handle database operations (findUserByEmail, createUser)
* Now, these functions will be imported in authService.js inside services folder, where registerUser( ) will be written that will handle hashing 
* Inside registerUser( ), check for:
    1. if user already exists 
    2. if yes, then throw error
    3. if no, then hash password and createUser

* Now, we will create a authController.js that will handle the http request using function
* This will be imported in authRoutes.js that will handle the post request
* At the end the router will be connected to app.js

## STEP 5: Login API + JWT ##
Flow of Login
```
POST /api/auth/login
        ↓
Find user by email
        ↓
Compare password using bcrypt
        ↓
Generate JWT
        ↓
Return token
```
* We will create a loginUser( ) function inside authService
* loginUser( ) will find user by email and then check the password with the hashed password stored in DB [Using bycript.compare( )]
* if password is matched, we will generate a jwt token and send it as response and also set it in cookies using cookie parser

#### Generating JWT Token ####
* We will use jwt.sign ( { data }, JWT-SECRET ,{ expiresIn : 2d } ) 

#### Setting jwt as cookie  ####

```
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
```

## STEP 6: JWT Authentication Middleware ##

Authentication Flow:
```
Request
   ↓
Does it contain JWT cookie?
   ↓
   YES
   ↓
Verify JWT
   ↓
Get userId
   ↓
req.user = decoded data
   ↓
Continue to route
```

* We will create a authMiddleware.js file inside middlewares folder which will check and verify jwt token
* We will create a protect( ) that will accept req, res and next parameters
* Inside protect( ), we will check for token inside ``` req.cookies.token ``` 
* Then, we will verify the token with JWT-SECRET
* We will store the verified token inside req.user
* We will call next()

#### Testing auth middleware in a protected route ####

```
router.get("/profile", protect, (req, res) => {
    res.json({
        success: true,
        message: "You are authenticated",
        user: req.user
    });
});
```

Here, protect is the middleware function

## STEP 7: Creating Logout Feature ##

* We will just remove the jwt token from cookies that will logout the user 
* Creating a logout( ) inside authController.js where the token is removed from cookies and export it
* Import the logout( ) inside auth routes and call it

Logic: 
```
res.clearCookie("token", {
        httpOnly: true,
        secure: true
    });
```