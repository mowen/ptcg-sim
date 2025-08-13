import GxVStarButton from "../buttons/gxVStarButton";

export function SpecialMoves({
  cssUser,
  boardUser,
  vstarUsed,
  gxUsed,
}: {
  cssUser: string;
  boardUser: string;
  vstarUsed: boolean;
  gxUsed: boolean;
}) {
  return (
    <div
      id="specialMoveButtonContainer"
      className={`${cssUser}-special-move-button-container`}
    >
      <GxVStarButton user={boardUser} type="VSTAR" used={vstarUsed} />
      <GxVStarButton user={boardUser} type="GX" used={gxUsed} />
    </div>
  );
}
