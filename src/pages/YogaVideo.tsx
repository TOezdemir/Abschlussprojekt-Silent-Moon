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
import ReactPlayer from "react-player";

type YogaVideo = {
  id: string;
  name: string;
  description: string | null;
  url: string;
};

export default function YogaVideos() {
  const [yogaVideos, setYogaVideos] = useState<YogaVideo[]>([]);
  const [selectedVideo, setSelectedVideo] = useState<YogaVideo | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Abrufen der Yoga-Videos
  const getYogaVideos = async () => {
    try {
      const { data, error } = await supabase.from("yoga_videos").select("*");
      if (error) throw new Error(error.message);
      setYogaVideos(data || []);
    } catch (err) {
      setError("Fehler beim Abrufen der Yoga-Videos.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getYogaVideos();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="layout">
      <div className="phone-frame">
        <div className="screen">
          <h1>Yoga Videos</h1>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "16px" }}>
            {yogaVideos.map((video) => (
              <div
                key={video.id}
                style={{
                  border: "1px solid #ccc",
                  borderRadius: "8px",
                  padding: "16px",
                  maxWidth: "200px",
                  cursor: "pointer",
                  textAlign: "center",
                }}
                onClick={() => setSelectedVideo(video)}
              >
                <h3>{video.name}</h3>
                <p style={{ fontSize: "14px", color: "#666" }}>
                  {video.description || "Keine Beschreibung"}
                </p>
              </div>
            ))}
          </div>

          {/* Modal für Popup-Video */}
          {selectedVideo && (
            <div
              style={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                backgroundColor: "#fff",
                padding: "16px",
                borderRadius: "12px",
                width: "90%",
                maxWidth: "400px",
                boxShadow: "0 4px 10px rgba(0, 0, 0, 0.3)",
              }}
            >
              <h2>{selectedVideo.name}</h2>
              <ReactPlayer
                url={selectedVideo.url}
                controls
                width="100%"
                height="200px"
              />
              <button
                style={{
                  marginTop: "16px",
                  padding: "8px 16px",
                  backgroundColor: "#f00",
                  color: "#fff",
                  border: "none",
                  borderRadius: "4px",
                  cursor: "pointer",
                }}
                onClick={() => setSelectedVideo(null)}
              >
                Schließen
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}