
import React from "react";
import { Budget, ExpenseCategory } from "@/types/expense";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface BudgetManagerProps {
  budgets: Budget[];
  onSaveBudget: (budget: Budget) => void;
}

const categories: ExpenseCategory[] = [
  "food",
  "transportation",
  "utilities",
  "entertainment",
  "shopping",
  "healthcare",
  "other",
];

const BudgetManager = ({ budgets, onSaveBudget }: BudgetManagerProps) => {
  const [category, setCategory] = React.useState<ExpenseCategory>("food");
  const [limit, setLimit] = React.useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const numLimit = parseFloat(limit);
    if (isNaN(numLimit) || numLimit <= 0) return;
    onSaveBudget({ category, limit: numLimit });
    setLimit("");
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm">
      <h3 className="text-lg font-semibold mb-4">Budget Settings</h3>
      <div className="space-y-4">
        {budgets.map((budget) => (
          <div key={budget.category} className="flex justify-between items-center py-2 border-b">
            <span className="capitalize">{budget.category}</span>
            <span className="font-medium">${budget.limit.toFixed(2)}</span>
          </div>
        ))}
        <form onSubmit={handleSubmit} className="flex gap-2 mt-4">
          <Select value={category} onValueChange={(value: ExpenseCategory) => setCategory(value)}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {categories.map((cat) => (
                <SelectItem key={cat} value={cat}>
                  {cat.charAt(0).toUpperCase() + cat.slice(1)}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Input
            type="number"
            value={limit}
            onChange={(e) => setLimit(e.target.value)}
            placeholder="Budget limit"
            className="flex-1"
            step="0.01"
            min="0"
            required
          />
          <Button type="submit">Set Budget</Button>
        </form>
      </div>
    </div>
  );
};

export default BudgetManager;
