import { Todo } from "@prisma/client";
import TodosRepository from "../repositories/todos.repository";

export default class ListTodosUseCase {
  constructor(private todosRepository: TodosRepository) {}

  async execute(): Promise<Todo[]> {
    return this.todosRepository.getTodos();
  }
}
