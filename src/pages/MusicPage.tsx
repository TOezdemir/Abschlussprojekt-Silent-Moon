import { useQuery } from "@tanstack/react-query";
import { useRef, useState } from "react";
import { supabase } from "../lib/supabaseClient";
import slugify from "slugify";
import { Link } from "react-router-dom";
import "./MusicPage.css";
import ReactPlayer from "react-player";

interface Music {
  id: string
  name: string
  thumbnail: string
  url: string
}

export default function MusicPage() {
  const [searchText, setSearchText] = useState("");
  const [category, setCategory] = useState<string>("mantra");
  const inputRef = useRef<HTMLInputElement>(null);

  const allMusicQuery = useQuery<Music[], Error>({
    queryKey: ["supabase", "music", category, searchText],
    queryFn: async () => {
      const result =  await supabase
        .from(`yoga_category_${category}` as keyof typeof supabase.from)
        .select("*")
        .ilike("name", `%${searchText}%`);

      if (result.error) {
        throw result.error;
      }
      return result.data as Music[]
    },
    enabled: !!category,
  });

  if (allMusicQuery.isLoading) {
    return "...loading Music";
  }

  if (allMusicQuery.isError || !allMusicQuery.data) {
    return "...can't fetch Music data!";
  }

  const handleSearch: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    const value = inputRef.current?.value || "";
    setSearchText(value);
  };

  const handleReset = () => {
    inputRef.current!.value = "";
    setSearchText("");
  };

  const handleCategoryChange = (newCategory: string) => {
    setCategory(newCategory);
    setSearchText("");
    inputRef.current!.value = "";
  };

  const allMusicTracks = allMusicQuery.data;

  return (
    <div>
      <div className="music">
        <h1>Yoga Music</h1>
        <p>find your inner rhythm and peace</p>
      </div>
      <div className="categories">
        <button
          className="categories-box"
          onClick={() => handleCategoryChange("mantra")}
          style={{
            backgroundImage: `url("src/assets/img/filter2.png")`,
            backgroundPosition: "center",
            backgroundSize: "cover",
            color: "white",
            fontWeight: "bold",
          }}
        >
          Mantra
        </button>
        <button
          className="categories-box"
          onClick={() => handleCategoryChange("piano")}
          style={{
            backgroundImage: `url("src/assets/img/filter1.png")`,
            backgroundPosition: "center",
            backgroundSize: "cover",
            color: "white",
            fontWeight: "bold",
          }}
        >
          Piano
        </button>
        <button
          className="categories-box"
          onClick={() => handleCategoryChange("binaural")}
          style={{
            backgroundImage: `url("src/assets/img/filter3.png")`,
            backgroundPosition: "center",
            backgroundSize: "cover",
            color: "white",
            fontWeight: "bold",
          }}
        >
          Binaural
        </button>
      </div>

      <div className="music-saerchbar">
        <form className="zen-search-btn" onSubmit={handleSearch}>
          <input
            className="yoga-input"
            ref={inputRef}
            type="search"
            placeholder="Search for music"
          />
          {searchText && (
            <button className="input-btn" onClick={handleReset}>
              X
            </button>
          )}
        </form>
      </div>

      <div className="music-list">
        {allMusicTracks?.map((music) => (
          <Link
            key={music.id}
            to={`/music/${slugify(music.name, { lower: true })}/${music.id}`}
            className="music-link"
          >
            <div
              className="music-item"
              style={{
                display: "flex",
                alignItems: "center",
                flexDirection: "row",
              }}
            >
              <img
                src="/src/assets/img/play-2.svg"
                alt="Play"
                style={{
                  width: "30px",
                  height: "30px",
                  marginRight: "10px",
                }}
              />
              <h2
                className="music-title"
                style={{
                  flex: "1",
                  textAlign: "center",
                  margin: "0",
                }}
              >
                {music.name}{" "}
              </h2>
              <ReactPlayer
                url={music.url}
                playing={false}
                controls={true}
                width="0"
                height="0"
                className="music-player"
                style={{
                  display: "none",
                }}
              />
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
