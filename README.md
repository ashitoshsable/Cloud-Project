<!-- # My Courses Backend

This is a Node.js and Express backend application that provides a REST API for managing course data. Originally designed to store data in a local file, this backend now integrates with MongoDB using Mongoose for persistent data storage.

## Features

- **Course Management**: Create, retrieve, update, and delete course records.
- **MongoDB Integration**: Uses MongoDB as the primary data store, with Mongoose for modeling and data validation.
- **RESTful API**: Exposes a simple API to interact with course data.

## Project Structure

```
my-courses-backend/
├── server.js          # Main server file
├── models/
│   └── Course.js      # Mongoose model for course data
├── routes/
    └── courseRoutes.js # API routes for course operations
```

## Getting Started

### Prerequisites

- **Node.js** and **npm**
- **MongoDB** database
- **dotenv** for environment variable management

### Installation

1. Clone the repository:
   ```
   git clone https://github.com/yourusername/my-courses-backend.git
   cd my-courses-backend
   ```
2. Install dependencies:
    ```
    npm install
    ```
3. Create a .env file in the root directory with the following variable:
    ```
    MONGO_URI=your-mongodb-connection-string
    ```
4. Start the server:
    ```
   npm start
    ```
   The server will run on http://localhost:3000 by default.

## API Endpoints

| Method | Endpoint           | Description                       |
|--------|---------------------|-----------------------------------|
| GET    | `/api/courses`      | Retrieve all courses             |
| GET    | `/api/course/:id`   | Retrieve a specific course by ID |
| POST   | `/api/course`       | Add a new course                 |
| PUT    | `/api/course/:id`   | Update a course by ID            |
| DELETE | `/api/course/:id`   | Delete a course by ID            |

## Project Dependencies

- Express - Fast, unopinionated, minimalist web framework for Node.js
- Mongoose - MongoDB object modeling tool designed to work in an asynchronous environment
- dotenv - Loads environment variables from a .env file
- Nodemon - Development utility that monitors for any changes in your source and automatically restarts the server
 -->
