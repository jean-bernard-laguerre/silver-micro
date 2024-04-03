# Node.js Starter Project with JWT Authentication

This project is a starter codebase for building a Node.js application with a login module using JSON Web Tokens (JWT) and middleware.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

What things you need to install the software and how to install them:

- Node.js
- npm

### Installing

A step by step series of examples that tell you how to get a development environment running:

1. Clone the repository
2. Install dependencies with `npm install`
3. Start the server with `npm start`

> :warning: **Before starting the server, make sure to modify the database name in `src/database.js` to match your local database configuration.**

## Usage

How to use this project:

1. Register a new user by making a POST request to `/api/v1/register` with a username and password.
2. Login with a POST request to `/api/v1/auth` with your username and password. You will receive a JWT token in response.
3. Make authenticated requests to protected routes by including the JWT token in the Authorization header.

## Built With

- [Node.js](https://nodejs.org/) - The web framework used
- [Express](https://expressjs.com/) - Minimalist web framework for Node.js
- [jsonwebtoken](https://www.npmjs.com/package/jsonwebtoken) - Used to create access tokens
- [Sequelize](https://sequelize.org/) - A promise-based Node.js ORM for Postgres, MySQL, MariaDB, SQLite and Microsoft SQL Server.
