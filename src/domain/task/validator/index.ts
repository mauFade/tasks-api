import { celebrate, Joi, Segments } from "celebrate";

export const CreateTaskValidator = celebrate({
  [Segments.BODY]: Joi.object().keys({
    title: Joi.string().required(),
    description: Joi.string().optional(),
    status: Joi.string().required(),
    dueDate: Joi.date().required(),
  }),
});

export const UpdateTaskValidator = celebrate({
  [Segments.PARAMS]: Joi.object().keys({
    id: Joi.string().required(),
  }),
  [Segments.BODY]: Joi.object().keys({
    title: Joi.string().optional(),
    description: Joi.string().optional(),
    status: Joi.string().optional(),
    dueDate: Joi.date().optional(),
  }),
});

export const GetTaskValidator = celebrate({
  [Segments.PARAMS]: Joi.object().keys({
    id: Joi.string().required(),
  }),
});

export const DeleteTaskValidator = celebrate({
  [Segments.PARAMS]: Joi.object().keys({
    id: Joi.string().required(),
  }),
});
