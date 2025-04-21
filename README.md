
# Task Management

A full-stack task management application built using React, Node.js, Express, and MySQL. This project allows users to register, log in, and manage their personal tasks. Authentication is securely handled via JWT tokens stored in HTTP-only cookies.


## Features and Functionalities

- User Authentication
- JWT with HTTP-only cookies
- Task management
- Context API for managing global auth state
- Protected routes for authenticated users only



## Tech Stack

**Client:** React.js, Vanilla CSS

**Server:** Node.js, Express.js

**Database:** MySQL




## Authentication Flow

- On successful login, the server sets an HTTP-only cookie containing the JWT token.

- This token is automatically sent with requests and used to authenticate protected endpoints.
- Logging out clears the cookie from the browser.
## API Endpoints

**User Routes (/api/users)**

- POST /register – Register a new user
- POST /login – Authenticate and set cookie
- POST /logout – Clear cookie and logout
- GET /is-Auth – Fetch currently logged-in user's info

**Task Routes (/api/tasks)**

- GET / – Get all tasks of the logged-in user
- POST / – Add a new task
- DELETE /:id – Delete a task by ID
## Run Locally
These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.


**Prerequisites**

- NPM / Yarn and Node.js installed


Clone the project


```bash
  git clone https://github.com/AmanSingh44/task-management
```

Go to the project directory

```bash
  cd task-management
```
**Backend Setup**

Go to backend folder

```bash
  cd backend
```

Install dependencies

```bash
  npm install
```

Create a .env file and add the following

```bash
  PORT=5000
  JWT_SECRET= youe secret key
  FRONTEND_ORIGIN = your origin, default for vite :'http://localhost:5173'
  HOST=localhost
  USER= your username
  PASSWORD=
  DBNAME= your databaase name
```
Start the server

```bash
  npm start
```
**Frontend Setup**

Go to frontend folder

```bash
  cd ../frontend
```

Install dependencies

```bash
  npm install
```
Start the development server

```bash
  npm run dev
```

Access the web app at  http://localhost:5173
