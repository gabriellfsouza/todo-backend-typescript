import z from 'zod';

const envSchema = z.object({
  DATABASE_URL: z.string(),
  PORT: z.string().default('3333'),
});

const envParsed = envSchema.safeParse(process.env);

if (!envParsed.success) {
  throw new Error(envParsed.error.message);
}

const env = envParsed.data;

export default env;
