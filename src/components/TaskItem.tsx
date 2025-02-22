
import React from "react";
import { Check, Trash2 } from "lucide-react";
import { Task } from "@/types/task";
import { cn } from "@/lib/utils";

interface TaskItemProps {
  task: Task;
  onComplete: (id: string) => void;
  onDelete: (id: string) => void;
}

const TaskItem = ({ task, onComplete, onDelete }: TaskItemProps) => {
  return (
    <div
      className={cn(
        "group relative flex items-center gap-4 rounded-lg border bg-white p-4 shadow-sm transition-all hover:shadow-md animate-slide-in",
        task.completed && "bg-secondary"
      )}
    >
      <button
        onClick={() => onComplete(task.id)}
        className={cn(
          "flex h-6 w-6 items-center justify-center rounded-full border-2 border-primary transition-all hover:bg-primary/10",
          task.completed && "border-primary bg-primary"
        )}
      >
        {task.completed && <Check className="h-4 w-4 text-white" />}
      </button>
      <span
        className={cn(
          "flex-1 text-sm font-medium text-gray-800",
          task.completed && "text-gray-400 line-through"
        )}
      >
        {task.title}
      </span>
      <span className="rounded-full bg-accent px-3 py-1 text-xs font-medium text-accent-foreground">
        {task.category}
      </span>
      <button
        onClick={() => onDelete(task.id)}
        className="invisible text-gray-400 transition-colors hover:text-red-500 group-hover:visible"
      >
        <Trash2 className="h-4 w-4" />
      </button>
    </div>
  );
};

export default TaskItem;
