import { Todo } from "@prisma/client";
import TodosRepository from "..";
import { randomUUID } from "node:crypto";

export default class FakeTodosRepository implements TodosRepository {
  public todos: Todo[] = [];

  async getTodos(): Promise<Todo[]> {
    return this.todos
  }

  async addTodo(text: string): Promise<void> {
    const date = Date.now();
    this.todos.push({
      id: randomUUID(),
      text,
      updatedAt: new Date(date),
      completed: false,
      createdAt: new Date(date),
    });
  }

  async updateTodo({
    updatedAt: _,
    createdAt: __,
    ...todo
  }: Partial<Todo>): Promise<void> {
    const todoIdx = this.todos.findIndex(t => t.id === todo.id);
    this.todos[todoIdx] = { ...this.todos[todoIdx], ...todo, updatedAt: new Date() };
  }

  async deleteTodo(id: string): Promise<void> {
    this.todos = this.todos.filter(todo => todo.id !== id);
  }

  async getTodo(id: string): Promise<Todo | null> {
    return this.todos.find(todo => todo.id === id) || null;
  }
}
