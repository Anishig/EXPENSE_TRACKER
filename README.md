# Expense Tracker

A simple full-stack expense tracker application that allows users to add, view, filter, and calculate total expenses.

## Features
- Add expenses with amount, category, date, and description.
- View a list of recorded expenses.
- Filter expenses by category and date.
- Calculate total expenses for a given date range.

## Tech Stack
### Backend:
- Node.js
- Express.js
- MongoDB/MySQL (for data storage)

### Frontend:
- React.js
- Axios (for API requests)
- Tailwind CSS (for styling)

## Installation

### 1. Clone the Repository
```sh
git clone https://github.com/Anishig/EXPENSE_TRACKER
cd expense-tracker
```

### 2. Backend Setup
```sh
cd backend
npm install
```

#### Configure MongoDB Connection
- Create a `.env` file in the `backend` directory and add:
```env
MONGO_URI=mongodb+srv://<your-db-username>:<your-db-password>@cluster0.mongodb.net/expenseDB?retryWrites=true&w=majority
PORT=5000
```

#### Start Backend Server
```sh
npm start
```

### 3. Frontend Setup
```sh
cd ../frontend
npm install
```

#### Start Frontend Server
```sh
npm start
```

## API Endpoints

### 1. Add a New Expense
**POST** `/expenses`
```json
{
  "amount": 100,
  "category": "Food",
  "date": "2024-03-03",
  "description": "Lunch at a restaurant"
}
```

### 2. Get All Expenses
**GET** `/expenses`

### 3. Filter Expenses by Category and Date
**GET** `/expenses?category=Food&date=2024-03-03`

### 4. Get Total Expenses for a Date Range
**GET** `/expenses/total?start=2024-03-01&end=2024-03-31`

## Usage
- Open the frontend at `http://localhost:3000`.
- Add expenses using the form.
- Use filters to view specific expenses.
- Check total expenses for a given period.

## Future Enhancements
- User authentication
- Export expenses as CSV/PDF
- Pie chart visualization of expenses

## License
This project is open-source and available under the MIT License.

