
import React, { useEffect } from "react";
import { Expense, Budget, ExpenseCategory } from "@/types/expense";
import ExpenseForm from "./ExpenseForm";
import BudgetManager from "./BudgetManager";
import ExpenseChart from "./ExpenseChart";
import { loadExpenses, saveExpenses, loadBudgets, saveBudgets } from "@/utils/storage";
import { useToast } from "@/components/ui/use-toast";
import { Trash2 } from "lucide-react";

const ExpenseTracker = () => {
  const [expenses, setExpenses] = React.useState<Expense[]>([]);
  const [budgets, setBudgets] = React.useState<Budget[]>([]);
  const { toast } = useToast();

  useEffect(() => {
    setExpenses(loadExpenses());
    setBudgets(loadBudgets());
  }, []);

  const addExpense = (amount: number, description: string, category: ExpenseCategory) => {
    const newExpense: Expense = {
      id: crypto.randomUUID(),
      amount,
      description,
      category,
      date: new Date(),
    };

    const budget = budgets.find((b) => b.category === category);
    if (budget) {
      const categoryTotal = expenses
        .filter((e) => e.category === category)
        .reduce((sum, e) => sum + e.amount, 0) + amount;

      if (categoryTotal > budget.limit) {
        toast({
          title: "Budget Warning",
          description: `This expense exceeds your budget for ${category}`,
          variant: "destructive",
        });
      }
    }

    const updatedExpenses = [newExpense, ...expenses];
    setExpenses(updatedExpenses);
    saveExpenses(updatedExpenses);
  };

  const saveBudget = (budget: Budget) => {
    const existingIndex = budgets.findIndex((b) => b.category === budget.category);
    let updatedBudgets: Budget[];

    if (existingIndex >= 0) {
      updatedBudgets = [
        ...budgets.slice(0, existingIndex),
        budget,
        ...budgets.slice(existingIndex + 1),
      ];
    } else {
      updatedBudgets = [...budgets, budget];
    }

    setBudgets(updatedBudgets);
    saveBudgets(updatedBudgets);
    toast({
      title: "Budget Updated",
      description: `Budget for ${budget.category} set to $${budget.limit}`,
    });
  };

  const deleteBudget = (category: ExpenseCategory) => {
    const updatedBudgets = budgets.filter(b => b.category !== category);
    setBudgets(updatedBudgets);
    saveBudgets(updatedBudgets);
    toast({
      title: "Budget Deleted",
      description: `Budget for ${category} has been removed`,
    });
  };

  const deleteExpense = (id: string) => {
    const updatedExpenses = expenses.filter(expense => expense.id !== id);
    setExpenses(updatedExpenses);
    saveExpenses(updatedExpenses);
    toast({
      title: "Expense Deleted",
      description: "The expense has been removed",
    });
  };

  return (
    <div className="container mx-auto py-8 space-y-8">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-gray-900">Expense Tracker</h1>
        <p className="mt-2 text-gray-600">Manage your personal finances</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-8">
          <ExpenseForm onSubmit={addExpense} />
          <BudgetManager 
            budgets={budgets} 
            onSaveBudget={saveBudget} 
            onDeleteBudget={deleteBudget}
          />
        </div>
        <div>
          <ExpenseChart expenses={expenses} />
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <div className="p-6">
          <h3 className="text-lg font-semibold mb-4">Recent Expenses</h3>
          <div className="space-y-4">
            {expenses.map((expense) => (
              <div
                key={expense.id}
                className="flex justify-between items-center p-4 bg-gray-50 rounded-lg group"
              >
                <div>
                  <p className="font-medium">{expense.description}</p>
                  <p className="text-sm text-gray-500 capitalize">{expense.category}</p>
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <p className="font-semibold">${expense.amount.toFixed(2)}</p>
                    <p className="text-sm text-gray-500">
                      {expense.date.toLocaleDateString()}
                    </p>
                  </div>
                  <button
                    onClick={() => deleteExpense(expense.id)}
                    className="invisible text-gray-400 hover:text-red-500 group-hover:visible transition-colors"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExpenseTracker;
