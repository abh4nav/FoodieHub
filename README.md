# 🍔 FoodieHub – Food Ordering Web Application

FoodieHub is a full-stack food ordering web application built using the MERN stack. It allows customers to browse food items, add products to their cart, place orders using Cash on Delivery (COD), and track their order history.

It also provides an admin dashboard to manage food items and customer orders.

## 🌐 Live Demo

- **Live Website:** https://foodiehub-lake-kappa.vercel.app/
- **GitHub Repository:** https://github.com/abh4nav/FoodieHub

## ✨ Features

### Customer Features
- User registration and login.
- Browse 50 food items across multiple categories.
- Search and filter food items.
- Add food items to the shopping cart.
- Increase or decrease item quantities.
- Place orders using Cash on Delivery.
- View order history and order status.

### Admin Features
- Secure admin authentication.
- Admin dashboard with order statistics.
- Add new food items.
- Edit existing food items.
- Delete food items.
- Manage customer orders.
- Update order statuses.

## 🛠️ Tech Stack

| Technology | Purpose |
|---|---|
| React.js | Frontend |
| Vite | Frontend development and build |
| Tailwind CSS | Styling |
| Node.js | Backend runtime |
| Express.js | REST API |
| MongoDB Atlas | Cloud database |
| Mongoose | Database modeling |
| JWT | Authentication |
| bcryptjs | Password hashing |
| Axios | API requests |
| Lucide React | Icons |
| Vercel | Frontend deployment |
| Render | Backend deployment |

## 📂 Project Structure

```text
FoodieHub/
│
├── backend/
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── seed/
│   ├── server.js
│   └── package.json
│
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   ├── services/
│   │   ├── App.jsx
│   │   └── main.jsx
│   └── package.json
│
└── README.md
```

## ⚙️ Installation and Setup

### 1. Clone the repository

```bash
git clone https://github.com/abh4nav/FoodieHub.git
cd FoodieHub
```

### 2. Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file inside the backend folder:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
```

Start the backend:

```bash
npm start
```

For development:

```bash
npm run dev
```

### 3. Frontend Setup

Open another terminal:

```bash
cd frontend
npm install
```

Create a `.env` file inside the frontend folder:

```env
VITE_API_URL=http://localhost:5000/api
```

Start the frontend:

```bash
npm run dev
```

The application will run locally using the frontend URL shown by Vite.

## 🔐 Authentication and Authorization

- JWT-based authentication.
- Passwords are hashed using bcryptjs.
- Role-based access control for customers and administrators.
- Protected routes for authenticated users.
- Only administrators can manage food items and customer orders.

## 📦 Database

FoodieHub uses MongoDB Atlas to store:

- User information.
- Food menu items.
- Customer orders.

## 🚀 Deployment

| Application | Hosting |
|---|---|
| Frontend | Vercel |
| Backend | Render |
| Database | MongoDB Atlas |

## 📚 What I Learned

Through this project, I gained practical experience with:

- Building a full-stack MERN application.
- Creating and integrating REST APIs.
- Implementing JWT authentication.
- Managing application state in React.
- Working with MongoDB and Mongoose.
- Implementing role-based authorization.
- Deploying frontend and backend separately.
- Managing environment variables and GitHub repositories.

## 👨‍💻 Author

**Abhinav Anand**

- GitHub: https://github.com/abh4nav
