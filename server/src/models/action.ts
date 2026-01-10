export class Action {
  constructor(
    public user: string,
    public action: string,
    public parameters: Array<unknown>,
    public emit: boolean,
  ) {}
}
