export class MissingCardError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "MissingCardError";
  }
}
