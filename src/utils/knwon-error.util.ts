export default class KnownError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'KnownError';
  }
}
