// import { ElementRef, useRef, useState } from "react"
// import slugify from "slugify";
// import { Link } from "react-router-dom";
// import { useQuery } from "@tanstack/react-query";
// import { supabase } from "../lib/supabaseClient";

// export default function HighlightMeditation(){
//     const [searchText, setSearchText] = useState("")
//     const inputRef = useRef<ElementRef<"input">>(null)
  
//     const highlightMeditationQuery = useQuery({
//       queryKey: ["supabase", "meditation", searchText],
//       queryFn: async () =>{
//         const result = await supabase
//         .from("meditation")
//         .select(`
//           *,
//           meditation_categories(
//           name)`)
//         .limit(1)
//         .ilike("name", `%${searchText}%`)
  
//           if(result.error){
//             throw result.error
//           }
//           return result.data
//       },
//     })

//     if(highlightMeditationQuery.isPending){
//         return "...loading Meditation"
//     }
//     if(highlightMeditationQuery.isError || !highlightMeditationQuery.data){
//         return "...cant fetch Meditation!"
//     }
    
//     const handleSearch: React.FormEventHandler<HTMLFormElement> = (e) => {
//     e.preventDefault()
//     const value = inputRef.current?.value || ""
//     setSearchText(value)
//     console.log(searchText)
//     }
    
//     const handleReset = () => {
//     inputRef.current!.value = "";
//     setSearchText("");
//     };

//     const highlightMeditations = highlightMeditationQuery.data

//     return(
//         <div>
//         {highlightMeditations.map((meditation) =>(
//           <Link key={meditation.id} to={`/meditation/${slugify(meditation.name, { lower: true })}/${meditation.id}`}>
//             <div>
//               <img src="" alt="meditation_bgimage" />
//               <h2>{meditation.name}</h2>
//               <p>{meditation.meditation_categories?.name}</p>
//               <p>{meditation.duration}</p>
//             </div>
//           </Link>
//         ))}
//       </div>
//     )
// }