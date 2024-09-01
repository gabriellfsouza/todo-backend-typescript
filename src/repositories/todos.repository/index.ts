import { type Todo } from "@prisma/client"

export default interface TodosRepository {
  getTodos(): Promise<Todo[]>
  addTodo(text: string): Promise<void>
  updateTodo(todo: Partial<Todo>): Promise<void>
  deleteTodo(id: string): Promise<void>
  getTodo(id: string): Promise<Todo | null>
}
