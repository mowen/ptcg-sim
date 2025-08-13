class UiActionDTO {
  public readonly type?: string;
  public readonly user?: string;
  public readonly parameters?: Array<unknown> = new Array<unknown>();
}

export { UiActionDTO };
