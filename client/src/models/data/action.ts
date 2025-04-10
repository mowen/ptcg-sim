class Action {
  user: string;
  type: string;
  emit: boolean;
  parameters: Array<unknown>;

  constructor(
    user: string,
    emit: boolean,
    action: string,
    parameters: Array<unknown>
  ) {
    this.user = user;
    this.emit = emit;
    this.type = action;
    this.parameters = parameters;
  }
}

export { Action };
