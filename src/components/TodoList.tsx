
import React, { useState } from "react";
import { Task, TaskCategory } from "@/types/task";
import TaskItem from "./TaskItem";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const categories: TaskCategory[] = ["personal", "work", "shopping", "health"];

const TodoList = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTask, setNewTask] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<TaskCategory>("personal");
  const [filter, setFilter] = useState<"all" | TaskCategory>("all");

  const addTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTask.trim()) return;

    const task: Task = {
      id: crypto.randomUUID(),
      title: newTask,
      completed: false,
      category: selectedCategory,
      createdAt: new Date(),
    };

    setTasks([task, ...tasks]);
    setNewTask("");
  };

  const toggleComplete = (id: string) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const deleteTask = (id: string) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const filteredTasks = filter === "all" 
    ? tasks
    : tasks.filter((task) => task.category === filter);

  return (
    <div className="mx-auto max-w-2xl px-4 py-8">
      <div className="mb-8 text-center">
        <h1 className="text-4xl font-bold text-gray-900">Todo List</h1>
        <p className="mt-2 text-gray-600">Stay organized and productive</p>
      </div>

      <form onSubmit={addTask} className="mb-8 flex gap-2">
        <Input
          type="text"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          placeholder="Add a new task..."
          className="flex-1"
        />
        <Select
          value={selectedCategory}
          onValueChange={(value: TaskCategory) => setSelectedCategory(value)}
        >
          <SelectTrigger className="w-[140px]">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              {categories.map((category) => (
                <SelectItem key={category} value={category}>
                  {category}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
        <Button type="submit">
          <Plus className="mr-2 h-4 w-4" />
          Add
        </Button>
      </form>

      <div className="mb-6">
        <Select
          value={filter}
          onValueChange={(value: "all" | TaskCategory) => setFilter(value)}
        >
          <SelectTrigger className="w-[140px]">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem value="all">All</SelectItem>
              {categories.map((category) => (
                <SelectItem key={category} value={category}>
                  {category}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-3">
        {filteredTasks.length === 0 ? (
          <div className="flex flex-col items-center justify-center rounded-lg border border-dashed p-8 text-center">
            <p className="text-lg font-medium text-gray-600">No tasks yet</p>
            <p className="text-sm text-gray-500">Add some tasks to get started</p>
          </div>
        ) : (
          filteredTasks.map((task) => (
            <TaskItem
              key={task.id}
              task={task}
              onComplete={toggleComplete}
              onDelete={deleteTask}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default TodoList;
