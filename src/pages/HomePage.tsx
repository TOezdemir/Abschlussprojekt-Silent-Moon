import { useQuery } from "@tanstack/react-query";
import { ElementRef, useRef, useState } from "react";
import { supabase } from "../lib/supabaseClient";
import slugify from "slugify";
import { Link } from "react-router-dom";
import { useUserContext } from "../context/userContext";

export default function HomePage() {
  const [searchText, setSearchText] = useState("");
  const inputRef = useRef<ElementRef<"input">>(null);
  const { user } = useUserContext();

  // Abfrage für Vornamen
  const firstNameQuery = useQuery({
    queryKey: ["supabase", "profiles", user?.id],
    queryFn: async () => {
      if (!user?.id) {
        return { first_name: " " };
      }
      const result = await supabase
        .from("profiles")
        .select("first_name")
        .eq("id", user!.id)
        .single();
      if (result.error) {
        throw result.error;
      }
      return result.data;
    },
  });

  const highlightYogaQuery = useQuery({
    queryKey: ["supabase", "yoga"],
    queryFn: async () => {
      const result = await supabase.from("yoga").select("*").limit(1);
      // .ilike("name", `%${searchText}%`);

      if (result.error) {
        throw result.error;
      }
      return result.data;
    },
  });

  const highlightMeditationQuery = useQuery({
    queryKey: ["supabase", "meditation"],
    queryFn: async () => {
      const result = await supabase
        .from("meditation")
        .select(
          `
        *,
        meditation_categories(
        name)`
        )
        .limit(1);
      // .ilike("name", `%${searchText}%`);

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

  if (highlightYogaQuery.isLoading || highlightMeditationQuery.isLoading) {
    return "... loading";
  }

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

  if (firstNameQuery.isPending) {
    return "... loading name";
  }
  if (firstNameQuery.isError || !firstNameQuery.data) {
    return "... can't fetch name!";
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
    <div className="content-margin">
      <div className="home">
        <section className="home-headline">
          <h2>
            Hey{" "}
            {user?.user_metadata?.first_name ?? firstNameQuery.data?.first_name}
            !
          </h2>
          <p style={{ fontWeight: "bold" }}>We hope you have a good day</p>
        </section>
        <section className="highlight-section">
          {highlightYogaQuery.data.length > 0 && (
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
                  style={{ textDecoration: "none" }}
                >
                  <div className="card-text-align-hp">
                    <h2 style={{ marginBottom: "7em" }}>{yoga.name}</h2>
                    <p>{yoga.difficulty}</p>
                    <p style={{ marginTop: "0.5em" }}>{yoga.duration}</p>
                  </div>
                </Link>
              ))}
            </div>
          )}
          {highlightMeditationQuery.data.length > 0 && (
            <div
              className="yoga-cards"
              style={{
                backgroundImage: `url(${highlightMeditations[0]!.image_url})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                width: "150px",
                height: "180px",
              }}
            >
              {highlightMeditations.map((meditation) => (
                <Link
                  key={meditation.id}
                  to={`/meditation/${slugify(meditation.name, {
                    lower: true,
                  })}/${meditation.id}`}
                  style={{ textDecoration: "none" }}
                >
                  <div className="card-text-align-hp">
                    <h2 style={{ marginBottom: "7em" }}>{meditation.name}</h2>
                    <p>{meditation.meditation_categories?.name}</p>
                    <p style={{ marginTop: "0.5em" }}>{meditation.duration}</p>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </section>
        <section>
          <div className="yoga-saerchbar">
            <form className="zen-search-btn" onSubmit={handleSearch}>
              <input
                className="yoga-input"
                ref={inputRef}
                type="text"
                placeholder="Zen Search"
              />
              {searchText && (
                <button className="input-btn" onClick={handleReset}>
                  X
                </button>
              )}
            </form>
          </div>
        </section>
        <section className="yoga-section">
          <h4>Recomended Yoga for you</h4>
          <div
            style={{
              marginTop: "2em",
              display: "flex",
              flexDirection: "row",
              flexWrap: "wrap",
              gap: "1em",
            }}
          >
            {allYogaPoses.map((allYoga) => (
              <Link
                key={allYoga.id}
                to={`/yoga/${slugify(allYoga.name, { lower: true })}/${
                  allYoga.id
                }`}
                style={{
                  textDecoration: "none",
                }}
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
                  {/* <img src="" alt="yoga_bgimage" /> */}
                  <h2 style={{ textAlign: "center" }}>{allYoga.name}</h2>
                  {/* <p
                  style={{
                    color: "white",
                    textAlign: "center",
                    fontSize: "small",
                  }}
                >
                  {allYoga.difficulty}
                </p> */}
                  {/* <p
                  style={{
                    marginTop: "0.5em",
                    color: "white",
                    fontSize: "small",
                  }}
                >
                  {allYoga.duration}
                </p> */}
                </div>
              </Link>
            ))}
          </div>
        </section>

        <section className="meditation-section">
          <h4 style={{ marginBottom: "2em", marginTop: "2em" }}>
            Recommended Meditations for you
          </h4>
          <div
            className="yoga-cards"
            style={{
              backgroundImage: `url(${allMeditations[0].image_url})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              width: "145px",
              height: "195px",
            }}
          >
            {allMeditations.map((allMeditation) => (
              <Link
                key={allMeditation.id}
                to={`/meditation/${slugify(allMeditation.name, {
                  lower: true,
                })}/${allMeditation.id}`}
                style={{ textDecoration: "none" }}
              >
                <div className="card-text-align-hp">
                  {/* <img src="" alt="meditation_bgimage" /> */}
                  <h2 style={{ marginBottom: "7em" }}>{allMeditation.name}</h2>
                  <p>{allMeditation.meditation_categories?.name}</p>
                  <p style={{ marginTop: "0.5em" }}>{allMeditation.duration}</p>
                </div>
              </Link>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
