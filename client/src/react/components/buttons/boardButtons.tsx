import { flipCoin } from '../../../actions/general/flip-coin';
import { takeTurn } from '../../../actions/general/take-turn';
import { systemState } from '../../../front-end';
import { refreshBoardImages } from '../../../setup/sizing/refresh-board';

export function BoardButtons({
  isSelfActive,
  setIsSelfActive,
}: {
  isSelfActive: boolean;
  setIsSelfActive: (b: boolean) => void;
}) {
  return (
    <div id="boardButtonContainer">
      <div className="tooltip" id="turnButton">
        <button
          onClick={() => takeTurn(systemState.initiator, systemState.initiator)}
        >
          +Turn
        </button>
        <span className="tooltiptext">Start turn</span>
      </div>
      <div className="tooltip" id="flipCoinButton">
        <button onClick={() => flipCoin(systemState.initiator)}>Coin</button>
        <span className="tooltiptext">Flip coin</span>
      </div>
      <div className="tooltip" id="flipBoardButton">
        <button onClick={() => setIsSelfActive(!isSelfActive)}>⇅</button>
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
