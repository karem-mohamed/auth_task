# Backend Project

## Setup and Run Locally

### Prerequisites

- Node.js (version >= 16)
- npm
- MongoDB (local or cloud instance like MongoDB Atlas)

### Steps

1. Clone the repository:
   ```sh
   git clone <repository-url>
   cd backend
   ```

2. Install dependencies:
   ```sh
   npm install
   ```

3. Create a `.env` file and configure the necessary environment variables:
   ```env
   PORT=4000
   MONGO_URI=<your-mongodb-uri>
   JWT_SECRET=<your-secret-key>
   ```

4. Run the development server:
   ```sh
   npm run start:dev
   ```
   The server will be running at `http://localhost:4000`.

## API Documentation

- API documentation is available via PostMan.

## Authentication

- Uses **JWT tokens** stored in **cookies** for authentication.
- Supports login, signup, and logout functionalities.
- User passwords are securely hashed using **bcrypt**.
- DTO validation is implemented to ensure data integrity.

## Security Enhancements

- **Helmet** is used to set secure HTTP headers.
- **Rate limiting** is enforced using `express-rate-limit` to prevent brute-force attacks.
- **Input validation** is implemented using **class-validator** and **class-transformer**.

## Error Handling & Logging

- A centralized **error handler** is implemented for cleaner error responses.
- Logging is set up to track API requests and errors.

## Scripts in `package.json`

- **`start:dev`**: Runs the backend server in development mode with hot reloading.
  ```sh
  npm run start:dev
  ```

- **`build`**: Compiles the project for production.
  ```sh
  npm run build
  ```

- **`start`**: Starts the production server.
  ```sh
  npm run start
  ```

- **`lint`**: Runs ESLint to check for code quality issues.
  ```sh
  npm run lint
  ```

## Features Implemented

### 1. **Authentication & Authorization**
- Login and Signup with JWT authentication.
- Token validation and user sessions.

### 2. **Security Implementations**
- Hashed passwords using **bcrypt**.
- Secure HTTP headers with **Helmet**.
- Rate limiting with `express-rate-limit`.

### 3. **DTO Validation**
- Request data is validated using DTOs (`class-validator`).

### 4. **API Documentation**
- Integrated **POSTMAN** to document API endpoints.

### 5. **Error Handling & Logging**
- Custom error handler middleware.
- API request logging.

### 6. **Logout Functionality**
- Implemented logout by clearing the authentication token from cookies.

---

