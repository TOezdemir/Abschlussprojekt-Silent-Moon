import { NavLink } from "react-router-dom";
import Searchbar from "../components/Searchbar";

export default function HomePage() {
  return (
    <>
      <div className="app">
        <section className="home-headline">
          <h2>Good morning Leon</h2>
          <p>We hope you have a good day</p>
        </section>
        <section className="video-section">
          <p>Hier kommen random Videos hin</p>
        </section>
        <Searchbar />
        <section className="yoga-section">
          <p>Recomended Yoga for you</p>
          <div>Hier werden alle verfügbaren Yoga Videos gerendert</div>
        </section>
        <section className="meditation-section">
          <p>Recomended Meditation for you</p>
          <div>Hier werden alle verfügbaren Meditations Videos gerendert</div>
        </section>
        <section>
          <li>
            <NavLink to="/reminders">Test Link zur Reminder Site</NavLink>
          </li>
        </section>
      </div>
    </>
  );
}
