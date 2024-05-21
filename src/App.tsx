import { useState } from "react";
import reactLogo from "./assets/react.svg";
import "./App.css";
import ExpenseForm from "./components/ExpenseForm";
import List from "./components/ExpenseList";
import ExpenseFilter from "./components/ExpenseFilter";
import categories from "./components/categories";

function App() {
  const [slectedCategory, setSelectedCategory] = useState("");

  const [expenses, setExpenses] = useState([
    { id: 1, description: "aaa", amount: 212, category: "Utilities" },
    { id: 2, description: "bbb", amount: 212, category: "Utilities" },
    { id: 3, description: "ccc", amount: 212, category: "Utilities" },
  ]);

  const visibleExpenses = slectedCategory
    ? expenses.filter((e) => e.category === slectedCategory)
    : expenses;

  return (
    <>
      <div className="mb-5">
        <ExpenseForm
          onSubmit={(expense) =>
            setExpenses([...expenses, { ...expense, id: expenses.length + 1 }])
          }
        />
      </div>
      <div className="mb-3">
        <ExpenseFilter
          onSelectCategory={(category) => setSelectedCategory(category)}
        />
      </div>
      <List
        expenses={visibleExpenses}
        onDelete={(id) => setExpenses(expenses.filter((e) => e.id !== id))}
      />
    </>
  );
}

export default App;
