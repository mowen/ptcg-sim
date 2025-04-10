class BoardStateDTO {
  public gxUsed: boolean = false;
  public vstarUsed: boolean = false;
  public hand: Array<number> = new Array<number>();
  public prize: Array<number> = new Array<number>();
  public deck: Array<number> = new Array<number>();
  public bench: Array<number> = new Array<number>();
  public active: Array<number> = new Array<number>();
  public discard: Array<number> = new Array<number>();
  public board: Array<number> = new Array<number>();
  public lostZone: Array<number> = new Array<number>();
  public stadium: Array<number> = new Array<number>();
  public attached: Record<number, Array<number>> = {};
  public damage: Record<number, number> = {};
  public abilityUsed: Array<number> = new Array<number>();
}

export { BoardStateDTO };
