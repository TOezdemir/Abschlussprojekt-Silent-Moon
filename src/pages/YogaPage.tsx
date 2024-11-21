



import { Link } from "react-router-dom";

export default function YogaPage() {
  return (
    <div>
      <h1>Yoga Page</h1>
      
      <div>
      <button>
          <Link to="/yogavideo">Yoga Video</Link>
        </button>
        <button>
          <Link to="/yogabinaural">Yoga Binaural</Link>
        </button>
        <button>
          <Link to="/yogamantra">Yoga Mantra</Link>
        </button>
        <button>
          <Link to="/yogapiano">Yoga Piano</Link>
        </button>
      
      </div>
    </div>
  );
}