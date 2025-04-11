import { useContext } from 'react';
import { systemState } from '../../../front-end.js';
import { appendMessage } from '../../../setup/chatbox/append-message.js';
import { determineUsername } from '../../../setup/general/determine-username.js';
import { AppDispatchContext } from '../../context/appContext.js';

function GxVStarButton({
  user,
  type,
  used,
}: {
  user: string;
  type: string;
  used: boolean;
}) {
  const processAction = useContext(AppDispatchContext);

  const onClick = () => {
    const emit = true;
    if (user === 'opp' && emit && systemState.isTwoPlayer) {
      processAction({user, emit, type: 'VSTARGXFunction', parameters: [type]});
      return;
    }

    const message = `${determineUsername(user)} ${
      !used ? 'used' : 'reset'
    } their ${type}`;
    appendMessage(user, message, 'player', false);
    processAction({user, emit, type: 'VSTARGXFunction', parameters: [type]});
  };

  return (
    <button className={used ? 'used-special-move' : ''} onClick={onClick}>
      {type}
    </button>
  );
}

export default GxVStarButton;
