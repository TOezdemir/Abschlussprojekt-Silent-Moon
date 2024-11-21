// import { ElementRef, useRef, useState } from "react"
// import slugify from "slugify";
// import { Link } from "react-router-dom";
// import { useQuery } from "@tanstack/react-query";
// import { supabase } from "../lib/supabaseClient";


// export default function AllYoga(){
//     const [searchText, setSearchText] = useState("")
//     const inputRef = useRef<ElementRef<"input">>(null)
  
//     const allYogaQuery = useQuery({
//       queryKey: ["supabase", "yoga", searchText],
//       queryFn: async () =>{
//         const result = await supabase
//         .from("yoga")
//         .select("*")
//         .ilike("name", `%${searchText}%`)
  
//           if(result.error){
//             throw result.error
//           }
//           return result.data
//       },
//     })
//     if(allYogaQuery.isPending){
//         return "...loading Yoga"
//     }
//     if(allYogaQuery.isError || !allYogaQuery.data){
//         return "...cant fetch Yoga data!"
//     }

//     const allYogaPoses = allYogaQuery.data

//     const handleSearch: React.FormEventHandler<HTMLFormElement> = (e) => {
//         e.preventDefault()
//         const value = inputRef.current?.value || ""
//         setSearchText(value)
//         console.log(searchText)
//     }
    
//     const handleReset = () => {
//     inputRef.current!.value = "";
//     setSearchText("");
//     };

//     return(
//         <div>
//         {allYogaPoses.map((yoga) =>(
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