import { useQuery, useQueryClient } from "@tanstack/react-query";
import { supabase } from "../lib/supabaseClient";
import { Link, useParams } from "react-router-dom";

// interface MeditaionDetailProps {
//     meditation: {
//         audio_url: string | null;
//         category_id: string | null;
//         created_at: string;
//         description: string;
//         duration: number | null;
//         id: string;
//         image_url: string | null;
//         name: string;
//         video_url: string | null;
//         meditation_categories: {
//             id: string
//             name: string
//             description: string
//         } | null;
//     }
// }

export default function MeditationDetailPage() {
  const { id } = useParams();

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

  const meditationTechnique = singleMeditationQuery.data;

  return (
    <div>
      <div>
        <div></div>
        <div>
          <img src={meditationTechnique.image_url!} alt="meditation_cover" />
        </div>
        <div className="yoga-dp-info">
          <h1>{meditationTechnique.name}</h1>
          <p className="difficulty">
            {meditationTechnique.meditation_categories?.name}
          </p>
          <p className="description">{meditationTechnique.description}</p>
          <p>Hier ein Player mit hinterlegter Audiodatei</p>
        </div>
        <div className="back-fav-meditation">
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
      </div>
    </div>
  );
}
