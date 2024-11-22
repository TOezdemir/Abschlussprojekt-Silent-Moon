export default function RemindersPage() {
  return (
    <>
      <div className="reminders">
        <div className="r-headline">
          <h2>What time would you like to meditate ?</h2>
          <p>
            Any time you can choose but We recommend first thing in th morning.
          </p>
        </div>
        <div className="time"> Hier kommt der Time Selector hin</div>
        <div className="r-headline">
          <h2>Which day would you like to meditate?</h2>
          <p>Everyday is best, but we recommend picking at least five.</p>
        </div>
        <div className="choose-days">
          <div>
            <button>SU</button>
          </div>
          <div>
            <button>M</button>
          </div>
          <div>
            <button>TU</button>
          </div>
          <div>
            <button>W</button>
          </div>
          <div>
            <button>TH</button>
          </div>
          <div>
            <button>F</button>
          </div>
          <div>
            <button>S</button>
          </div>
        </div>
        <div>
          <button className="default-btn">SAVE</button>
        </div>
        <div>
          <button className="no-thanks">No Thanks</button>
        </div>
      </div>
    </>
  );
}
