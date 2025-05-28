import { GetTaskController } from "../../../../domain/task/controller/get-task-controller";
import { DeleteTaskController } from "../../../../domain/task/controller/delete-task-controller";
import { CreateTaskController } from "../../../../domain/task/controller/create-task-controller";
import {
  CreateTaskValidator,
  GetTaskValidator,
  UpdateTaskValidator,
} from "../../../../domain/task/validator";
import { Router } from "express";
import { ListTasksController } from "../../../../domain/task/controller/list-tasks-controller";
import { UpdateTaskController } from "../../../../domain/task/controller/update-task-controller";

const taskRoutes = Router();

taskRoutes.post("/", CreateTaskValidator, CreateTaskController.handle);
taskRoutes.get("/", ListTasksController.handle);
taskRoutes.get("/:id", GetTaskValidator, GetTaskController.handle);
taskRoutes.put("/:id", UpdateTaskValidator, UpdateTaskController.handle);
taskRoutes.delete("/:id", DeleteTaskController.handle);

export { taskRoutes };
