"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type TaskFormData = {
  title: string;
  description: string;
  status: string;
};

type EditTaskDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  formData: TaskFormData;
  onFormDataChange: (data: TaskFormData) => void;
  onSubmit: () => void;
  isSubmitting: boolean;
};

const statusOptions = [
  { value: "todo", label: "A Fazer" },
  { value: "in-progress", label: "Em Progresso" },
  { value: "completed", label: "Concluído" },
];

export function EditTaskDialog({
  open,
  onOpenChange,
  formData,
  onFormDataChange,
  onSubmit,
  isSubmitting,
}: EditTaskDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Editar Tarefa</DialogTitle>
          <DialogDescription>
            Atualize os detalhes da tarefa abaixo.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
          <div>
            <Label htmlFor="edit-title">Título</Label>
            <Input
              id="edit-title"
              value={formData.title}
              onChange={(e) =>
                onFormDataChange({ ...formData, title: e.target.value })
              }
              placeholder="Digite o título da tarefa"
            />
          </div>
          <div>
            <Label htmlFor="edit-description">Descrição</Label>
            <Textarea
              id="edit-description"
              value={formData.description}
              onChange={(e) =>
                onFormDataChange({ ...formData, description: e.target.value })
              }
              placeholder="Digite a descrição da tarefa"
              rows={3}
            />
          </div>
          <div>
            <Label htmlFor="edit-status">Status</Label>
            <Select
              value={formData.status}
              onValueChange={(value) =>
                onFormDataChange({ ...formData, status: value })
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Selecione o status" />
              </SelectTrigger>
              <SelectContent>
                {statusOptions.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancelar
          </Button>
          <Button
            onClick={onSubmit}
            disabled={!formData.title.trim() || isSubmitting}
          >
            {isSubmitting ? "Atualizando..." : "Atualizar Tarefa"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
