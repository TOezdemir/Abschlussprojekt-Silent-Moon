import { useQuery } from "@tanstack/react-query";
import { ElementRef, useRef, useState } from "react";
import { supabase } from "../lib/supabaseClient";
import slugify from "slugify";
import { Link } from "react-router-dom";

export default function YogaPage() {
  const [searchText, setSearchText] = useState("")
  const inputRef = useRef<ElementRef<"input">>(null)

  const allYogaQuery = useQuery({
    queryKey: ["supabase", "yoga", searchText],
    queryFn: async () =>{
      const result = await supabase
      .from("yoga")
      .select("*")
      .ilike("name", `%${searchText}%`)

        if(result.error){
          throw result.error
        }
        return result.data
    },
  })

  if(allYogaQuery.isPending){
    return "...loading Yoga"
  }
  if(allYogaQuery.isError || !allYogaQuery.data){
    return "...can't fetch Yoga data!"
  }

  const handleSearch: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault()
    const value = inputRef.current?.value || ""
    setSearchText(value)
    console.log(searchText)
  }

  const handleReset = () => {
    inputRef.current!.value = "";
    setSearchText("");
  };

  const allYogaPoses = allYogaQuery.data

  return (
    <div>
      <div>
        <h1>Yoga</h1>
        <p>Find your inner zen from anywhere.</p> 
      </div>
      <div>
        <div>Hier stehen später die Rubrikenbuttons</div>
      </div>
      <div>
        <form onSubmit={handleSearch}>
          <input ref={inputRef} type="text" />
          {searchText && <button onClick={handleReset}>X</button>}
          <button>Lupe Icon</button>
        </form>
      </div>
      <div>
        <p>Lerne Yoga kennen / Hier ist eigentlich ein großer Element, der in der Figma ein zufälliges Yoga Video abspielt. Hier könnte stattdessen ein klickbarer Banner stehen, der zu einer Seite leitet, welche Yoga und seine Wirkung beschreibt?</p>
      </div>
      <div>
      {allYogaPoses.map((allYoga) =>(
          <Link key={allYoga.id} to={`/yoga/${slugify(allYoga.name, { lower: true })}/${allYoga.id}`}>
            <div>
              <img src={allYoga.image_url!} alt="yoga_bgimage" />
              <h2>{allYoga.name}</h2>
              <p>{allYoga.difficulty}</p>
              <p>{allYoga.duration}</p>
              </div>
          </Link>
        ))}
      </div>
    </div>
  );
}


// export default function YogaPage() {
//   return (
//     <div>
//       <h1>Yoga Page</h1>
      
//       <div>
//       <button>
//           <Link to="/yogavideo">Yoga Video</Link>
//         </button>
//         <button>
//           <Link to="/yogabinaural">Yoga Binaural</Link>
//         </button>
//         <button>
//           <Link to="/yogamantra">Yoga Mantra</Link>
//         </button>
//         <button>
//           <Link to="/yogapiano">Yoga Piano</Link>
//         </button>
      
//       </div>
//     </div>
//   );
// }