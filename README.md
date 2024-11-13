# My Courses Backend

This is a Node.js and Express backend application that provides a REST API for managing course data. Originally designed to store data in a local file, this backend now integrates with MongoDB using Mongoose for persistent data storage.

## Features

- **Course Management**: Create, retrieve, update, and delete course records.
- **MongoDB Integration**: Uses MongoDB as the primary data store, with Mongoose for modeling and data validation.
- **RESTful API**: Exposes a simple API to interact with course data.

## Project Structure

my-courses-backend/
├── server.js          # Main server file
├── models/
│   └── Course.js      # Mongoose model for course data
├── routes/
    └── courseRoutes.js # API routes for course operations


## Getting Started

### Prerequisites

- **Node.js** and **npm**
- **MongoDB** database
- **dotenv** for environment variable management

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/my-courses-backend.git
   cd my-courses-backend
   ```

