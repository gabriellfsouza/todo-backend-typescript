import { PrismaClient } from '@prisma/client';
import { Application } from 'express';

import request from 'supertest'

describe('Todos Controller', () => {
  let app: Application;
  let prisma: PrismaClient;
  beforeAll(async () => {
    // To make sure we are using the test database_url;
    app = (await import('../app')).default;
    prisma = new PrismaClient();
  });

  describe('POST /todos', () => {
    beforeEach(async () => {
      await prisma.todo.deleteMany({});
    });

    it('should create a new todo', async () => {

      const response = await request(app).post('/todos').send({ text: 'Test Todo' });

      const todos = await prisma.todo.findMany({});

      console.log({todos});

      expect(response.statusCode).toBe(201);
      expect(todos).toHaveLength(1);
      expect(todos).toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            id: expect.any(String),
            text: 'Test Todo',
            completed: false,
            createdAt: expect.any(Date),
            updatedAt: expect.any(Date),
          })
        ])
      )
    })

    it('should return 400 if text is empty', async () => {
      const response = await request(app).post('/todos').send({ text: '' });

      expect(response.statusCode).toBe(400);
      expect(response.body).toEqual({ message: 'Text is required' });
    });

    it('should return 400 if text is not provided', async () => {
      const response = await request(app).post('/todos').send({});
      expect(response.statusCode).toBe(400);
    });
  })
});
