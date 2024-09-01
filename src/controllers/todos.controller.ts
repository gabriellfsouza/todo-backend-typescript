import { Request, Response } from "express";

import { z } from "zod";
import TodosRepository from "../repositories/todos.repository";
import ZodValidatorUtil from "../utils/zod-validator.util";
import CreateTodoUseCase from "../use-cases/create-todo.use-case";

export const storeRequestBodySchema = z.object({
  text: z.string(),
})

export default class TodosController {
  constructor(private todosRepository: TodosRepository) {}

  show = async (req:Request, res:Response) => {}

  index = async (req:Request, res:Response) => {}

  store = async (req:Request, res:Response) => {
    const storeValidator = new ZodValidatorUtil(storeRequestBodySchema)
    const todo = storeValidator.validate(req.body);
    const createTodoUseCase = new CreateTodoUseCase(this.todosRepository);
    await createTodoUseCase.execute(todo.text);
    return res.status(201).send();
  }

  update = async (req:Request, res:Response) => {}

  destroy = async (req:Request, res:Response) => {}

}
