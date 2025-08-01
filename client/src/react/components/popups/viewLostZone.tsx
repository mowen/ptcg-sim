function ViewLostZone({ cssUser }: { cssUser: string }) {
  return (
    <div id="lostZone" className={`${cssUser}-view`}>
      <div className="zone-button-container">
        <button id="closeLostZoneButton" className="zone-button">
          Close
        </button>
        <input type="checkbox" id="sortLostZoneCheckbox" />
        <label htmlFor="sortLostZoneCheckbox">Sort</label>
      </div>
    </div>
  );
}

export { ViewLostZone };
