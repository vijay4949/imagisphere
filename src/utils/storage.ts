
import { Expense, Budget } from "@/types/expense";

export const saveExpenses = (expenses: Expense[]) => {
  localStorage.setItem('expenses', JSON.stringify(expenses));
};

export const loadExpenses = (): Expense[] => {
  const data = localStorage.getItem('expenses');
  if (!data) return [];
  return JSON.parse(data).map((expense: any) => ({
    ...expense,
    date: new Date(expense.date)
  }));
};

export const saveBudgets = (budgets: Budget[]) => {
  localStorage.setItem('budgets', JSON.stringify(budgets));
};

export const loadBudgets = (): Budget[] => {
  const data = localStorage.getItem('budgets');
  if (!data) return [];
  return JSON.parse(data);
};
