# API Documentation

## Base URL

```
http://localhost:5000/api
```

## Authentication

All protected routes require a JWT token in the Authorization header:

```
Authorization: Bearer <token>
```

---

## Auth Endpoints

### Register User

**POST** `/auth/register`

**Request Body:**

```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123",
  "role": "user"
}
```

**Response:** `201 Created`

```json
{
  "success": true,
  "message": "User registered successfully",
  "data": {
    "user": {
      "id": "user_id",
      "name": "John Doe",
      "email": "john@example.com",
      "role": "user"
    },
    "token": "jwt_token_here"
  }
}
```

### Login

**POST** `/auth/login`

**Request Body:**

```json
{
  "email": "john@example.com",
  "password": "password123"
}
```

**Response:** `200 OK`

```json
{
  "success": true,
  "message": "Login successful",
  "data": {
    "user": {
      "id": "user_id",
      "name": "John Doe",
      "email": "john@example.com",
      "role": "user",
      "avatar": "avatar_url"
    },
    "token": "jwt_token_here"
  }
}
```

### Get Current User

**GET** `/auth/me` 🔒

**Response:** `200 OK`

```json
{
  "success": true,
  "data": {
    "_id": "user_id",
    "name": "John Doe",
    "email": "john@example.com",
    "role": "user",
    "avatar": "avatar_url"
  }
}
```

---

## Project Endpoints

### Get All Projects

**GET** `/projects` 🔒

**Query Parameters:**

- `status` - Filter by status (planning, active, on-hold, completed, archived)
- `priority` - Filter by priority (low, medium, high, critical)

**Response:** `200 OK`

```json
{
  "success": true,
  "count": 2,
  "data": [
    {
      "_id": "project_id",
      "name": "Website Redesign",
      "description": "Redesign company website",
      "owner": {
        "_id": "user_id",
        "name": "John Doe",
        "email": "john@example.com"
      },
      "members": [],
      "status": "active",
      "priority": "high",
      "progress": 0,
      "createdAt": "2024-01-01T00:00:00.000Z"
    }
  ]
}
```

### Get Single Project

**GET** `/projects/:id` 🔒

**Response:** `200 OK`

```json
{
  "success": true,
  "data": {
    "_id": "project_id",
    "name": "Website Redesign",
    "description": "Redesign company website",
    "owner": {...},
    "members": [...],
    "tasks": [...],
    "status": "active",
    "priority": "high"
  }
}
```

### Create Project

**POST** `/projects` 🔒

**Request Body:**

```json
{
  "name": "Mobile App Development",
  "description": "Build iOS and Android apps",
  "status": "planning",
  "priority": "medium",
  "startDate": "2024-01-15",
  "endDate": "2024-06-30",
  "budget": 50000
}
```

**Response:** `201 Created`

### Update Project

**PUT** `/projects/:id` 🔒

**Request Body:**

```json
{
  "status": "active",
  "progress": 25
}
```

**Response:** `200 OK`

### Delete Project

**DELETE** `/projects/:id` 🔒

**Response:** `200 OK`

---

## Task Endpoints

### Get All Tasks

**GET** `/tasks` 🔒

**Query Parameters:**

- `project` - Filter by project ID
- `status` - Filter by status
- `priority` - Filter by priority
- `assignedTo` - Filter by assigned user ID

**Response:** `200 OK`

```json
{
  "success": true,
  "count": 5,
  "data": [
    {
      "_id": "task_id",
      "title": "Design homepage mockup",
      "description": "Create initial design",
      "project": {
        "_id": "project_id",
        "name": "Website Redesign"
      },
      "assignedTo": {
        "_id": "user_id",
        "name": "Jane Smith",
        "email": "jane@example.com",
        "avatar": "avatar_url"
      },
      "createdBy": {...},
      "status": "in-progress",
      "priority": "high",
      "dueDate": "2024-12-31T00:00:00.000Z",
      "estimatedHours": 8,
      "tags": ["design", "ui"],
      "createdAt": "2024-01-01T00:00:00.000Z"
    }
  ]
}
```

### Get Single Task

**GET** `/tasks/:id` 🔒

**Response:** `200 OK`

