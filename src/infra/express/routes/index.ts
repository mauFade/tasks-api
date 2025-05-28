import { Router } from "express";
import { taskRoutes } from "./tasks/taks-routes";
import { userRoutes } from "./user/user-routes";

const routes = Router();

routes.use("/tasks", taskRoutes);
routes.use("/users", userRoutes);

export { routes };
