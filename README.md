# News Explorer — Backend

REST API built with **Node.js, Express 4, and MongoDB**, providing JWT authentication and user-specific saved article management.

**[Frontend Repository](https://github.com/jlcambraia/news-explorer-frontend)** · **[Deployed API](https://news-explorer-backend-954v.onrender.com)**

## Overview

This backend supports News Explorer's user accounts and saved news articles. It uses password hashing, JWT authentication, authorization middleware, request validation, and MongoDB persistence.

Developed during the **TripleTen Full Stack Web Development program**.

## Features

- User registration and login
- Password hashing with bcryptjs
- JWT-based authentication
- Protected user and article endpoints
- Retrieve authenticated user information
- Save, list, and delete articles belonging to the authenticated user
- Ownership checks for article deletion
- Celebrate/Joi validation
- Winston request and error logging

## Tech Stack

Node.js · Express 4 · MongoDB · Mongoose · JWT · bcryptjs · Celebrate/Joi · Winston · dotenv · CORS

## API Endpoints

| Method | Endpoint | Description |
| --- | --- | --- |
| POST | `/signup` | Register a user |
| POST | `/signin` | Sign in |
| GET | `/users/me` | Current user's profile |
| GET | `/articles` | Current user's saved articles |
| POST | `/articles` | Save an article |
| DELETE | `/articles/:articleId` | Delete an owned article |

The user and article routes are protected by authentication middleware.

## Authentication Flow

```text
Registration / Sign-in
        |
Password verification
        |
     JWT token
        |
Authenticated request
        |
Authorization middleware
        |
  Protected resources
```

## Getting Started

Requires Node.js, npm, and MongoDB.

```bash
git clone https://github.com/jlcambraia/news-explorer-backend.git
cd news-explorer-backend
npm install
```

The application's `app.js` reads the following environment variables:

```env
PORT=3000
MONGO_URL=mongodb://127.0.0.1:27017/newsexplorer
```

These are also the defaults used in `app.js`. Authentication-related configuration should be checked against the authentication modules before deploying. Never commit credentials or secrets.

```bash
npm run dev
# or
npm start
```

## Security and Validation

The project uses password hashing, JWT-based authentication, authorization middleware, article ownership checks, and request validation. These mechanisms have not been independently security-audited.

## Related Repository

[News Explorer — Frontend](https://github.com/jlcambraia/news-explorer-frontend)

## Potential Improvements

- Automated API and integration tests
- OpenAPI documentation
- Expanded error handling documentation
- Additional security testing

## Author

**João Luiz Cambraia** · [GitHub](https://github.com/jlcambraia) · [LinkedIn](https://www.linkedin.com/in/joaoluizcambraia/)
