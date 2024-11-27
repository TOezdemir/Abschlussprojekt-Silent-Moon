import { useQuery } from "@tanstack/react-query";
import { supabase } from "../lib/supabaseClient";
import { Link, useNavigate } from "react-router-dom";
import { useUserContext } from "../context/userContext";
import slugify from "slugify";
import { ElementRef, useEffect, useRef, useState } from "react";

export default function ProfilePage() {
  const { user, setUser } = useUserContext();
  const [searchText, setSearchText] = useState("");
  const inputRef = useRef<ElementRef<"input">>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user, navigate]);

  const firstNameQuery = useQuery({
    queryKey: ["supabase", "profiles", user!.id],
    queryFn: async () => {
      const firstNameResult = await supabase
        .from("profiles")
        .select("first_name")
        .eq("id", user!.id)
        .single();
      if (firstNameResult.error) {
        throw firstNameResult.error;
      }
      return firstNameResult.data;
    },
  });

  const favoritesQuery = useQuery({
    queryKey: ["supabase", "favorites", searchText],
    queryFn: async () => {
      if (!user?.id) {
        return null;
      }
      // Hier Yoga Favs
      const yogaResult = await supabase
        .from("favorites")
        .select(
          `
            yoga_id,
            yoga!inner(*)
        `
        )
        .eq("user_id", user.id)
        .ilike("yoga.name", `%${searchText}%`);

      // Hier Meditation Favs
      const meditationResult = await supabase
        .from("favorites")
        .select(
          `
                meditation_id,
                meditation!inner(*)
                `
        )
        .eq("user_id", user.id)
        .ilike("meditation.name", `%${searchText}%`);

      if (yogaResult.error) {
        throw yogaResult.error;
      }
      if (meditationResult.error) {
        throw meditationResult.error;
      }
      return {
        yoga: yogaResult.data,
        meditation: meditationResult.data,
      };
    },
  });

  if (favoritesQuery.isPending) {
    return "...loading Favorites";
  }
  if (favoritesQuery.isError || !favoritesQuery.data) {
    return "...can't fetch Favorites!";
  }

  if (firstNameQuery.isPending) {
    return "... loading Name";
  }
  if (firstNameQuery.isError || !firstNameQuery.data) {
    return "... can't fetch Name!";
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

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.error("Can't log out:", error);
    } else {
      setUser(null);
    }
  };

  const yogaFavorites = favoritesQuery.data.yoga;
  const meditationFavorites = favoritesQuery.data.meditation;

  return (
    <div>
      <div className="profile">
        <h1>{firstNameQuery.data.first_name}</h1>
        <button onClick={handleLogout} className="back">
          Logout
        </button>
      </div>
      <div>
        <div>
          <form onSubmit={handleSearch}>
            <input
              className="yoga-input"
              ref={inputRef}
              placeholder="Search in Favourites..."
              type="text"
            />
            {searchText && <button onClick={handleReset}>X</button>}
          </form>
        </div>
      </div>
      <h2>Favourite Yoga Poses and Sessions</h2>
      <div>
        {yogaFavorites?.map((favorite) => (
          <Link
            key={favorite.yoga_id}
            to={`/yoga/${slugify(favorite.yoga.name, { lower: true })}/${
              favorite.yoga_id
            }`}
          >
            <div>
              <img src={favorite.yoga.image_url} alt="yoga_bgimage" />
              <h2>{favorite.yoga.name}</h2>
              <p>{favorite.yoga.difficulty}</p>
              <p>{favorite.yoga.duration}</p>
            </div>
          </Link>
        ))}
      </div>
      <h2>Favourite Meditations</h2>
      <div>
        {meditationFavorites?.map((favorite) => (
          <Link
            key={favorite.meditation_id}
            to={`/meditation/${slugify(favorite.meditation.name, {
              lower: true,
            })}/${favorite.meditation_id}`}
          >
            <div>
              <img
                src={favorite.meditation.image_url}
                alt="meditation_bgimage"
              />
              <h2>{favorite.meditation.name}</h2>
              {/* <p>{favorite.meditation.description}</p> */}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
