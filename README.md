# 💰 Expense Manager System

A full-stack expense management application built with HTML, CSS, JavaScript (frontend) and Node.js/Express with PostgreSQL (backend).

## Features

- ✅ Add, view, and delete expenses
- ✅ Filter expenses by category
- ✅ Real-time balance calculation
- ✅ Beautiful and responsive UI
- ✅ RESTful API backend
- ✅ PostgreSQL database integration

## Tech Stack

**Frontend:**
- HTML5
- CSS3 (with modern styling)
- Vanilla JavaScript

**Backend:**
- Node.js
- Express.js
- PostgreSQL

## Prerequisites

Before you begin, make sure you have installed:

1. **Node.js** (v14 or higher) - [Download here](https://nodejs.org/)
2. **PostgreSQL** (v12 or higher) - [Download here](https://www.postgresql.org/download/)
3. **npm** (comes with Node.js)

## Setup Instructions

### Step 1: Install PostgreSQL

1. Download and install PostgreSQL from the official website
2. During installation, remember your PostgreSQL password (you'll need it later)
3. Make sure PostgreSQL service is running

### Step 2: Create Database

Open PostgreSQL (using pgAdmin or psql command line) and run:

```sql
CREATE DATABASE expense_manager;
```

Or using psql command line:
```bash
psql -U postgres
CREATE DATABASE expense_manager;
\q
```

### Step 3: Create Database Table

Run the SQL script to create the table:

**Option A: Using pgAdmin**
1. Open pgAdmin
2. Connect to your PostgreSQL server
3. Right-click on `expense_manager` database → Query Tool
4. Copy and paste the contents of `database.sql`
5. Execute the query

**Option B: Using psql command line**
```bash
psql -U postgres -d expense_manager -f database.sql
```

### Step 4: Install Node.js Dependencies

Open terminal/command prompt in the project folder and run:

```bash
npm install
```

This will install all required packages:
- express
- pg (PostgreSQL client)
- cors
- dotenv

### Step 5: Configure Environment Variables

Create a `.env` file in the root directory with your PostgreSQL credentials:

```env
DB_USER=postgres
DB_HOST=localhost
DB_NAME=expense_manager
DB_PASSWORD=your_postgresql_password
DB_PORT=5432
PORT=3000
```

**Important:** Replace `your_postgresql_password` with your actual PostgreSQL password!

### Step 6: Start the Backend Server

Run the server:

```bash
npm start
```

Or for development with auto-reload:

```bash
npm run dev
```

You should see:
```
✅ Connected to PostgreSQL database
✅ Database table initialized
🚀 Server running on http://localhost:3000
📊 API endpoints available at http://localhost:3000/api
```

### Step 7: Open the Frontend

1. Open `index.html` in your web browser
   - You can double-click the file, or
   - Right-click → Open with → Browser
   - Or use a local server like Live Server extension in VS Code

2. The application should now be running!

## How to Connect Backend to PostgreSQL

The backend connection is already configured! Here's how it works:

### Connection Setup (Already Done)

The connection is handled in `server.js` using the `pg` (node-postgres) library:

```javascript
const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
});
```

### Connection Flow

1. **Environment Variables**: The `.env` file contains your database credentials
2. **Connection Pool**: PostgreSQL connection pool is created when server starts
3. **Auto-initialization**: The `initializeDatabase()` function creates the table automatically
4. **API Endpoints**: All CRUD operations use the connection pool to query the database

### Testing the Connection

1. Start the server: `npm start`
2. Check health endpoint: Open `http://localhost:3000/api/health` in browser
3. Should return: `{"status":"OK","database":"Connected"}`

## Project Structure

```
expense-manager/
│
├── index.html          # Frontend HTML
├── styles.css          # Frontend CSS styling
├── script.js           # Frontend JavaScript
│
├── server.js           # Backend Express server
├── package.json        # Node.js dependencies
├── database.sql        # Database schema
├── .env               # Environment variables (create this)
├── .gitignore         # Git ignore file
└── README.md          # This file
```

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/expenses` | Get all expenses |
| GET | `/api/expenses?category=Food` | Get expenses by category |
| GET | `/api/expenses/:id` | Get single expense |
| POST | `/api/expenses` | Create new expense |
| PUT | `/api/expenses/:id` | Update expense |
| DELETE | `/api/expenses/:id` | Delete expense |
| GET | `/api/health` | Health check |

## Usage

1. **Add Expense**: Fill in the form (description, amount, category, date) and click "Add Expense"
2. **View Expenses**: All expenses are displayed in the expense history section
3. **Filter**: Use the category dropdown to filter expenses
4. **Delete**: Click the "Delete" button on any expense to remove it
5. **Balance**: Total balance is automatically calculated and displayed at the top

## Troubleshooting

### Backend won't start
- Check if PostgreSQL is running
- Verify `.env` file exists and has correct credentials
- Make sure port 3000 is not already in use

### Database connection error
- Verify PostgreSQL is installed and running
- Check database name, username, and password in `.env`
- Ensure database `expense_manager` exists

### Frontend can't connect to backend
- Make sure backend server is running (`npm start`)
- Check browser console for errors
- Verify API_URL in `script.js` matches your server port

### CORS errors
- Backend already has CORS enabled
- Make sure you're accessing the frontend properly (not via `file://` protocol)

## Notes for Submission

This project includes:
- ✅ Clean, modern UI design
- ✅ Full CRUD operations
- ✅ Database integration
- ✅ RESTful API
- ✅ Error handling
- ✅ Responsive design
- ✅ Well-documented code

## License

ISC

---

**Happy Coding! 🚀**

