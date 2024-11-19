import Logo from "../components/Logo";
// import Navbar from "../components/Navbar";
import Searchbar from "../components/Searchbar";

export default function HomePage() {
  return (
    <>
      <div>Home</div>
      <Logo />
      <section className="home-headline">
        <h2>Good morning Leon</h2>
        <p>We hope you have a good day</p>
      </section>
      <section className="video-section">
        <p>
          Hier werden immer zwei random Videos aus den Kategorien Yoga &
          Meditation als Cards gerendert
        </p>
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
      {/* <Navbar /> */}
    </>
  );
}
