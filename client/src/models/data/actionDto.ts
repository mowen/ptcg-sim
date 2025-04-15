import { Patch } from 'immer';

class ActionDTO {
  public readonly user: string;
  public readonly type: string;
  public readonly emit: boolean = true;
  public readonly parameters: Array<unknown> = new Array<unknown>();
  public readonly patches?: Array<Patch> = new Array<Patch>();
}

export { ActionDTO };
