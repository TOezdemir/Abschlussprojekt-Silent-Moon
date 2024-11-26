// import { useQuery } from "@tanstack/react-query";
// import { supabase } from "../lib/supabaseClient";
// import "./YogaVideo.css";

// type YogaVideo = {
//   id: string;
//   name: string;
//   description: string | null;
//   url: string;
//   thumbnail: string;
// };

// const fetchYogaVideos = async (): Promise<YogaVideo[]> => {
//   const { data, error } = await supabase.from("yoga_videos").select("*");

//   if (error) {
//     throw new Error(error.message);
//   }

//   return data;
// };

// export default function YogaVideos() {
//   const {
//     data: yogaVideos,
//     isLoading,
//     isError,
//   } = useQuery({
//     queryKey: ["yogaVideos"],
//     queryFn: fetchYogaVideos,
//   });

//   if (isLoading) return <div>Loading...</div>;
//   if (isError) return <div>Error!</div>;

//   return (
//     <div>
//       <h1>Yoga Videos</h1>
      
//         {yogaVideos?.map((video) => (
//           <div key={video.id} className="video-card">
//             <div className="video-thumbnail-container">
//               <img
//                 src={video.thumbnail}
//                 alt={video.name}
//                 className="video-thumbnail"
//               />
//               <div className="video-title-overlay">{video.name}</div>
//               <a href={video.url} target="_blank" className="watch-button">
//                 Watch
//               </a>
//             </div>
//           </div>
//         ))}
//       </div>
    
//   );
// }
