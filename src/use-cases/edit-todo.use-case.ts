import { Todo } from "@prisma/client";
import TodosRepository from "../repositories/todos.repository";

export default class EditTodoUseCase {
  constructor(private todosRepository: TodosRepository) {}

  async execute(id: string, updatedTodo: Omit<Todo, "createdAt" | "updatedAt">): Promise<void> {
    const existingTodo = await this.todosRepository.getTodo(id);

    if (!existingTodo) {
      throw new Error("Todo not found");
    }

    const todoToUpdate = { ...existingTodo, ...updatedTodo, id };

    await this.todosRepository.updateTodo(todoToUpdate);
  }
}
