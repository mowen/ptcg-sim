import GxVStarButton from '../buttons/gxVStarButton';

export function SpecialMoves({
  user,
  vstarUsed,
  gxUsed,
}: {
  user: string;
  vstarUsed: boolean;
  gxUsed: boolean;
}) {
  return (
    <div
      id="specialMoveButtonContainer"
      className={`${user}-special-move-button-container`}
    >
      <GxVStarButton user={user} type="VSTAR" used={vstarUsed} />
      <GxVStarButton user={user} type="GX" used={gxUsed} />
    </div>
  );
}
