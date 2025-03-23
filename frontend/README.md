# Frontend Project

## Setup and Run Locally

### Prerequisites

- Node.js (version >= 16)
- npm

### Steps

1. Clone the repository:

   ```
   git clone <repository-url>
   cd frontend
   ```

2. Install dependencies:

   ```npm install

   ```

3. Run the development server:

   ```npm run dev

   ```

   The project will be running at `http://localhost:3000`.

## How to Use

- After running the server, you can navigate to `http://localhost:3000` in your browser.
- You can start developing and the server will reload automatically for any code changes.
- create user from register page

## Scripts in `package.json`

- **`dev`**: Runs the development server with Turbopack for faster page refreshes and optimizations. Use this in development mode.
  `   npm run dev`

- **`build`**: Builds the project for production. This optimizes the app for best performance.

  ```npm run build

  ```

- **`start`**: Starts the production server after the build has been completed.

  ```npm run start

  ```

- **`lint`**: Lints the codebase using Next.js linting rules to ensure your code is clean and follows best practices.

  ```npm run lint

  ```

  ## Features Implemented

### 1. **GIT & Source Control**

### 2. **TypeScript**

- The entire project is built using TypeScript to ensure type safety, with interfaces and types used where appropriate.

### 3. **Next.js**

- Used the Next.js App Router for routing.
- The app supports multiple languages (English and Arabic) for localization.

### 4. **TailwindCSS**

- The application is styled using only TailwindCSS, ensuring a clean, responsive, and visually appealing UI.

### 5. **Form Validation**

- Implemented form validation (login/sigup page) to ensure that user inputs are valid.
- User-friendly error messages are provided for invalid inputs.

### 7. **Responsive Design**

- The application is fully responsive, working well across different screen sizes and devices.

### 8. **ESLint and Prettier**

- ESLint has been set up for linting to enforce coding standards.
- Prettier is configured to ensure consistent code formatting across the project.

### 9. **Authentication**

- User authentication is implemented using JWT tokens stored in cookies.
- Users can log in using either their email.
- if user make refresh we use token to fetch it's data again and still on same page.


