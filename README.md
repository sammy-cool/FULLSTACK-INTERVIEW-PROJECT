# Full-Stack Task Management System (MERN)

A complete task management application built with the MERN stack, demonstrating multiple datasets, RESTful API design, and a full-featured frontend.

## 🎯 Project Overview

This project fulfills two main requirements:

1. **Backend Service**: RESTful API with multiple datasets and endpoints
2. **Frontend Feature**: Complete task management dashboard with full CRUD operations

## 📊 Architecture

### Backend (Node.js + Express + MongoDB)

**Multiple Datasets:**

- **Users** - Authentication and user management
- **Projects** - Project organization
- **Tasks** - Core task management
- **Comments** - Task discussions

**Key Features:**

- JWT-based authentication
- Role-based access control
- Data validation and error handling
- RESTful API design
- Population/relationships between collections
- Aggregation for statistics

### Frontend (React)

**Complete Task Management Feature:**

- Dashboard with task overview
- Real-time statistics display
- Task CRUD operations
- Advanced filtering (status, priority, project)
- Task details with comments
- Responsive design
- State management with Zustand
- API integration with React Query

## 🚀 API Endpoints

### Authentication

- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user (protected)

### Users

- `GET /api/users` - Get all users (protected)
- `GET /api/users/:id` - Get user by ID (protected)
- `PUT /api/users/:id` - Update user (protected)

### Projects

- `GET /api/projects` - Get all projects (protected)
- `GET /api/projects/:id` - Get project by ID (protected)
- `POST /api/projects` - Create project (protected)
- `PUT /api/projects/:id` - Update project (protected)
- `DELETE /api/projects/:id` - Delete project (protected)

### Tasks

- `GET /api/tasks` - Get all tasks with filters (protected)
- `GET /api/tasks/:id` - Get task by ID (protected)
- `POST /api/tasks` - Create task (protected)
- `PUT /api/tasks/:id` - Update task (protected)
- `DELETE /api/tasks/:id` - Delete task (protected)
- `GET /api/tasks/stats/summary` - Get task statistics (protected)

### Comments

- `GET /api/comments?task=taskId` - Get comments for task (protected)
- `POST /api/comments` - Create comment (protected)
- `PUT /api/comments/:id` - Update comment (protected)
- `DELETE /api/comments/:id` - Delete comment (protected)

## 💾 Data Models

### User Schema

```javascript
{
  name: String,
  email: String (unique),
  password: String (hashed),
  role: ['user', 'admin', 'manager'],
  avatar: String,
  isActive: Boolean,
  lastLogin: Date,
  timestamps: true
}
```

### Project Schema

```javascript
{
  name: String,
  description: String,
  owner: ObjectId (ref: User),
  members: [ObjectId] (ref: User),
  status: ['planning', 'active', 'on-hold', 'completed', 'archived'],
  priority: ['low', 'medium', 'high', 'critical'],
  startDate: Date,
  endDate: Date,
  tags: [String],
  budget: Number,
  progress: Number (0-100),
  timestamps: true
}
```

### Task Schema

```javascript
{
  title: String,
  description: String,
  project: ObjectId (ref: Project),
  assignedTo: ObjectId (ref: User),
  createdBy: ObjectId (ref: User),
  status: ['todo', 'in-progress', 'review', 'done', 'blocked'],
  priority: ['low', 'medium', 'high', 'urgent'],
  dueDate: Date,
  estimatedHours: Number,
  actualHours: Number,
  tags: [String],
  attachments: [{name, url, uploadedAt}],
  completedAt: Date,
  timestamps: true
}
```

### Comment Schema

```javascript
{
  content: String,
  task: ObjectId (ref: Task),
  author: ObjectId (ref: User),
  isEdited: Boolean,
  editedAt: Date,
  timestamps: true
}
```

## 🛠️ Setup Instructions

### Prerequisites

- Node.js (v14 or higher)
- MongoDB (local or MongoDB Atlas)
- npm or yarn

### Backend Setup

1. Navigate to backend directory:

```bash
cd backend
```

2. Install dependencies:

```bash
npm install
```

3. Create `.env` file:

```bash
cp .env.example .env
```

4. Update `.env` with your configuration:

```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/taskmanagement
JWT_SECRET=your_super_secret_jwt_key_change_this
NODE_ENV=development
```

5. Start MongoDB (if running locally):

```bash
mongod
```

6. Start the backend server:

```bash
npm run dev
```

Backend will run on `http://localhost:5000`

### Frontend Setup

