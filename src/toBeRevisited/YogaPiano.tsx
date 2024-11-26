// import { useEffect, useState } from "react";
// import { supabase } from "../lib/supabaseClient";
// import { Link } from "react-router-dom";
// import slugify from "slugify";
// import ReactPlayer from "react-player";

// type YogaCategoryPiano = {
//   id: number;
//   name: string;
//   description: string;
//   url: string | null;
// };

// export default function YogaCategoryPiano() {
//   const [yogaCategoryPiano, setYogaCategoryPiano] = useState<YogaCategoryPiano[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");

//   const getYogaCategoryPiano = async () => {
//     try {
//       const { data, error } = await supabase
//         .from("yoga_category_piano")
//         .select("*");

//       if (error) {
//         throw new Error(error.message);
//       }

//       setYogaCategoryPiano(data);
//     } catch (err) {
//       setError("Fehler");
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     getYogaCategoryPiano();
//   }, []);

//   return (
//     <div>
//       <h1>Yoga Piano Tracks</h1>

//       <div>
//         {yogaCategoryPiano.map((category) => (
//           <div key={category.id}>
//             <Link to={`/yoga/${slugify(category.name, { lower: true })}/${category.id}`}>
//               <h2>{category.name}</h2>
//               <p>{category.description}</p>
//               {category.url && (
//                 <div>
//                   <h3>MP3-Datei:</h3>
//                   <ReactPlayer 
//                     url={category.url} 
//                     controls={true} 
//                     width="100%" 
//                     height="30px" 
//                     playing={false} 
//                   />
//                 </div>
//               )}
//             </Link>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }