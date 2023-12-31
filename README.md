# SelfNodeCrudApi

# RESTful API with Node.js and MongoDB

This is a sample implementation of a RESTful API using Node.js and MongoDB. The API allows you to perform CRUD (Create, Read, Update, Delete) actions on a "users" resource and includes authentication using JSON Web Tokens (JWT).

## Prerequisites

- Node.js (version 18.16.0) or later
- MongoDB (version 5.0) or later

## Getting Started

1. Clone the repository:

   ```bash
   git clone https://github.com/PrimotionStudio/SelfNodeCrudApi.git
   ```

2. Navigate to the project directory:

   ```bash
   cd SelfNodeCrudApi
   ```

3. Install the dependencies:

   ```bash
   npm install
   ```

4. Start the application:

   ```bash
   npm test
   ```

5. The API server should now be running on `http://localhost:5000`.

## API Documentation

### Authentication

- **POST** `http://localhost:5000/api/login`

  Authenticate a user and generate a JWT token.

  Request Body:

  ```json
  {
    "username": "user@example.com",
    "password": "password"
  }
  ```

  Response:

  ```json
  {
    "message": "Login Successful",
    "loginkey": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiTWFydGlucyBPa2FubGF3b24iLCJpYXQiOjE2ODgyNTM5NDMsImV4cCI6MTY4ODI1NzU0M30.TrvgzpGBWesCfbYFksaHxD2QitYesZ74OOhowSGug-4"
  }
  ```

  Note: Include the JWT loginkey in the request header for authenticated routes (`Authorization: Bearer <loginkey>`).

### Users

- **POST** `http://localhost:5000/api/register`

  Create a new user.

  Request Body:

  ```json
  {
    "name": "John Doe",
    "email": "john.doe@example.com",
    "phone": "08012345678",
    "password": "password"
  }
  ```

  Response:

  ```json
  {
    "message": "New User Created Successfully"
  }
  ```

- **GET** `http://localhost:5000/api/users`

  Get all users.

  Response:

  ```json
  [
    {
      "_id": "649f16f81c309a35b360211f",
      "name": "John Doe",
      "email": "johndoe@gmail.com",
      "phone": "08012345678",
      "password": "$2a$10$CS1yiKHo6NeDWYCTxOMgDOCQR6fRnaM1lznb8ytQBgIh0BiKz9FAW",
      "createdAt": "2023-06-30T17:55:04.195Z",
      "updatedAt": "2023-07-01T09:00:07.501Z",
      "__v": 0
    },
    {
      "_id": "64a0b6cb15ba2fb9e24a43c8",
      "name": "Jane Doe",
      "email": "janedoe@gmail.com",
      "phone": "0800987654",
      "password": "$2a$10$Y1TMjproZLYqFqFKhYtApuKbNy49JR5D67D9LvR4571HZxPnOZ3Ce",
      "createdAt": "2023-07-01T23:29:15.702Z",
      "updatedAt": "2023-07-01T23:29:15.702Z",
      "__v": 0
    }
  ]
  ```

- **GET** `http://localhost:5000/api/users/:userid`

  Get a specific user by ID.

  Response:

  ```json
  {
    "_id": "649f16f81c309a35b360211f",
    "name": "John Doe",
    "email": "johndoe@gmail.com",
    "phone": "08012345678",
    "password": "$2a$10$CS1yiKHo6NeDWYCTxOMgDOCQR6fRnaM1lznb8ytQBgIh0BiKz9FAW",
    "createdAt": "2023-06-30T17:55:04.195Z",
    "updatedAt": "2023-07-01T09:00:07.501Z",
    "__v": 0
  }
  ```

- **PUT** `http://localhost:5000/api/users/:userid`

  Update a user by ID.

  Request Body:

  ```json
  {
    "name": "John Jeffery Doe Name",
    "email": "jj.doe@yahoo.com",
    "password": "newpassword"
  }
  ```

  Response:

  ```json
  {
    "message": "User updated successfully"
  }
  ```

- **DELETE** `http://localhost:5000/api/users/:userid`

  Delete a user by ID.

  Response:

  ```json
  {
    "message": "User deleted successfully"
  }
  ```

## Error Handling

If an error occurs during the API requests or server operations,

the API will respond with appropriate status codes and error messages in the following format:

```json
{
  "message": "An error occured!"
}
```

## Contributing

Contributions are welcome! If you find any issues or have suggestions for improvements, please open an issue or submit a pull request.

## License

This project is licensed under the [MIT License](https://opensource.org/licenses/MIT).
