# Stock Trades API

## Overview

The Stock Trades API is a RESTful web service built using Node.js and Express. It allows users to manage and retrieve stock trade records. This API features user authentication via JWT and provides endpoints for creating and retrieving trade records.

## Features

- **User Authentication**: Users can sign up and log in using their email and password. JWT-based authentication is used to secure the routes.
- **Trade Management**: Users can create new trades, retrieve all trades, or retrieve specific trades by ID.
- **Validation**: Request payloads are validated using Joi to ensure data integrity.
- **Error Handling**: Comprehensive error handling for invalid requests and unsupported HTTP methods.


## Libraries and Tools Used

- **[Express.js](https://expressjs.com/)**: A fast, minimalist web framework for Node.js.
- **[Joi](https://joi.dev/)**: Used for data validation to ensure that requests contain valid and well-formed data.
- **[jsonwebtoken](https://github.com/auth0/node-jsonwebtoken)**: Used to implement JWT-based authentication.
- **[MySQL](https://www.mysql.com/)**: A relational database used to store user and trade data.
- **[Prisma](https://www.prisma.io/)**: An ORM (Object-Relational Mapping) tool used for database interactions in a type-safe manner.
- **[bcrypt](https://github.com/kelektiv/node.bcrypt.js/)**: Used for hashing and comparing passwords securely.


## Prerequisites
Before setting up the project, ensure that you have the following installed on your machine:

- **Node.js** (v14.x or higher)
- **npm** (v6.x or higher)
- **MySQL** (v5.7 or higher)


## Setup Instructions
### 1. Clone the Repository

```bash
git clone https://github.com/shijasmhd/stock-trades-api-challenge.git
cd stock-trades-api-challenge
```

### 2. Install Dependencies
Install the required npm packages:

```bash
npm install
```

### 3. Configure Environment Variables
Create a .env file in the root of the project and configure following environment variables:

```bash
PORT=3000

DATABASE_URL="mysql://USER:PASSWORD@localhost:PORT_NO/DB_NAME"

PASSWORD_SALT_ROUNDS=10

REFRESH_TOKEN_KEY='REFRESH_TOKEN_SECRET_KEY'
ACCESS_TOKEN_KEY='ACCESS_TOKEN_SECRET_KEY'
```
Replace USER, PASSWORD, PORT_NO, DB_NAME, REFRESH_TOKEN_SECRET_KEY, ACCESS_TOKEN_SECRET_KEY with desired value

### 4. Set Up the Database
Make sure your MySQL server is running and create a new database. Then, set up the database schema using Prisma:

```bash
npx prisma migrate dev --name init
```
This command will generate the necessary tables in your MySQL database based on the Prisma schema defined in prisma/schema.prisma.

### 5. Start the Server
Start the Express server:

```bash
npm start
```
The server will run on http://localhost:3000 by default. You can change the port by configuring the PORT variable in the .env file.

### 6. API Endpoints

Authentication:\
`POST /users/signup` - Sign up a new user\
`POST /users/login` - Log in an existing user and receive a JWT token\

Trades:\
`POST /trades` - Create a new trade (requires authentication)\
`GET /trades` - Retrieve all trades (requires authentication)\
`GET /trades/` - Retrieve a specific trade by ID (requires authentication)\

### 7. Testing
To test the API, you can use tools like Postman or cURL. Make sure to include the JWT token in the Authorization header for endpoints that require authentication.

Example:
```bash
curl -X GET http://localhost:3000/trades -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

### Troubleshooting
Ensure your MySQL server is running and accessible.
Double-check that your .env file is correctly configured with your database credentials.
If migrations fail, verify that your MySQL version is compatible with Prisma.