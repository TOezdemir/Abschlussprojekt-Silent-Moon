import { useQuery, useQueryClient } from "@tanstack/react-query";
import { supabase } from "../lib/supabaseClient";
import { useNavigate, useParams } from "react-router-dom";
import ReactPlayer from "react-player";
import { useState } from "react";

export default function MeditationDetailPage() {
  const { id } = useParams();
  const [isPlaying, setIsPlaying] = useState(false);
  const navigate = useNavigate()

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
      <div className="meditation-dp">
        <div
          className="yoga-dp"
          style={{
            backgroundImage: `url(${meditationTechnique.image_url})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            width: "100%",
            height: "200px",
            borderRadius: "10px",
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
            <div className="play-btn">
              <button onClick={handlePlayPause}>
                <ReactPlayer
                  url={meditationTechnique.audio_url}
                  playing={isPlaying}
                  width="30px"
                  height="30px"
                  style={{
                    display: "block",
                    borderRadius: "5px",
                    backgroundImage: "url(/src/assets/img/play-2.svg)",
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                  }}
                  config={{
                    file: {
                      attributes: {
                        controlsList: "nodownload",
                      },
                    },
                  }}
                />
              </button>
              <p>{meditationTechnique.name}</p>
              <p>{meditationTechnique.duration}</p>
            </div>
            <div className="back-fav">
              <button className="back" onClick={() => navigate(-1)}>
                <img
                  src="/src/assets/img/arrow-left-circle-3.svg"
                  alt=""
                  style={{ width: "30px", height: "30px" }}
                />
              </button>
              <button className="fav-btn" onClick={handleFavoriteClick}>
                {meditationTechnique.favorites.length > 0 ? "❤️" : "♡"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