```json
{
  "success": true,
  "data": {
    "_id": "task_id",
    "title": "Design homepage mockup",
    "description": "Create initial design mockup for homepage",
    "project": {...},
    "assignedTo": {...},
    "createdBy": {...},
    "status": "in-progress",
    "priority": "high",
    "dueDate": "2024-12-31",
    "estimatedHours": 8,
    "actualHours": 5,
    "tags": ["design", "ui"],
    "comments": [...]
  }
}
```

### Create Task

**POST** `/tasks` 🔒

**Request Body:**

```json
{
  "title": "Implement user authentication",
  "description": "Add JWT-based authentication",
  "project": "project_id",
  "assignedTo": "user_id",
  "status": "todo",
  "priority": "high",
  "dueDate": "2024-12-31",
  "estimatedHours": 16,
  "tags": ["backend", "security"]
}
```

**Response:** `201 Created`

### Update Task

**PUT** `/tasks/:id` 🔒

**Request Body:**

```json
{
  "status": "done",
  "actualHours": 18
}
```

**Response:** `200 OK`

### Delete Task

**DELETE** `/tasks/:id` 🔒

**Response:** `200 OK`

### Get Task Statistics

**GET** `/tasks/stats/summary` 🔒

**Response:** `200 OK`

```json
{
  "success": true,
  "data": {
    "total": 25,
    "byStatus": [
      { "_id": "todo", "count": 8 },
      { "_id": "in-progress", "count": 10 },
      { "_id": "done", "count": 5 },
      { "_id": "blocked", "count": 2 }
    ],
    "byPriority": [
      { "_id": "low", "count": 5 },
      { "_id": "medium", "count": 10 },
      { "_id": "high", "count": 8 },
      { "_id": "urgent", "count": 2 }
    ]
  }
}
```

---

## Comment Endpoints

### Get Comments for Task

**GET** `/comments?task=taskId` 🔒

**Response:** `200 OK`

```json
{
  "success": true,
  "count": 3,
  "data": [
    {
      "_id": "comment_id",
      "content": "Great progress on this task!",
      "task": "task_id",
      "author": {
        "_id": "user_id",
        "name": "John Doe",
        "email": "john@example.com",
        "avatar": "avatar_url"
      },
      "isEdited": false,
      "createdAt": "2024-01-01T12:00:00.000Z"
    }
  ]
}
```

### Create Comment

**POST** `/comments` 🔒

**Request Body:**

```json
{
  "task": "task_id",
  "content": "This looks good, let's proceed!"
}
```

**Response:** `201 Created`

### Update Comment

**PUT** `/comments/:id` 🔒

**Request Body:**

```json
{
  "content": "Updated comment text"
}
```

**Response:** `200 OK`

### Delete Comment

**DELETE** `/comments/:id` 🔒

**Response:** `200 OK`

---

## User Endpoints

### Get All Users

**GET** `/users` 🔒

**Response:** `200 OK`

```json
{
  "success": true,
  "count": 10,
  "data": [
    {
      "_id": "user_id",
      "name": "John Doe",
      "email": "john@example.com",
      "role": "user",
      "avatar": "avatar_url",
      "isActive": true
    }
  ]
}
```

### Get Single User

**GET** `/users/:id` 🔒

**Response:** `200 OK`

### Update User

**PUT** `/users/:id` 🔒

**Request Body:**

```json
{
  "name": "John Updated",
  "avatar": "new_avatar_url"
}
```

**Response:** `200 OK`

---

## Error Responses

### 400 Bad Request

```json
{
  "success": false,
  "message": "Validation error message"
}
```

### 401 Unauthorized

```json
{
  "success": false,
  "message": "Not authorized to access this route"
}
```

### 403 Forbidden

```json
{
  "success": false,
  "message": "User role 'user' is not authorized to access this route"
}
```

### 404 Not Found

```json
{
  "success": false,
  "message": "Resource not found"
}
```

### 500 Internal Server Error

```json
{
  "success": false,
  "message": "Error message",
  "error": "Detailed error (in development mode)"
}
```

---

## Notes

- 🔒 indicates protected routes requiring authentication
- All dates are in ISO 8601 format
- All responses include a `success` boolean field
- Pagination can be added to list endpoints if needed
- Rate limiting should be implemented in production
