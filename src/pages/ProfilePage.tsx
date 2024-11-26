import { useQuery } from "@tanstack/react-query";
import { supabase } from "../lib/supabaseClient";
import { Link } from "react-router-dom";
import { useUserContext } from "../context/userContext";

export default function ProfilePage() {
    const { user } = useUserContext();

    const firstNameQuery = useQuery({
        queryKey: ["supabase", "profiles", user!.id],
        queryFn: async () => {
            const firstNameResult = await supabase
                .from("profiles")
                .select("first_name")
                .eq("id", user!.id)
                .single()
            
            if(firstNameResult.error){
                throw firstNameResult.error
            }
            return firstNameResult.data
        },
      })

    const favoritesQuery = useQuery({
    queryKey: ["supabase", "favorites"],
    queryFn: async () => {
      if (!user?.id) {
        return null;
    } 
    // Hier Yoga Favs
    const yogaResult = await supabase
        .from("favorites")
        .select(`
            yoga_id,
            yoga!inner(*)
        `)
        .eq("user_id", user.id);
    
    // Hier Meditation Favs
    const meditationResult = await supabase
            .from("favorites")
            .select(`
                meditation_id,
                meditation!inner(*)
                `)
                .eq("user_id", user.id)

      if (yogaResult.error) {
        throw yogaResult.error;
      }
      if(meditationResult.error){
        throw meditationResult.error
      }
      return {
        yoga: yogaResult.data,
        meditation: meditationResult.data
      }
    },
  });

  if (favoritesQuery.isPending) {
    return "...loading Favorites";
  }
  if (favoritesQuery.isError || !favoritesQuery.data) {
    return "...can't fetch Favorites!";
  }
    


  if(firstNameQuery.isPending){
    return "... loading Name"
  }
  if(firstNameQuery.isError || !firstNameQuery.data){
    return "... can't fetch Name!"
  }

  const yogaFavorites = favoritesQuery.data.yoga
  const meditationFavorites = favoritesQuery.data.meditation

  return (
    <div>
      <div>
        <h1>Hey {firstNameQuery.data.first_name}!</h1>
        <p>Your favorites:</p>
      </div>
      <h2>Yoga</h2>
      <div>
        {yogaFavorites?.map((favorite) => (
          <Link key={favorite.yoga_id} to={`/yoga/${favorite.yoga_id}}`}>
            <div>
              <img src={favorite.yoga.image_url} alt="yoga_bgimage" />
              <h2>{favorite.yoga.name}</h2>
              <p>{favorite.yoga.difficulty}</p>
              <p>{favorite.yoga.duration}</p>
            </div>
          </Link>
        ))}
      </div>
      <h2>Meditations</h2>
      <div>
        {meditationFavorites?.map((favorite) =>(
            <Link key={favorite.meditation_id} to={`/meditation/${favorite.meditation_id}`}>
                <div>
                    <img src={favorite.meditation.image_url} alt="meditation_bgimage" />
                    <h2>{favorite.meditation.name}</h2>
                    {/* <p>{favorite.meditation.category_id.}</p> */}
                </div>
            </Link>
        ))}
      </div>
    </div>
  );
}