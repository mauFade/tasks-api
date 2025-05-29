"use client";

import { MoreHorizontal, Pencil, Trash2 } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

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

type TaskTableProps = {
  tasks: Task[];
  isLoading: boolean;
  onEdit: (task: Task) => void;
  onDelete: (task: Task) => void;
};

const getStatusBadge = (status: string) => {
  switch (status) {
    case "todo":
      return <Badge variant="secondary">A Fazer</Badge>;
    case "in-progress":
      return <Badge variant="default">Em Progresso</Badge>;
    case "completed":
      return <Badge variant="outline">Concluído</Badge>;
    default:
      return <Badge variant="secondary">{status}</Badge>;
  }
};

const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString("pt-BR", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};

export function TaskTable({
  tasks,
  isLoading,
  onEdit,
  onDelete,
}: TaskTableProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Tarefas</CardTitle>
        <CardDescription>
          Lista de todas as suas tarefas com seus status e detalhes atuais.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Título</TableHead>
              <TableHead>Descrição</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Data de Entrega</TableHead>
              <TableHead>Criado em</TableHead>
              <TableHead className="w-[70px]">Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center">
                  Carregando tarefas...
                </TableCell>
              </TableRow>
            ) : tasks.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={6}
                  className="text-center text-muted-foreground"
                >
                  Nenhuma tarefa encontrada
                </TableCell>
              </TableRow>
            ) : (
              tasks.map((task) => (
                <TableRow key={task.id}>
                  <TableCell className="font-medium">{task.title}</TableCell>
                  <TableCell className="max-w-[300px] truncate">
                    {task.description}
                  </TableCell>
                  <TableCell>{getStatusBadge(task.status)}</TableCell>
                  <TableCell>{formatDate(task.dueDate)}</TableCell>
                  <TableCell>{formatDate(task.createdAt)}</TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => onEdit(task)}>
                          <Pencil className="h-4 w-4 mr-2" />
                          Editar
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => onDelete(task)}
                          className="text-destructive"
                        >
                          <Trash2 className="h-4 w-4 mr-2" />
                          Excluir
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
