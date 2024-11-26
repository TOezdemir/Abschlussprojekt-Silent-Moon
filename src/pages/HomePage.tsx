// import Searchbar from "../components/Searchbar";
import { useQuery } from "@tanstack/react-query";
import { ElementRef, useRef, useState } from "react";
import { supabase } from "../lib/supabaseClient";
import slugify from "slugify";
import { Link } from "react-router-dom";
// import RecommendedYoga from "../components/RecommendedYoga";
// import RecommendedMeditation from "../components/RecommendedMeditation";

export default function HomePage() {
  const [searchText, setSearchText] = useState("");
  const inputRef = useRef<ElementRef<"input">>(null);

  const highlightYogaQuery = useQuery({
    queryKey: ["supabase", "yoga", searchText],
    queryFn: async () => {
      const result = await supabase
        .from("yoga")
        .select("*")
        .limit(1)
        .ilike("name", `%${searchText}%`);

      if (result.error) {
        throw result.error;
      }
      return result.data;
    },
  });

  const highlightMeditationQuery = useQuery({
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
        .limit(1)
        .ilike("name", `%${searchText}%`);

      if (result.error) {
        throw result.error;
      }
      return result.data;
    },
  });
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

  if (highlightYogaQuery.isPending) {
    return "...loading Yoga";
  }
  if (highlightYogaQuery.isError || !highlightYogaQuery.data) {
    return "...cant fetch Yoga data!";
  }
  if (highlightMeditationQuery.isPending) {
    return "...loading Meditation";
  }
  if (highlightMeditationQuery.isError || !highlightMeditationQuery.data) {
    return "...cant fetch Meditation!";
  }
  if (allYogaQuery.isPending) {
    return "...loading Yoga";
  }
  if (allYogaQuery.isError || !allYogaQuery.data) {
    return "...cant fetch Yoga data!";
  }
  if (allMeditationQuery.isPending) {
    return "...loading Meditation";
  }
  if (allMeditationQuery.isError || !allMeditationQuery.data) {
    return "...cant fetch Meditation!";
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

  const highlightYogaPoses = highlightYogaQuery.data;
  const highlightMeditations = highlightMeditationQuery.data;
  const allYogaPoses = allYogaQuery.data;
  const allMeditations = allMeditationQuery.data;

  return (
    <div className="home">
      <section className="home-headline">
        <h2>Good morning Leon</h2>
        <p>We hope you have a good day</p>
      </section>
      <section className="highlight-section">
        <div
          className="yoga-cards"
          style={{
            backgroundImage: `url(${highlightYogaPoses[0].image_url})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            width: "150px",
            height: "180px",
          }}
        >
          {highlightYogaPoses.map((yoga) => (
            <Link
              key={yoga.id}
              to={`/yoga/${slugify(yoga.name, { lower: true })}/${yoga.id}`}
            >
              <div>
                <h2>{yoga.name}</h2>
                <p>{yoga.difficulty}</p>
                <p>{yoga.duration}</p>
              </div>
            </Link>
          ))}
        </div>
        <div
          className="yoga-cards"
          style={{
            backgroundImage: `url(${highlightMeditations[0].image_url})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            width: "150px",
            height: "180px",
          }}
        >
          {highlightMeditations.map((meditation) => (
            <Link
              key={meditation.id}
              to={`/meditation/${slugify(meditation.name, { lower: true })}/${
                meditation.id
              }`}
            >
              <div>
                <h2>{meditation.name}</h2>
                <p>{meditation.meditation_categories?.name}</p>
                <p>{meditation.duration}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>
      <section>
        <div className="yoga-saerchbar">
          <form onSubmit={handleSearch}>
            <input
              className="yoga-input"
              ref={inputRef}
              type="text"
              placeholder="Zen Search"
            />
            {searchText && <button onClick={handleReset}>X</button>}
          </form>
        </div>
      </section>
      <section className="yoga-section">
        <h4>Recomended Yoga for you</h4>
        <div>
          {allYogaPoses.map((allYoga) => (
            <Link
              key={allYoga.id}
              to={`/yoga/${slugify(allYoga.name, { lower: true })}/${
                allYoga.id
              }`}
            >
              <div
                style={{
                  backgroundImage: `url(${allYoga.image_url})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  width: "145px",
                  height: "195px",
                }}
              >
                <img src="" alt="yoga_bgimage" />
                <h2>{allYoga.name}</h2>
                <p>{allYoga.difficulty}</p>
                <p>{allYoga.duration}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="meditation-section">
        <h4>Recommended Meditations for you</h4>
        <div>
          {allMeditations.map((allMeditation) => (
            <Link
              key={allMeditation.id}
              to={`/meditation/${slugify(allMeditation.name, {
                lower: true,
              })}/${allMeditation.id}`}
            >
              <div>
                <img src="" alt="meditation_bgimage" />
                <h2>{allMeditation.name}</h2>
                <p>{allMeditation.meditation_categories?.name}</p>
                <p>{allMeditation.duration}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
