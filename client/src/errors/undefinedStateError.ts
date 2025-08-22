export class UndefinedStateError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "UndefinedStateError";
  }
}
