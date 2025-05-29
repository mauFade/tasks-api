"use client";

import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "@/api/api";
import { TaskStats } from "./task-stats";
import { SearchBar } from "./search-bar";
import { TaskTable } from "./task-table";
import { CreateTaskDialog } from "./create-task-dialog";
import { EditTaskDialog } from "./edit-task-dialog";
import { DeleteTaskDialog } from "./delete-task-dialog";
import { toast } from "sonner";

type Task = {
  id: string;
  title: string;
  description: string;
  status: string;
  dueDate: string;
  userId: string;
  createdAt: string;
  updatedAt: string;
};

type TaskFormData = {
  title: string;
  description: string;
  status: string;
};

const Dashboard = () => {
  const queryClient = useQueryClient();
  const [searchTerm, setSearchTerm] = useState("");
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [formData, setFormData] = useState<TaskFormData>({
    title: "",
    description: "",
    status: "todo",
  });

  const { data: tasks = [], isLoading } = useQuery<Task[]>({
    queryKey: ["tasks"],
    queryFn: () => {
      return api.getTasks();
    },
    retry: 1,
  });

  const createTaskMutation = useMutation({
    mutationFn: (data: {
      title: string;
      description: string;
      status: string;
    }) => {
      return api.createTask(data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
      setIsCreateDialogOpen(false);
      setFormData({ title: "", description: "", status: "todo" });
      toast.success("Task created successfully");
    },
    onError: (error: Error) => {
      console.error("Failed to create task:", error);
      toast.error("Failed to create task. Please try again.");
    },
  });

  const updateTaskMutation = useMutation({
    mutationFn: (data: {
      id: string;
      title: string;
      description: string;
      status: string;
    }) => {
      return api.updateTask(data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
      setIsEditDialogOpen(false);
      setSelectedTask(null);
      setFormData({ title: "", description: "", status: "todo" });
      toast.success("Task updated successfully");
    },
    onError: (error: Error) => {
      console.error("Failed to update task:", error);
      toast.error("Failed to update task. Please try again.");
    },
  });

  const deleteTaskMutation = useMutation({
    mutationFn: (id: string) => {
      return api.deleteTask(id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
      setIsDeleteDialogOpen(false);
      setSelectedTask(null);
      toast.success("Task deleted successfully");
    },
    onError: (error: Error) => {
      console.error("Failed to delete task:", error);
      toast.error("Failed to delete task. Please try again.");
    },
  });

  const handleCreateTask = () => {
    createTaskMutation.mutate(formData);
  };

  const handleEditTask = () => {
    if (!selectedTask) return;
    updateTaskMutation.mutate({
      id: selectedTask.id,
      ...formData,
    });
  };

  const handleDeleteTask = () => {
    if (!selectedTask) return;
    deleteTaskMutation.mutate(selectedTask.id);
  };

  const openEditDialog = (task: Task) => {
    setSelectedTask(task);
    setFormData({
      title: task.title,
      description: task.description,
      status: task.status,
    });
    setIsEditDialogOpen(true);
  };

  const openDeleteDialog = (task: Task) => {
    setSelectedTask(task);
    setIsDeleteDialogOpen(true);
  };

  const filteredTasks = tasks.filter(
    (task) =>
      task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      task.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const taskStats = {
    total: tasks.length,
    todo: tasks.filter((t) => t.status === "todo").length,
    inProgress: tasks.filter((t) => t.status === "in-progress").length,
    completed: tasks.filter((t) => t.status === "completed").length,
  };

  return (
    <div className="min-h-screen p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Task Dashboard</h1>
            <p className="text-muted-foreground">
              Manage and track your tasks efficiently
            </p>
          </div>
          <CreateTaskDialog
            open={isCreateDialogOpen}
            onOpenChange={setIsCreateDialogOpen}
            formData={formData}
            onFormDataChange={setFormData}
            onSubmit={handleCreateTask}
            isSubmitting={createTaskMutation.isPending}
          />
        </div>

        {/* Stats Cards */}
        <TaskStats stats={taskStats} />

        {/* Search */}
        <SearchBar value={searchTerm} onChange={setSearchTerm} />

        {/* Tasks Table */}
        <TaskTable
          tasks={filteredTasks}
          isLoading={isLoading}
          onEdit={openEditDialog}
          onDelete={openDeleteDialog}
        />

        {/* Edit Dialog */}
        <EditTaskDialog
          open={isEditDialogOpen}
          onOpenChange={setIsEditDialogOpen}
          formData={formData}
          onFormDataChange={setFormData}
          onSubmit={handleEditTask}
          isSubmitting={updateTaskMutation.isPending}
        />

        {/* Delete Confirmation Dialog */}
        <DeleteTaskDialog
          open={isDeleteDialogOpen}
          onOpenChange={setIsDeleteDialogOpen}
          taskTitle={selectedTask?.title || ""}
          onConfirm={handleDeleteTask}
          isDeleting={deleteTaskMutation.isPending}
        />
      </div>
    </div>
  );
};

export default Dashboard;
