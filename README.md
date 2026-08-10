# Tasker

A simple full-stack task management application for creating, organizing, and tracking daily tasks.

The project is built with a React frontend and Laravel backend, with a focus on clean API communication, authentication, and basic task management workflows.

## Features

* Create and manage tasks
* Mark tasks as completed
* Filter tasks by date
* User authentication
* RESTful API
* Responsive interface
* Secure authentication using JWT stored in HTTP-only cookies

## Tech Stack

**Frontend**

* React
* TypeScript
* Tailwind CSS
* Axios

**Backend**

* Laravel
* PHP
* REST API

**Database**

* MySQL

**Authentication**

* JWT
* HTTP-only cookies

---

## Project Structure

```text
tasker/
├── backend-api/    # Laravel REST API
├── frontend/       # React + TypeScript frontend
└── README.md
```
---

## Local Setup

### Prerequisites

Make sure the following are installed:

* PHP ^8.2
* Composer
* Node.js and npm
* MySQL
* Git

### 1. Clone the repository

```bash
git clone https://github.com/vasudevan19/tasker.git

cd tasker
```

### 2. Backend Setup

Navigate to the Laravel application:

```bash
cd backend
```

Install PHP dependencies:

```bash
composer install
```

Create the environment file:

```bash
cp .env.example .env
```

Generate the Laravel application key:

```bash
php artisan key:generate
```

### 3. Configure the Database

Create a MySQL database for the application.

Then update the database configuration in `.env`:

```env
DB_DATABASE=tasker
DB_USERNAME=root
DB_PASSWORD=
```

Run the migrations:

```bash
php artisan migrate
```
### 4. Start the Backend

```bash
php artisan serve
```

The Laravel API will be available at:

```text
http://127.0.0.1:8000
```

### 5. Frontend Setup

Open another terminal and navigate to the frontend:

```bash
cd frontend
```

Install dependencies:

```bash
npm install
```

Create the frontend environment file if required:

```bash
cp .env.example .env
```

Configure the API URL according to your Laravel backend:

```env
VITE_API_URL=http://127.0.0.1:8000
```

Start the development server:

```bash
npm run dev
```

The frontend will be available at the URL shown by Vite, typically:

```text
http://localhost:5173
```

---

## API

The Laravel application provides RESTful APIs for:

* Authentication
* User management
* Task creation and management
* Task completion
* Date-based task filtering

The frontend communicates with these APIs using Axios.

---

## Authentication

Tasker uses JWT-based authentication.

The authentication token is stored using **HTTP-only cookies** to prevent direct access to the token from client-side JavaScript.

---

## Development

Run the backend and frontend development servers separately:

**Backend**

```bash
php artisan serve
```

**Frontend**

```bash
npm run dev
```

---

## Future Improvements

Some areas I plan to explore as the project evolves:

* Automated testing
* Redis caching
* Background jobs
* CI/CD
* Docker
* Improved API documentation
* Better observability and logging

---

## Author

**Vasudevan M**

Backend Developer

[GitHub](https://github.com/vasudevan19)
