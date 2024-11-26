import { useQuery, useQueryClient } from "@tanstack/react-query";
import { supabase } from "../lib/supabaseClient";
import { Link, useParams } from "react-router-dom";
import ReactPlayer from "react-player";
import { useState } from "react";

export default function MeditationDetailPage() {
  const { id } = useParams();
  const [isPlaying, setIsPlaying] = useState(false);

  const queryClient = useQueryClient();

  const singleMeditationQuery = useQuery({
    queryKey: ["supabase", "meditation", id],
    queryFn: async () => {
      if (!id) {
        return null;
      }
      const result = await supabase
        .from("meditation")
        .select(
          `
            *,
            meditation_categories(
            name),
            favorites(
            id
            )
            `
        )
        .eq("id", id)
        .single();
      if (result.error) {
        throw result.error;
      }
      return result.data;
    },
  });

  if (singleMeditationQuery.isPending) {
    return "...loading Meditation";
  }
  if (singleMeditationQuery.isError || !singleMeditationQuery.data) {
    return "...can't fetch Meditation!";
  }

  const handleFavoriteClick = async () => {
    if (!id) {
      console.error("No ID found!");
      return;
    }
    if (meditationTechnique.favorites.length > 0) {
      await supabase.from("favorites").delete().eq("meditation_id", id);
    } else {
      await supabase.from("favorites").insert({ meditation_id: id });
    }
    queryClient.invalidateQueries({ queryKey: ["supabase", "meditation"] });
  };

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const meditationTechnique = singleMeditationQuery.data;

  return (
    <div>
      <div>
        <div
          className="yoga-dp"
          style={{
            backgroundImage: `url(${meditationTechnique.image_url})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            width: "100%",
            height: "200px",
          }}
        >
          {/* <img src={meditationTechnique.image_url!} alt="meditation_cover" /> */}
        </div>
        <div className="yoga-dp-info">
          <h1>{meditationTechnique.name}</h1>
          <p className="difficulty">
            {meditationTechnique.meditation_categories?.name}
          </p>
          <p className="description">{meditationTechnique.description}</p>
          <div>
            <button onClick={handlePlayPause}>
              <ReactPlayer
                url={meditationTechnique.audio_url}
                playing={isPlaying}
                width="100px"
                height="100px"
                style={{ display: "block" }}
                config={{
                  file: {
                    attributes: {
                      controlsList: "nodownload",
                    },
                  },
                }}
              />
            </button>
            <div className="back-fav">
              <Link className="back" to={"/meditation"}>
                <img
                  src="/src/assets/img/arrow-left-circle-3.svg"
                  alt=""
                  style={{ width: "30px", height: "30px" }}
                />
              </Link>
              <button className="fav-btn" onClick={handleFavoriteClick}>
                {meditationTechnique.favorites.length > 0 ? "❤️" : "♡"}
              </button>
            </div>
            <p>{meditationTechnique.name}</p>
            <p>{meditationTechnique.duration}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
