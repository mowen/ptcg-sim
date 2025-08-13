export class InvalidSourceCardError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "InvalidSourceCardError";
  }
}
