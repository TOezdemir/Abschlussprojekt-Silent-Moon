import { useQuery } from "@tanstack/react-query";
import { useRef, useState } from "react";
import { supabase } from "../lib/supabaseClient";
import slugify from "slugify";
import { Link } from "react-router-dom";
import './MusicPage.css';
import ReactPlayer from "react-player";


interface Music {
  id: string;
  name: string;
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
        <p>Find your inner rhythm and peace.</p>
      </div>

      <div className="music-buttons">
        <button onClick={() => handleCategoryChange("mantra")}>Mantra</button>
        <button onClick={() => handleCategoryChange("piano")}>Piano</button>
        <button onClick={() => handleCategoryChange("binaural")}>Binaural</button>
      </div>

      <div className="music-searchbar">
        <form onSubmit={handleSearch}>
          <input
            className="music-input"
            ref={inputRef}
            type="search"
            placeholder="Search for music"
          />
          {searchText && <button onClick={handleReset}>X</button>}
        </form>
      </div>

      <div className="music-list">
        {allMusicTracks?.map((music) => (
          <Link
            key={music.id}
            to={`/music/${slugify(music.name, { lower: true })}/${music.id}`}
            className="music-link"
          >
            <div className="music-item">
              <div
                className="music-thumbnail"
                style={{
                  backgroundImage: `url(${music.thumbnail})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              />
              <h2 className="music-title">{music.name}</h2>
              <ReactPlayer
                url={music.url}
                playing={false}
                controls={true}
                width="100%"
                height="50px"
                className="music-player"
              />
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}










