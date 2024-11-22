// import { ElementRef, useEffect, useRef, useState } from "react";
// import { supabase } from "../lib/supabaseClient";
// import type { QueryData } from "@supabase/supabase-js";
// import { Link } from "react-router-dom";
// import slugify from "slugify";

// export default function YogaVideo() {
//   const getAllYogaVideo = async () => {
//     const result = await supabase
//       .from("yoga")
//       .select("*")
//       .like("name", `%${searchText}%`);
//     console.log({ result });
//     return result;
//   };

//   type GetYogaData = QueryData<ReturnType<typeof getAllYogaVideo>>;

//   const [yoga, setYoga] = useState<GetYogaData>([]);
//   const [searchText, setSearchText] = useState("");
//   const inputRef = useRef<ElementRef<"input">>(null);

//   useEffect(() => {
//     getAllYogaVideo().then((result) => {
//       setYoga(result?.data ?? []);
//     });
//   }, [searchText]);

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

//   return (
//     <div>
//       <h1>Yoga Video</h1>
//       <form onSubmit={handleSearch}>
//         <input ref={inputRef} type="text" />
//         {searchText && <button onClick={handleReset}>X</button>}
//         <button>Suche</button>
//       </form>
//       {yoga.map((pose) => (
//         <Link key={pose.id} to={`/yoga/${slugify(pose.name, { lower: true })}/${pose.id}`}>
//           <div>
//             <h2>{pose.name}</h2>
//             <p>{pose.description}</p>
//             <p>{pose.difficulty}</p>
//           </div>
//         </Link>
//       ))}
//     </div>
//   );
// }














import { useEffect, useState } from "react";
import { supabase } from "../lib/supabaseClient";
import { Link } from "react-router-dom";
import slugify from "slugify";
import ReactPlayer from "react-player";

type YogaVideo = {
  id: string; 
  name: string; 
  description: string | null;
  url: string; 
};

export default function YogaVideos() {
  const [yogaVideos, setYogaVideos] = useState<YogaVideo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  
  const getYogaVideos = async () => {
    try {
      const { data, error } = await supabase
        .from("yoga_videos") 
        .select("*"); 

      if (error) {
        throw new Error(error.message);
      }

      setYogaVideos(data || []); 
    } catch (err) {
      setError("Fehler");
    } finally {
      setLoading(false);
    }
  };

 
  useEffect(() => {
    getYogaVideos();
  }, []);


  if (loading) {
    return <div>Loading...</div>;
  }


  if (error) {
    return <div>{error}</div>;
  }


  return (
    <div>
      <h1>Yoga Videos</h1>
      {yogaVideos.map((video) => (
        <div key={video.id}>
          <Link to={`/yoga-video/${slugify(video.name, { lower: true })}/${video.id}`}>
            <h2>{video.name}</h2>
            <p>{video.description}</p>
            {video.url && (
              <div>
                <ReactPlayer url={video.url} controls width="100%" height="auto" />
              </div>
            )}
          </Link>
        </div>
      ))}
    </div>
  );
}







