export class InvalidBoardStateError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "InvalidBoardStateError";
  }
}
