
import React from "react";
import { ExpenseCategory } from "@/types/expense";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface ExpenseFormProps {
  onSubmit: (amount: number, description: string, category: ExpenseCategory) => void;
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

const ExpenseForm = ({ onSubmit }: ExpenseFormProps) => {
  const [amount, setAmount] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [category, setCategory] = React.useState<ExpenseCategory>("other");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const numAmount = parseFloat(amount);
    if (isNaN(numAmount) || numAmount <= 0) return;
    onSubmit(numAmount, description, category);
    setAmount("");
    setDescription("");
    setCategory("other");
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 bg-white p-6 rounded-lg shadow-sm">
      <div>
        <Input 
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="Amount"
          className="w-full"
          step="0.01"
          min="0"
          required
        />
      </div>
      <div>
        <Input
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Description"
          className="w-full"
          required
        />
      </div>
      <div>
        <Select value={category} onValueChange={(value: ExpenseCategory) => setCategory(value)}>
          <SelectTrigger>
            <SelectValue placeholder="Select category" />
          </SelectTrigger>
          <SelectContent>
            {categories.map((cat) => (
              <SelectItem key={cat} value={cat}>
                {cat.charAt(0).toUpperCase() + cat.slice(1)}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <Button type="submit" className="w-full">Add Expense</Button>
    </form>
  );
};

export default ExpenseForm;
