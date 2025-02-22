
export type ExpenseCategory = 
  | "food"
  | "transportation"
  | "utilities"
  | "entertainment"
  | "shopping"
  | "healthcare"
  | "other";

export interface Expense {
  id: string;
  amount: number;
  description: string;
  category: ExpenseCategory;
  date: Date;
}

export interface Budget {
  category: ExpenseCategory;
  limit: number;
}
