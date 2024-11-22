import { Link } from "react-router-dom";

export default function RemindersPage() {
  return (
    <>
      <div className="reminders">
        <div className="r-headline">
          <h2>What time would you like to meditate ?</h2>
          <p>
            Any time you can choose but We recommend first thing in the morning.
          </p>
        </div>
        <div className="time"> Hier kommt der Time Selector hin</div>
        <div className="r-headline">
          <h2>Which day would you like to meditate?</h2>
          <p>Everyday is best, but we recommend picking at least five.</p>
        </div>
        <div className="choose-days">
          <div>
            {" "}
            {/*Hier muss noch etwas geändert werden */}
            <button>M</button>
          </div>
          <div>
            <button>T</button>
          </div>
          <div>
            <button>W</button>
          </div>
          <div>
            <button>T</button>
          </div>
          <div>
            <button>F</button>
          </div>
          <div>
            <button>S</button>
          </div>
          <div>
            <button>S</button>
          </div>
        </div>
        <div>
          <button className="default-btn">SAVE</button>
        </div>
        <div className="no-thanks">
          <Link to="/home">
            <button>No Thanks</button>
          </Link>
        </div>
      </div>
    </>
  );
}
