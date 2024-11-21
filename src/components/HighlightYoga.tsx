// import { ElementRef, useRef, useState } from "react"
// import slugify from "slugify";
// import { Link } from "react-router-dom";
// import { useQuery } from "@tanstack/react-query";
// import { supabase } from "../lib/supabaseClient";


// export default function HighlightYoga(){
//     const [searchText, setSearchText] = useState("")
//     const inputRef = useRef<ElementRef<"input">>(null)
  
//     const highlightYogaQuery = useQuery({
//       queryKey: ["supabase", "yoga", searchText],
//       queryFn: async () =>{
//         const result = await supabase
//         .from("yoga")
//         .select("*")
//         .limit(1)
//         .ilike("name", `%${searchText}%`)
  
//           if(result.error){
//             throw result.error
//           }
//           return result.data
//       },
//     })
//     if(highlightYogaQuery.isPending){
//         return "...loading Yoga"
//       }
//       if(highlightYogaQuery.isError || !highlightYogaQuery.data){
//         return "...cant fetch Yoga data!"
//       }

//       const highlightYogaPoses = highlightYogaQuery.data

//       const handleSearch: React.FormEventHandler<HTMLFormElement> = (e) => {
//         e.preventDefault()
//         const value = inputRef.current?.value || ""
//         setSearchText(value)
//         console.log(searchText)
//       }
    
//       const handleReset = () => {
//       inputRef.current!.value = "";
//       setSearchText("");
//       };

//     return(
//         <div>
//         {highlightYogaPoses.map((yoga) =>(
//           <Link key={yoga.id} to={`/yoga/${slugify(yoga.name, { lower: true })}/${yoga.id}`}>
//             <div>
//               <img src="" alt="yoga_bgimage" />
//               <h2>{yoga.name}</h2>
//               <p>{yoga.difficulty}</p>
//               <p>{yoga.duration}</p>
//               </div>
//           </Link>
//         ))}
//       </div>
//     )
// }