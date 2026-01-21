const API_URL = 'http://localhost:3000/api';

// Set today's date as default
document.getElementById('date').valueAsDate = new Date();

// Load expenses on page load
document.addEventListener('DOMContentLoaded', () => {
    loadExpenses();
    updateBalance();
});

// Form submission
document.getElementById('expenseForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const expense = {
        description: document.getElementById('description').value,
        amount: parseFloat(document.getElementById('amount').value),
        category: document.getElementById('category').value,
        date: document.getElementById('date').value
    };

    try {
        const response = await fetch(`${API_URL}/expenses`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(expense)
        });

        if (response.ok) {
            document.getElementById('expenseForm').reset();
            document.getElementById('date').valueAsDate = new Date();
            loadExpenses();
            updateBalance();
        } else {
            alert('Error adding expense. Please try again.');
        }
    } catch (error) {
        console.error('Error:', error);
        alert('Error connecting to server. Make sure the backend is running.');
    }
});

// Filter expenses by category
document.getElementById('filterCategory').addEventListener('change', () => {
    loadExpenses();
});

// Load all expenses
async function loadExpenses() {
    try {
        const categoryFilter = document.getElementById('filterCategory').value;
        const url = categoryFilter 
            ? `${API_URL}/expenses?category=${categoryFilter}`
            : `${API_URL}/expenses`;
        
        const response = await fetch(url);
        const expenses = await response.json();
        
        displayExpenses(expenses);
    } catch (error) {
        console.error('Error loading expenses:', error);
        document.getElementById('expensesList').innerHTML = 
            '<p class="empty-message">Error loading expenses. Make sure the backend is running.</p>';
    }
}

// Display expenses
function displayExpenses(expenses) {
    const expensesList = document.getElementById('expensesList');
    
    if (expenses.length === 0) {
        expensesList.innerHTML = '<p class="empty-message">No expenses found.</p>';
        return;
    }

    expensesList.innerHTML = expenses.map(expense => `
        <div class="expense-item">
            <div class="expense-info">
                <h3>${expense.description}</h3>
                <div class="expense-meta">
                    <span>${expense.category}</span>
                    <span>${formatDate(expense.date)}</span>
                </div>
            </div>
            <div class="expense-amount">₹${parseFloat(expense.amount).toFixed(2)}</div>
            <div class="expense-actions">
                <button class="btn-delete" onclick="deleteExpense(${expense.id})">Delete</button>
            </div>
        </div>
    `).join('');
}

// Delete expense
async function deleteExpense(id) {
    if (!confirm('Are you sure you want to delete this expense?')) {
        return;
    }

    try {
        const response = await fetch(`${API_URL}/expenses/${id}`, {
            method: 'DELETE'
        });

        if (response.ok) {
            loadExpenses();
            updateBalance();
        } else {
            alert('Error deleting expense. Please try again.');
        }
    } catch (error) {
        console.error('Error:', error);
        alert('Error connecting to server.');
    }
}

// Update total balance
async function updateBalance() {
    try {
        const response = await fetch(`${API_URL}/expenses`);
        const expenses = await response.json();
        
        const total = expenses.reduce((sum, expense) => sum + parseFloat(expense.amount), 0);
        document.getElementById('totalBalance').textContent = `₹${total.toFixed(2)}`;
    } catch (error) {
        console.error('Error updating balance:', error);
    }
}

// Format date
function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-IN', { 
        year: 'numeric', 
        month: 'short', 
        day: 'numeric' 
    });
}

