import { Todo } from "@prisma/client";
import ListTodosUseCase from "./list-todos.use-case";
import FakeTodosRepository from "../repositories/todos.repository/mocks/fake-todos.repository.mock";

describe("ListTodosUseCase", () => {
  let todosRepository: FakeTodosRepository;
  let listTodosUseCase: ListTodosUseCase;

  beforeEach(() => {
    todosRepository = new FakeTodosRepository();
    listTodosUseCase = new ListTodosUseCase(todosRepository);
  });

  it("should return an array of todos", async () => {
    // Arrange
    todosRepository.addTodo("Todo 1"),
    todosRepository.addTodo("Todo 2")
    const expectedTodos: Todo[] = todosRepository.todos;

    // Act
    const todos = await listTodosUseCase.execute();

    // Assert
    expect(todos).toEqual(expectedTodos);
  });

  it("should return an empty array if no todos exist", async () => {
    // Arrange
    const expectedTodos: Todo[] = [];

    // Act
    const todos = await listTodosUseCase.execute();

    // Assert
    expect(todos).toEqual(expectedTodos);
  });
});
