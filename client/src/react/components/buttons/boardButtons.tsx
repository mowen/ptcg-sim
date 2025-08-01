export function BoardButtons({
  boardUser,
  flipCoin,
  takeTurn,
  flipActive,
}: {
  boardUser: string;
  flipCoin: (boardUser: string) => void;
  takeTurn: (boardUser: string) => void;
  flipActive: () => void;
}) {
  return (
    <div id="boardButtonContainer">
      <div className="tooltip" id="turnButton">
        <button onClick={() => takeTurn(boardUser)}>+Turn</button>
        <span className="tooltiptext">Start turn</span>
      </div>
      <div className="tooltip" id="flipCoinButton">
        <button onClick={() => flipCoin(boardUser)}>Coin</button>
        <span className="tooltiptext">Flip coin</span>
      </div>
      <div className="tooltip" id="flipBoardButton">
        <button onClick={flipActive}>⇅</button>
        <span className="tooltiptext">Flip board</span>
      </div>
    </div>
  );
}
