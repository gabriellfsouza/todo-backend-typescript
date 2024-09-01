import FakeTodosRepository from "../repositories/todos.repository/mocks/fake-todos.repository.mock"
import CreateTodoUseCase from "./create-todo.use-case"

describe('Create Todo Use Case', () => {
  let todosRepository: FakeTodosRepository
  let useCase: CreateTodoUseCase

  beforeEach(() => {
    todosRepository = new FakeTodosRepository()
    useCase = new CreateTodoUseCase(todosRepository)
  })

  it('should create a todo', async () => {
    // Arrange
    const text = 'Test Todo';

    // Act
    await useCase.execute(text);

    // Assert
    expect(todosRepository.todos).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          text
        })]))
    expect(todosRepository.todos).toHaveLength(1)
  })

  it('should throw an error if text is empty', async () => {
    // Arrange
    const text = '';

    // Act
    const promise = useCase.execute(text);

    // Assert
    await expect(promise).rejects.toThrowError("Text is required");
  })

})
