export default function RemindersPage() {
  return (
    <>
      <div>Reminder</div>
      <div>
        <h2>What time would you like to meditate ?</h2>
        <p>
          Any time you can choose but We recommend first thing in th morning.
        </p>
      </div>
      <div className=""> Hier kommt der Time Selector hin</div>
      <div>
        <h2>Which day would you like to meditate?</h2>
        <p>Everyday is best, but we recommend picking at least five.</p>
      </div>
      <div className="choose-days">
        <button>SU</button>
        <button>M</button>
        <button>TU</button>
        <button>W</button>
        <button>TH</button>
        <button>F</button>
        <button>S</button>
      </div>
      <div>
        <button className="btn-style">SAVE</button>
      </div>
      <div>
        <button className="no-thanks">No Thanks</button>
      </div>
    </>
  );
}
