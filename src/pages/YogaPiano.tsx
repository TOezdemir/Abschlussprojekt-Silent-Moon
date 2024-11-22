import { useQuery } from "@tanstack/react-query";
import { supabase } from "../lib/supabaseClient";
import { Link } from "react-router-dom";
import slugify from "slugify";
import ReactPlayer from "react-player";
import './YogaPiano.css';

type YogaPiano = {
  id: string;
  name: string;
  url: string | null;
  thumbnail: string | null;
};

const fetchYogaPiano = async (): Promise<YogaPiano[]> => {
  const { data, error } = await supabase
    .from("yoga_category_piano")
    .select("*");

  if (error) {
    throw new Error(error.message);
  }

  return data
};

export default function YogaPiano() {
  const { data: yogaPiano, isLoading, isError, error } = useQuery<YogaPiano[]>({
    queryKey: ["yogaPiano"],
    queryFn: fetchYogaPiano,
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error: {error instanceof Error ? error.message : 'Unknown error'}</div>;
  }

  return (
    <div>
      <h1>Yoga Piano Tracks</h1>
      <div className="music-list">
        {yogaPiano?.map((category) => (
          <div key={category.id} className="music-item">
            <Link
              to={`/yoga/${slugify(category.name, { lower: true })}/${category.id}`}
              className="music-link"
            >
              <h2 className="music-title">{category.name}</h2>
              {category.thumbnail && (
                <img
                  src={category.thumbnail}
                  alt={category.name}
                  className="music-thumbnail"
                />
              )}
              {category.url && (
                <div className="music-player">
                  <ReactPlayer
                    url={category.url}
                    controls={true}
                    width="100%"
                    height="60px"
                  />
                </div>
              )}
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}