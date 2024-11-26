import { useQuery } from "@tanstack/react-query";
import { ElementRef, useRef, useState } from "react";
import { supabase } from "../lib/supabaseClient";
import slugify from "slugify";
import { Link } from "react-router-dom";

export default function YogaPage() {
  const [searchText, setSearchText] = useState("");
  const [difficulty, setDifficulty] = useState<string | null>(null);
  const inputRef = useRef<ElementRef<"input">>(null);

  const allYogaQuery = useQuery({
    queryKey: ["supabase", "yoga", searchText, difficulty],
    queryFn: async () => {
      let query = supabase.from("yoga").select("*").ilike("name", `%${searchText}%`);
      
      if (difficulty) {
        query = query.eq("difficulty", difficulty);
      }

      const result = await query;
      if (result.error) {
        throw result.error;
      }
      return result.data;
    },
  });

  if (allYogaQuery.isPending) {
    return "...loading Yoga";
  }
  if (allYogaQuery.isError || !allYogaQuery.data) {
    return "...can't fetch Yoga data!";
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

  const handleFilter = (level: string | null) => {
    setDifficulty(level);
  };

  const allYogaPoses = allYogaQuery.data;

  return (
    <div>
      <div className="yoga">
        <h1>Yoga</h1>
        <button onClick={() => handleFilter("beginner")}>Beginner</button>
        <button onClick={() => handleFilter("intermediate")}>Intermediate</button>
        <button onClick={() => handleFilter("expert")}>Expert</button>
        <button onClick={() => handleFilter(null)}>Show All</button>
        <p>Find your inner zen from anywhere.</p>
      </div>
      <div className="yoga-saerchbar">
        <form onSubmit={handleSearch}>
          <input
            className="yoga-input"
            ref={inputRef}
            type="search"
            placeholder="search for yoga videos"
          />
          {searchText && <button onClick={handleReset}>X</button>}
        </form>
      </div>
      <div className="random-player">
        <p>Daily Random Affirmations, watch the videos now!</p>
      </div>
      <div>
        <div className="yoga-videos">
          {allYogaPoses.map((allYoga) => (
            <Link
              key={allYoga.id}
              to={`/yoga/${slugify(allYoga.name, { lower: true })}/${allYoga.id}`}
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
                <h2>{allYoga.name}</h2>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}































// import { useQuery } from "@tanstack/react-query";
// import { ElementRef, useRef, useState } from "react";
// import { supabase } from "../lib/supabaseClient";
// import slugify from "slugify";
// import { Link } from "react-router-dom";
// import Categories from "../components/Categories";

// export default function YogaPage() {
//   const [searchText, setSearchText] = useState("");
//   const inputRef = useRef<ElementRef<"input">>(null);

//   const allYogaQuery = useQuery({
//     queryKey: ["supabase", "yoga", searchText],
//     queryFn: async () => {
//       const result = await supabase
//         .from("yoga")
//         .select("*")
//         .ilike("name", `%${searchText}%`);

//       if (result.error) {
//         throw result.error;
//       }
//       return result.data;
//     },
//   });

//   if (allYogaQuery.isPending) {
//     return "...loading Yoga";
//   }
//   if (allYogaQuery.isError || !allYogaQuery.data) {
//     return "...can't fetch Yoga data!";
//   }

//   const handleSearch: React.FormEventHandler<HTMLFormElement> = (e) => {
//     e.preventDefault();
//     const value = inputRef.current?.value || "";
//     setSearchText(value);
//     console.log(searchText);
//   };

//   const handleReset = () => {
//     inputRef.current!.value = "";
//     setSearchText("");
//   };

//   const allYogaPoses = allYogaQuery.data;

//   return (
//     <div>
//       <div className="yoga">
//         <h1>Yoga</h1>
//         {/* <Categories /> */}
//         <button>Beginner</button>
//         <button>Intermediate</button>
//         <button>Expert</button>
        
//         <p>Find your inner zen from anywhere.</p>
//       </div>
//       <div className="yoga-saerchbar">
//         <form onSubmit={handleSearch}>
//           <input
//             className="yoga-input"
//             ref={inputRef}
//             type="search"
//             placeholder="search for yoga videos"
//           />
//           {searchText && <button onClick={handleReset}>X</button>}
//         </form>
//       </div>
//       <div className="random-player">
//         <p>Lerne Yoga kennen / Daily Random Affirmations</p>
//       </div>
//       <div>
//         <div className="yoga-videos">
//           {allYogaPoses.map((allYoga) => (
//             <Link
//               key={allYoga.id}
//               to={`/yoga/${slugify(allYoga.name, { lower: true })}/${
//                 allYoga.id
//               }`}
//             >
//               <div
//                 className="yoga-cards"
//                 style={{
//                   backgroundImage: `url(${allYoga.image_url})`,
//                   backgroundSize: "cover",
//                   backgroundPosition: "center",
//                   width: "145px",
//                   height: "145px",
//                 }}
//               >
//                 <h2>{allYoga.name}</h2>
//               </div>
//             </Link>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// }