1. Navigate to frontend directory:

```bash
cd frontend
```

2. Install dependencies:

```bash
npm install
```

3. Create `.env` file:

```bash
REACT_APP_API_URL=http://localhost:5000/api
```

4. Start the development server:

```bash
npm start
```

Frontend will run on `http://localhost:3000`

## 📱 Features Demonstration

### Backend Features

✅ Multiple related datasets (Users, Projects, Tasks, Comments)
✅ RESTful API with proper HTTP methods
✅ JWT authentication & authorization
✅ Data validation & error handling
✅ MongoDB relationships & population
✅ Aggregation queries for statistics
✅ Query filtering & sorting
✅ Middleware for authentication
✅ Clean MVC architecture

### Frontend Features

✅ Complete task management dashboard
✅ User authentication (login/register)
✅ Create, read, update, delete tasks
✅ Real-time task statistics
✅ Advanced filtering system
✅ Task details sidebar with comments
✅ Comment system for collaboration
✅ Status updates with visual feedback
✅ Responsive design
✅ Loading states & error handling
✅ State management (Zustand)
✅ API caching (React Query)

## 🧪 Testing the Application

### Test User Creation

```bash
POST http://localhost:5000/api/auth/register
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123",
  "role": "user"
}
```

### Test Login

```bash
POST http://localhost:5000/api/auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "password123"
}
```

### Test Project Creation

```bash
POST http://localhost:5000/api/projects
Authorization: Bearer YOUR_JWT_TOKEN
Content-Type: application/json

{
  "name": "Website Redesign",
  "description": "Redesign company website",
  "status": "active",
  "priority": "high"
}
```

### Test Task Creation

```bash
POST http://localhost:5000/api/tasks
Authorization: Bearer YOUR_JWT_TOKEN
Content-Type: application/json

{
  "title": "Design homepage mockup",
  "description": "Create initial design mockup for homepage",
  "project": "PROJECT_ID_HERE",
  "status": "todo",
  "priority": "high",
  "dueDate": "2024-12-31"
}
```

## 📁 Project Structure

```
fullstack-interview-project/
├── backend/
│   ├── controllers/        # Request handlers
│   ├── models/            # MongoDB schemas
│   ├── routes/            # API routes
│   ├── middleware/        # Custom middleware
│   ├── config/            # Configuration files
│   ├── utils/             # Utility functions
│   ├── server.js          # Entry point
│   └── package.json
│
└── frontend/
    ├── public/
    ├── src/
    │   ├── components/    # React components
    │   ├── pages/         # Page components
    │   ├── services/      # API services
    │   ├── store/         # State management
    │   ├── hooks/         # Custom hooks
    │   ├── utils/         # Utility functions
    │   ├── App.js         # Main app component
    │   └── index.js       # Entry point
    └── package.json
```

## 🎨 Tech Stack

### Backend

- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM
- **JWT** - Authentication
- **bcryptjs** - Password hashing
- **express-validator** - Input validation

### Frontend

- **React** - UI library
- **React Router** - Routing
- **Zustand** - State management
- **React Query** - Server state management
- **Axios** - HTTP client
- **React Hook Form** - Form handling
- **Tailwind CSS** - Styling
- **Lucide React** - Icons
- **date-fns** - Date formatting

## 🔒 Security Features

- Password hashing with bcrypt
- JWT token-based authentication
- Protected routes
- Input validation
- CORS configuration
- HTTP-only considerations
- Role-based access control

## 🚀 Deployment Considerations

### Backend

- Environment variables configuration
- MongoDB Atlas for production database
- Process management (PM2)
- Error logging
- Rate limiting
- HTTPS enforcement

### Frontend

- Build optimization
- Environment-specific API URLs
- CDN deployment
- Progressive Web App (PWA) capabilities

## 📝 Interview Talking Points

### Backend Complexity

- Demonstrates understanding of database relationships
- Proper separation of concerns (MVC pattern)
- Middleware implementation
- Error handling strategy
- RESTful API best practices
- Aggregation and complex queries

### Frontend Complexity

- Complete feature implementation
- State management strategy
- API integration patterns
- User experience considerations
- Performance optimizations (memoization, query caching)
- Responsive design

### Full-Stack Integration

- Authentication flow
- Data synchronization
- Error handling across stack
- Type safety considerations
- API contract design

## 👨‍💻 Author:- Priyanshu Patel

Created as an interview demonstration project showcasing full-stack MERN development skills.

## 📄 License

MIT License - feel free to use this project for learning and interview preparation.
