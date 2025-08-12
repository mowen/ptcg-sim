class ActionDTO {
  public readonly user?: string;
  public readonly type?: string;
  public readonly emit: boolean = true;
  public readonly parameters: Array<unknown> = new Array<unknown>();
}

export { ActionDTO };
