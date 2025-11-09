import React, { useState } from "react";
import "./App.css";

function App() {
  const [transactions, setTransactions] = useState([]);
  const [desc, setDesc] = useState("");
  const [amount, setAmount] = useState("");
  const [type, setType] = useState("income"); // default selection

  const addTransaction = (e) => {
    e.preventDefault();
    if (!desc || !amount) return;

    const amountNumber = parseFloat(amount);
    const newTransaction = {
      id: Date.now(),
      desc,
      amount: type === "expense" ? -Math.abs(amountNumber) : Math.abs(amountNumber)
    };

    setTransactions([newTransaction, ...transactions]);
    setDesc("");
    setAmount("");
    setType("income"); // reset to default
  };

  const deleteTransaction = (id) => {
    setTransactions(transactions.filter((t) => t.id !== id));
  };

  const income = transactions
    .filter((t) => t.amount > 0)
    .reduce((acc, t) => acc + t.amount, 0);

  const expenses = transactions
    .filter((t) => t.amount < 0)
    .reduce((acc, t) => acc + t.amount, 0);

  return (
    <div className="App">
      <h1>Personal Budget</h1>

      <div className="summary">
        <p>Total Income: Rs. {income.toLocaleString()}</p>
        <p>Total Expenses: Rs. {Math.abs(expenses).toLocaleString()}</p>
        <p>Balance: Rs. {(income + expenses).toLocaleString()}</p>
      </div>

      <form onSubmit={addTransaction}>
        <input
          type="text"
          placeholder="Description"
          value={desc}
          onChange={(e) => setDesc(e.target.value)}
        />
        <input
          type="number"
          placeholder="Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
        <select value={type} onChange={(e) => setType(e.target.value)}>
          <option value="income">Income</option>
          <option value="expense">Expense</option>
        </select>
        <button type="submit">Add Transaction</button>
      </form>

      <h2>Transactions</h2>
      <table>
        <thead>
          <tr>
            <th>Description</th>
            <th>Income (Rs.)</th>
            <th>Expense (Rs.)</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((t) => (
            <tr key={t.id}>
              <td>{t.desc}</td>
              <td>{t.amount > 0 ? t.amount.toLocaleString() : ""}</td>
              <td>{t.amount < 0 ? Math.abs(t.amount).toLocaleString() : ""}</td>
              <td>
                <button onClick={() => deleteTransaction(t.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;