export class InvalidZoneError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "InvalidZoneError";
  }
}
