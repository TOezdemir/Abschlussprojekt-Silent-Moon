import { ElementRef, useEffect, useRef, useState } from "react";
import { supabase } from "../lib/supabaseClient";
import type { QueryData } from "@supabase/supabase-js";
import { Link } from "react-router-dom";
import slugify from "slugify";

export default function YogaVideo() {
  const getAllYogaVideo = async () => {
    const result = await supabase
      .from("yoga")
      .select("*")
      .like("name", `%${searchText}%`);
    console.log({ result });
    return result;
  };

  type GetYogaData = QueryData<ReturnType<typeof getAllYogaVideo>>;

  const [yoga, setYoga] = useState<GetYogaData>([]);
  const [searchText, setSearchText] = useState("");
  const inputRef = useRef<ElementRef<"input">>(null);

  useEffect(() => {
    getAllYogaVideo().then((result) => {
      setYoga(result?.data ?? []);
    });
  }, [searchText]);

  const handleSearch: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    const value = inputRef.current?.value || "";
    setSearchText(value);
    console.log(searchText);
  };

  const handleReset = () => {
    inputRef.current!.value = "";
    setSearchText("");
  };

  return (
    <div>
      <h1>Yoga Video</h1>
      <form onSubmit={handleSearch}>
        <input ref={inputRef} type="text" />
        {searchText && <button onClick={handleReset}>X</button>}
        <button>Suche</button>
      </form>
      {yoga.map((pose) => (
        <Link key={pose.id} to={`/yoga/${slugify(pose.name, { lower: true })}/${pose.id}`}>
          <div>
            <h2>{pose.name}</h2>
            <p>{pose.description}</p>
            <p>{pose.difficulty}</p>
          </div>
        </Link>
      ))}
    </div>
  );
}












// export default function YogaVideo() {
//     return (
//       <div>
//         <h1>Yoga Video</h1>
//         </div>)
// }