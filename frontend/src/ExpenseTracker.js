import { useEffect, useState } from "react";
import axios from "axios";

export default function ExpenseTracker() {
  const [expenses, setExpenses] = useState([]);
  const [form, setForm] = useState({ amount: "", category: "", date: "", description: "" });
  const [filter, setFilter] = useState({ category: "", date: "" });
  const [total, setTotal] = useState(0);
  const [dateRange, setDateRange] = useState({ start: "", end: "" });
  const [message, setMessage] = useState(""); // ✅ Success message state

  useEffect(() => {
    fetchExpenses();
  }, []);

  const fetchExpenses = async () => {
    try {
      const res = await axios.get("http://localhost:5000/expenses");
      setExpenses(res.data);
    } catch (error) {
      console.error("Error fetching expenses:", error);
    }
  };




  const addExpense = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/expenses", form);
      setMessage("✅ Expense added successfully!");
      fetchExpenses();
      setTimeout(() => setMessage(""), 3000); // ✅ Hide message after 3 sec
    } catch (error) {
      console.error("Error adding expense:", error);
    }
  };

  const filterExpenses = async () => {
    try {
      const res = await axios.get("http://localhost:5000/expenses/filter", { params: filter });
      setExpenses(res.data);
    } catch (error) {
      console.error("Error filtering expenses:", error);
    }
  };

  const getTotal = async () => {
    if (!dateRange.start || !dateRange.end) {
      alert("Please select both start and end dates.");
      return;
    }
    try {
      const res = await axios.get("http://localhost:5000/expenses/total", { params: dateRange });
      setTotal(res.data.total);
    } catch (error) {
      console.error("Error fetching total expenses:", error);
    }
  };

  return (
    <div className="p-4 max-w-2xl mx-auto">
      <h1 className="text-xl font-bold mb-4">Expense Tracker</h1>

      {/* Success Message */}
      {message && <p className="bg-green-100 text-green-700 p-2 rounded">{message}</p>}

      {/* Add Expense Form */}
      <form className="mb-4" onSubmit={addExpense}>
        <input type="number" placeholder="Amount" className="border p-2 w-full mb-2" onChange={(e) => setForm({ ...form, amount: e.target.value })} required />
        <input type="text" placeholder="Category" className="border p-2 w-full mb-2" onChange={(e) => setForm({ ...form, category: e.target.value })} required />
        <input type="date" className="border p-2 w-full mb-2" onChange={(e) => setForm({ ...form, date: e.target.value })} required />
        <input type="text" placeholder="Description" className="border p-2 w-full mb-2" onChange={(e) => setForm({ ...form, description: e.target.value })} />
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 w-full">Add Expense</button>
      </form>

      {/* Filter Expenses */}
      <div className="mb-4">
        <h2 className="text-lg font-semibold">Filter Expenses</h2>
        <input type="text" placeholder="Category" className="border p-2 w-full mb-2" onChange={(e) => setFilter({ ...filter, category: e.target.value })} />
        <input type="date" className="border p-2 w-full mb-2" onChange={(e) => setFilter({ ...filter, date: e.target.value })} />
        <button className="bg-gray-500 text-white px-4 py-2 w-full" onClick={filterExpenses}>Filter</button>
      </div>

      {/* Total Expenses by Date Range */}
      <div className="mb-4">
        <h2 className="text-lg font-semibold">Total Expenses</h2>
        <input type="date" className="border p-2 w-full mb-2" onChange={(e) => setDateRange({ ...dateRange, start: e.target.value })} />
        <input type="date" className="border p-2 w-full mb-2" onChange={(e) => setDateRange({ ...dateRange, end: e.target.value })} />
        <button className="bg-green-500 text-white px-4 py-2 w-full mb-2" onClick={getTotal}>Get Total</button>
        <p className="text-xl">Total: ${total}</p>
      </div>

      {/* Display Expenses */}
      <h2 className="text-lg font-semibold mt-4">Expenses</h2>
      <ul className="border p-2">
        {expenses.length === 0 ? (
          <p className="text-gray-500">No expenses recorded.</p>
        ) : (
          expenses.map((exp) => (
            <li key={exp._id} className="border-b py-2">
              {exp.date.split("T")[0]} - {exp.category} - ${exp.amount} - {exp.description}
            </li>
          ))
        )}
      </ul>
    </div>
  );
}
