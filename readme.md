# Task Manager API

## Overview

This project is a simple Task Manager API built using Node.js and Express. It allows users to create, read, update, and delete tasks. This API was developed as Assignment 1 for the backend engineering launchpad.

## Setup Instructions

Follow these steps to get the Task Manager API running on your local machine:

1.  **Prerequisites:**
    * [Node.js](https://nodejs.org/) (version 18.0.0 or higher is required)
    * [npm](https://www.npmjs.com/) (usually installed with Node.js)

2.  **Clone the repository (if applicable):**
    ```bash
    git clone <your_repository_url>
    cd task-manager
    ```

3.  **Install dependencies:**
    ```bash
    npm install
    ```

4.  **Run the development server:**
    ```bash
    npm run dev
    ```
    This command uses `nodemon` to automatically restart the server when you make changes to the code. The server will be running on `http://localhost:3000`.

## API Endpoints

All API endpoints are prefixed with `/tasks`.

### 1. Create a new task

* **Endpoint:** `POST /tasks`
* **Request Body (JSON):**
    ```json
    {
        "title": "Buy groceries",
        "description": "Milk, eggs, bread, and cheese",
        "completed": false
    }
    ```
* **Response (JSON) - Success (HTTP 201 Created):**
    ```json
    {
        "id": "someUniqueId",
        "title": "Buy groceries",
        "description": "Milk, eggs, bread, and cheese",
        "completed": false
    }
    ```
* **Testing:**
    You can use tools like `curl`, Postman, or Insomnia to send a POST request to `http://localhost:3000/tasks` with the JSON request body.

    **Using `curl`:**
    ```bash
    curl -X POST -H "Content-Type: application/json" -d '{"title": "Walk the dog", "description": "Take the dog for a 30-minute walk", "completed": false}' http://localhost:3000/tasks
    ```

### 2. Get all tasks

* **Endpoint:** `GET /tasks`
* **Response (JSON) - Success (HTTP 200 OK):**
    ```json
    [
        {
            "id": "someUniqueId1",
            "title": "Buy groceries",
            "description": "Milk, eggs, bread, and cheese",
            "completed": false
        },
        {
            "id": "someUniqueId2",
            "title": "Walk the dog",
            "description": "Take the dog for a 30-minute walk",
            "completed": false
        }
        // ... more tasks
    ]
    ```
* **Testing:**
    Open your web browser or use `curl`, Postman, or Insomnia to send a GET request to `http://localhost:3000/tasks`.

    **Using `curl`:**
    ```bash
    curl http://localhost:3000/tasks
    ```

### 3. Get a specific task

* **Endpoint:** `GET /tasks/:id`
* **Path Parameter:**
    * `id`: The unique identifier of the task.
* **Response (JSON) - Success (HTTP 200 OK):**
    ```json
    {
        "id": "someUniqueId",
        "title": "Buy groceries",
        "description": "Milk, eggs, bread, and cheese",
        "completed": false
    }
    ```
* **Response (JSON) - Not Found (HTTP 404 Not Found):**
    ```json
    {
        "message": "Task not found"
    }
    ```
* **Testing:**
    Replace `:id` with the actual ID of a task when making the request.

    **Using `curl`:**
    ```bash
    curl http://localhost:3000/tasks/your_task_id
    ```

### 4. Update an existing task

* **Endpoint:** `PUT /tasks/:id`
* **Path Parameter:**
    * `id`: The unique identifier of the task to update.
* **Request Body (JSON):**
    ```json
    {
        "title": "Buy groceries and snacks",
        "completed": true
    }
    ```
    *(Note: You can send only the fields you want to update)*
* **Response (JSON) - Success (HTTP 200 OK):**
    ```json
    {
        "id": "someUniqueId",
        "title": "Buy groceries and snacks",
        "description": "Milk, eggs, bread, and cheese",
        "completed": true
    }
    ```
* **Response (JSON) - Not Found (HTTP 404 Not Found):**
    ```json
    {
        "message": "Task not found"
    }
    ```
* **Testing:**
    Replace `:id` with the actual ID of the task.

    **Using `curl`:**
    ```bash
    curl -X PUT -H "Content-Type: application/json" -d '{"title": "Walk the dog in the park", "completed": true}' http://localhost:3000/tasks/your_task_id
    ```

### 5. Delete a task

* **Endpoint:** `DELETE /tasks/:id`
* **Path Parameter:**
    * `id`: The unique identifier of the task to delete.
* **Response (JSON) - Success (HTTP 204 No Content):**
    *(No response body is typically sent for successful deletion)*
* **Response (JSON) - Not Found (HTTP 404 Not Found):**
    ```json
    {
        "message": "Task not found"
    }
    ```
* **Testing:**
    Replace `:id` with the actual ID of the task.

    **Using `curl`:**
    ```bash
    curl -X DELETE http://localhost:3000/tasks/your_task_id
    ```

## Testing the API

You can use various tools to test the API endpoints:

* **Web Browsers:** For `GET` requests, you can directly enter the API endpoint URL in your browser.
* **`curl`:** A command-line tool for making HTTP requests. It's very versatile for testing different HTTP methods and request bodies.
* **Postman:** A popular GUI tool for building, testing, and documenting APIs.
* **Insomnia:** Another excellent GUI tool for designing and debugging APIs.
* **Supertest:** As indicated in your `package.json` (`devDependencies`), `supertest` is likely used for writing automated integration tests for your API. You can run these tests using the `npm test` command.

```bash
npm test