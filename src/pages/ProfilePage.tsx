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

    useEffect(() =>{
        if(!user){
            navigate("/firstpage")
        }
    }, [user, navigate])

    const firstNameQuery = useQuery({
        queryKey: ["supabase", "profiles", user?.id],
        queryFn: async () => {
          if(!user?.id){
            return {first_name: ""}
          }
            const firstNameResult = await supabase
                .from("profiles")
                .select("first_name")
                .eq("id", user.id)
                .single()
            if(firstNameResult.error){
                throw firstNameResult.error
            }
            return firstNameResult.data
        },
      })

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
        `)
        .eq("user_id", user?.id)
        .ilike("yoga.name", `%${searchText}%`)
    
    // Hier Meditation Favs
    const meditationResult = await supabase
            .from("favorites")
            .select(`
                meditation_id,
                meditation!inner(*)
                `)
            .eq("user_id", user?.id)
            .ilike("meditation.name", `%${searchText}%`)

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
        <button
          style={{ color: "white", marginTop: "1em", fontWeight: "bold" }}
          onClick={handleLogout}
          className="back"
        >
          Logout
        </button>
      </div>
      <div>
        <div className="yoga-saerchbar">
          <form
            className="zen-search-btn"
            onSubmit={handleSearch}
            style={{ margin: "1em 0" }}
          >
            <input
              className="yoga-input"
              ref={inputRef}
              placeholder="Search in Favourites..."
              type="text"
            />
            {searchText && (
              <button className="input-btn" onClick={handleReset}>
                X
              </button>
            )}
          </form>
        </div>
      </div>
      <h2 style={{ fontSize: "medium" }}>Favourite Yoga Poses and Sessions</h2>
      <div
        style={{
          margin: "2em 0",
          display: "flex",
          flexWrap: "wrap",
          gap: "1em",
        }}
      >
        {yogaFavorites?.map((favorite) => (
          <Link
            key={favorite.yoga_id}
            to={`/yoga/${slugify(favorite.yoga.name, { lower: true })}/${
              favorite.yoga_id
            }`}
            style={{ textDecoration: "none" }}
          >
            <div
              className="yoga-cards"
              style={{
                backgroundImage: `url(${favorite.yoga.image_url})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                width: "145px",
                height: "145px",
                color: "white",
              }}
            >
              {/* <img src={favorite.yoga.image_url} alt="yoga_bgimage" /> */}
              <h2 style={{ textAlign: "left", marginBottom: "4em" }}>
                {favorite.yoga.name}
              </h2>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <p
                  style={{
                    textAlign: "left",
                    fontSize: "small",
                    marginBottom: "0.5em",
                  }}
                >
                  {favorite.yoga.difficulty}
                </p>
                <p style={{ textAlign: "left", fontSize: "small" }}>
                  {favorite.yoga.duration}
                </p>
              </div>
            </div>
          </Link>
        ))}
      </div>
      <h2 style={{ marginBottom: "2em", fontSize: "medium" }}>
        Favourite Meditations
      </h2>
      {meditationFavorites?.length > 0 ? ( 
        <div>
          {meditationFavorites?.map((favorite) => (
            <Link
              className="meditation-cards"
              key={favorite.meditation_id}
              to={`/meditation/${slugify(favorite.meditation.name, {
                lower: true,
              })}/${favorite.meditation_id}`}
              style={{ textDecoration: "none", backgroundImage: `url(${favorite.meditation.image_url})`, backgroundSize: "cover",
              backgroundPosition: "center",
              width: "145px",
              height: "195px", }}
            >
              <div style={{ marginBottom: "10em" }}>
                <h2>{favorite.meditation.name}</h2>
              </div>
            </Link>
          ))}
        </div>
      ) : ("")}
    </div>
  );
}
