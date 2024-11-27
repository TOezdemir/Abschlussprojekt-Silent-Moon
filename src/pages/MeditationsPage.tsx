import { useQuery } from "@tanstack/react-query";
import { ElementRef, useRef, useState } from "react";
import { supabase } from "../lib/supabaseClient";
import slugify from "slugify";
import { Link } from "react-router-dom";

export default function MeditationsPage() {
  const [searchText, setSearchText] = useState("");
  const inputRef = useRef<ElementRef<"input">>(null);

  const allMeditationQuery = useQuery({
    queryKey: ["supabase", "meditation", searchText],
    queryFn: async () => {
      const result = await supabase
        .from("meditation")
        .select(
          `
            *,
            meditation_categories(
            name)`
        )
        .ilike("name", `%${searchText}%`);

      if (result.error) {
        throw result.error;
      }
      return result.data;
    },
  });

  if (allMeditationQuery.isPending) {
    return "...loading Meditation";
  }
  if (allMeditationQuery.isError || !allMeditationQuery.data) {
    return "...can't fetch Meditation!";
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

  const allMeditations = allMeditationQuery.data;

  return (
    <div>
      <div className="meditation">
        <h1>Meditate</h1>
        <p>
          Audio-only meditation techniques <br />
          to help you minimize your screen time <br />
          and practice on the go.
        </p>
      </div>
      <div className="yoga-saerchbar">
        <form className="zen-search-btn" onSubmit={handleSearch}>
          <input
            className="yoga-input"
            ref={inputRef}
            type="search"
            placeholder="search for meditation "
          />
          {searchText && (
            <button className="input-btn" onClick={handleReset}>
              X
            </button>
          )}
        </form>
      </div>
      <div className="random-player">
        <p>Lerne Meditation kennen / Daily Random Affirmations</p>
      </div>
      {/* <div className="card-section"> */}
      <div className="yoga-videos">
        {allMeditations.map((allMeditation) => (
          <Link
            key={allMeditation.id}
            to={`/meditation/${slugify(allMeditation.name, {
              lower: true,
            })}/${allMeditation.id}`}
            style={{ textDecoration: "none" }}
          >
            <div
              className="meditation-cards"
              style={{
                backgroundImage: `url(${allMeditation.image_url})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                width: "145px",
                height: "195px",
              }}
            >
              <h2>{allMeditation.name}</h2>
              {/* <p>{allMeditation.meditation_categories?.name}</p> */}
            </div>
          </Link>
        ))}
      </div>
    </div>
    // </div>
  );
}
