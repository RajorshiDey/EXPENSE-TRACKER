# ENTIRE WORKING FLOW AND APPROACH #

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

### STEP 3: Create the Expense Model ###
* Creating expense.model.js inside '/models' folder
* In expense.model.js, we will create expenseSchema which will include:
    1. user [This field type will be of objectID refering to the User Model]
    2. amount
    3. category
    4. description
    5. date
    6. timestamps

### STEP 3: Create Registration API ###

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
