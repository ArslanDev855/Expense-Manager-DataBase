-- Expense Manager Database Schema
-- Run this script in PostgreSQL to create the database and table

-- Create database (run this command in psql or pgAdmin)
-- CREATE DATABASE expense_manager;

-- Connect to the database
-- \c expense_manager;

-- Create expenses table
CREATE TABLE IF NOT EXISTS expenses (
    id SERIAL PRIMARY KEY,
    description VARCHAR(255) NOT NULL,
    amount DECIMAL(10, 2) NOT NULL,
    category VARCHAR(50) NOT NULL,
    date DATE NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create index for better query performance
CREATE INDEX IF NOT EXISTS idx_expenses_date ON expenses(date);
CREATE INDEX IF NOT EXISTS idx_expenses_category ON expenses(category);

-- Sample data (optional)
-- INSERT INTO expenses (description, amount, category, date) VALUES
-- ('Groceries', 1500.00, 'Food', '2024-01-15'),
-- ('Uber Ride', 250.00, 'Transport', '2024-01-16'),
-- ('Movie Tickets', 600.00, 'Entertainment', '2024-01-17');

