import { PrismaClient, Todo } from "@prisma/client"
import TodosRepository from "."

export class PrismaTodosRepository implements TodosRepository {
  constructor(
    private prisma: PrismaClient
  ){}

  async getTodos(): Promise<Todo[]> {
    return this.prisma.todo.findMany()
  }
  async addTodo(text: string): Promise<void> {
    await this.prisma.todo.create({ data: {
      text,
    } })
    return
  }

  async updateTodo({
    updatedAt: _,
    createdAt: __,
    completed,
    id,
    text
  }: Todo): Promise<void> {
    // discard updatedAt and createdAt fields for security
    this.prisma.todo.update({
      where: { id },
      data: { id, text, completed, updatedAt: new Date() }
    })
  }

  async deleteTodo(id: string): Promise<void> {
    this.prisma.todo.delete({ where: { id } })
  }

  async getTodo(id: string): Promise<Todo | null> {
    return this.prisma.todo.findUnique({ where: { id } })
  }

}
