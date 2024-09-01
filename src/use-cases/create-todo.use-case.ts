
import TodosRepository from "../repositories/todos.repository";
import KnownError from "../utils/knwon-error.util";

export default class CreateTodoUseCase {
  constructor(private todoRepository: TodosRepository) {}

  async execute(text: string){
    if (!text) {
      throw new KnownError("Text is required");
    }
    await this.todoRepository.addTodo(text);
  }
}
