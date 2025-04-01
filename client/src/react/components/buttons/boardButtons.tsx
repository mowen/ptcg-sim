import { flipCoin } from '../../../actions/general/flip-coin';
import { takeTurn } from '../../../actions/general/take-turn';
import { refreshBoardImages } from '../../../setup/sizing/refresh-board';

export function BoardButtons({
  user,
  toggleActive,
}: {
  user: string;
  toggleActive: () => void;
}) {
  return (
    <div id="boardButtonContainer">
      <div className="tooltip" id="turnButton">
        <button onClick={() => takeTurn(user, user)}>+Turn</button>
        <span className="tooltiptext">Start turn</span>
      </div>
      <div className="tooltip" id="flipCoinButton">
        <button onClick={() => flipCoin(user)}>Coin</button>
        <span className="tooltiptext">Flip coin</span>
      </div>
      <div className="tooltip" id="flipBoardButton">
        <button onClick={toggleActive}>⇅</button>
        <span className="tooltiptext">Flip board</span>
      </div>
      <div className="tooltip" id="refreshButton">
        <button onClick={refreshBoardImages}>
          <div id="refreshIcon">↻</div>
          <div id="loadingCircle"></div>
        </button>
        <span className="tooltiptext">Refresh images</span>
      </div>
    </div>
  );
}
