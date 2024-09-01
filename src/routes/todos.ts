import { Router } from 'express';
import { PrismaClient } from "@prisma/client";
import { PrismaTodosRepository } from '../repositories/todos.repository/prisma-todos.repository';
import TodosController from '../controllers/todos.controller';

/**
 * The todosRouter function is a factory function that returns a Router instance.
 * @param prisma PrismaClient instance
 * @returns
 */
export default function todosRouter(prisma: PrismaClient): Router {
  const todosRepository = new PrismaTodosRepository(prisma);
  const todosController = new TodosController(todosRepository);

  const todosRouter = Router();

  todosRouter
    .route('/:id')
    .get(todosController.show)
    .put(todosController.update)
    .delete(todosController.destroy);

  todosRouter
    .route('/')
    .get(todosController.index)
    .post(todosController.store);

  return todosRouter;
}

