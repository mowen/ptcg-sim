function KeybindModal({ show }: { show: boolean }) {
  return show ? (
    <div id="keybindModal">
      <div className="keybind-section-container">
        <div className="keybind-section">
          <div className="keybind-column">
            <h1>Move card...</h1>
            <ul>
              <li>
                to Hand <code>[h]</code>
              </li>
              <li>
                to Discard <code>[d]</code>
              </li>
              <li>
                to Bench <code>[b]</code>
              </li>
              <li>
                to Active <code>[a]</code>
              </li>
              <li>
                to Stadium <code>[g]</code>
              </li>
              <li>
                to Lost Zone <code>[l]</code>
              </li>
              <li>
                to Prizes <code>[p]</code>
              </li>
              <li>
                to Board <code>[space]</code>
              </li>
              <li>
                to Deck (top) <code>[↑]</code>
              </li>
              <li>
                to Deck (bottom) <code>[↓]</code>
              </li>
              <li>
                to Deck (switch) <code>[→]</code>
              </li>
              <li>
                to Deck (shuffle)<code>[s]</code>
              </li>
            </ul>
          </div>
          <div className="keybind-column">
            <h1>Deck</h1>
            <ul>
              <li>
                Shuffle deck<code>[s]</code>
              </li>
              <li>
                Draw card(s)<code>[1-9]</code>
              </li>
              <li>
                View top card(s)<code>[alt + 1-9]</code>
              </li>
              <li>
                View bottom card(s)<code>[ctrl + 1-9]</code>
              </li>
              <li>
                View <code>[v]</code>
              </li>
            </ul>
          </div>
          <div className="keybind-column">
            <h1>Hand</h1>
            <ul>
              <li>
                Discard hand<code>[alt + d]</code>
              </li>
              <li>
                Shuffle hand into deck <code>[alt + s]</code>
              </li>
              <li>
                Shuffle hand to bottom <code>[alt + ↓]</code>
              </li>
            </ul>
          </div>
          <div className="keybind-column">
            <h1>Playboard</h1>
            <ul>
              <li>
                Discard all<code>[enter]</code>
              </li>
              <li>
                Move all to hand<code>[alt + enter]</code>
              </li>
              <li>
                Shuffle all into deck<code>[/]</code>
              </li>
            </ul>
          </div>
        </div>
        <div className="keybind-section">
          <div className="keybind-column">
            <h1>Card actions</h1>
            <ul>
              <li>
                Attach <code>[q]</code>
              </li>
              <li>
                Evolve <code>[e]</code>
              </li>
              <li>
                View (for cards in play, press twice) <code>[v]</code>
              </li>
              <li>
                Toggle ability/effect<code>[w]</code>
              </li>
              <li>Damage counter</li>
              <ul>
                <li>
                  Increase <code>[1-9]</code>
                </li>
                <li>
                  Decrease <code>[alt + 1-9]</code>
                </li>
                <li>
                  Remove <code>[0]</code>
                </li>
              </ul>
              <li>Special condition</li>
              <ul>
                <li>
                  Add/Toggle <code>[y]</code>
                </li>
                <li>
                  Remove <code>[alt + y]</code>
                </li>
              </ul>
              <li>
                Rotate card(s)<code>[r]</code>
              </li>
              <li>
                Rotate BREAK <code>[alt + r]</code>
              </li>
              <li>
                Look/cover card (only yourself)<code>[c]</code>
              </li>
              <li>
                Hide card (both players)<code>[z]</code>
              </li>
              <li>
                Reveal card (both players)<code>[alt + z]</code>
              </li>
              <li>
                Put face-down card in active<code>[z] → [a]</code>
              </li>
              <li>Change type...</li>
              <ul>
                <li>
                  to Tool <code>[alt + t]</code>
                </li>
                <li>
                  to Energy <code>[alt + e]</code>
                </li>
                <li>
                  to Pokémon <code>[alt + p]</code>
                </li>
              </ul>
            </ul>
          </div>
          <div className="keybind-column">
            <h1>General</h1>
            <ul>
              <li>
                Set up <code>[alt + n]</code>
              </li>
              <li>
                Reset <code>[alt + r]</code>
              </li>
              <li>
                Start turn <code>[alt + t]</code>
              </li>
              <li>
                Flip coin <code>[f]</code>
              </li>
              <li>
                Flip board <code>[alt + f]</code>
              </li>
              <li>
                Announce mulligan <code>[m]</code>
              </li>
              <li>
                Undo <code>[u]</code>
              </li>
              <li>
                Close popups <code>[esc]</code>
              </li>
              <li>
                Refresh images <code>[r]</code>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div style={{ position: 'absolute', bottom: 0, left: '20px' }}>
        <p style={{ fontSize: '1.5vh' }}>
          <strong>For macOS:</strong> Use <code>option</code> instead of{' '}
          <code>alt</code>
        </p>
      </div>
    </div>
  ) : null;
}

export default KeybindModal;
