import { useQuery } from "@tanstack/react-query";
import { ElementRef, useRef, useState } from "react";
import { supabase } from "../lib/supabaseClient";
import slugify from "slugify";
import { Link } from "react-router-dom";
import Categories from "../components/Categories";

export default function YogaPage() {
  const [searchText, setSearchText] = useState("");
  const inputRef = useRef<ElementRef<"input">>(null);

  const allYogaQuery = useQuery({
    queryKey: ["supabase", "yoga", searchText],
    queryFn: async () => {
      const result = await supabase
        .from("yoga")
        .select("*")
        .ilike("name", `%${searchText}%`);

      if (result.error) {
        throw result.error;
      }
      return result.data;
    },
  });

  if (allYogaQuery.isPending) {
    return "...loading Yoga";
  }
  if (allYogaQuery.isError || !allYogaQuery.data) {
    return "...can't fetch Yoga data!";
  }

  const handleSearch: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    const value = inputRef.current?.value || "";
    setSearchText(value);
    console.log(searchText);
  };

  const handleReset = () => {
    inputRef.current!.value = "";
    setSearchText("");
  };

  const allYogaPoses = allYogaQuery.data;

  return (
    <div>
      <div className="yoga">
        <h1>Yoga</h1>
        <Categories />
        <p>Find your inner zen from anywhere.</p>
      </div>
      <div className="yoga-saerchbar">
        <form className="zen-search-btn" onSubmit={handleSearch}>
          <input
            className="yoga-input"
            ref={inputRef}
            type="text"
            placeholder="search for yoga videos"
          />
          {searchText && (
            <button className="input-btn" onClick={handleReset}>
              X
            </button>
          )}
        </form>
      </div>
      <div className="random-player">
        <p>Lerne Yoga kennen / Daily Random Affirmations</p>
      </div>
      <div>
        <div className="yoga-videos">
          {allYogaPoses.map((allYoga) => (
            <Link
              key={allYoga.id}
              to={`/yoga/${slugify(allYoga.name, { lower: true })}/${
                allYoga.id
              }`}
            >
              <div
                className="yoga-cards"
                style={{
                  backgroundImage: `url(${allYoga.image_url})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  width: "145px",
                  height: "145px",
                }}
              >
                <h2>{allYoga.name}</h2>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

// export default function YogaPage() {
//   return (
//     <div>
//       <h1>Yoga Page</h1>

//       <div>
//       <button>
//           <Link to="/yogavideo">Yoga Video</Link>
//         </button>
//         <button>
//           <Link to="/yogabinaural">Yoga Binaural</Link>
//         </button>
//         <button>
//           <Link to="/yogamantra">Yoga Mantra</Link>
//         </button>
//         <button>
//           <Link to="/yogapiano">Yoga Piano</Link>
//         </button>

//       </div>
//     </div>
//   );
// }
