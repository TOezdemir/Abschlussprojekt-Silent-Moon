import { useQuery, useQueryClient } from "@tanstack/react-query"
import { supabase } from "../lib/supabaseClient"
import { Link, useParams } from "react-router-dom"
import ReactPlayer from "react-player"
import { useState } from "react"

// interface MeditaionDetailProps {
//     meditation: {
//         audio_url: string | null;
//         category_id: string | null;
//         created_at: string;
//         description: string;
//         duration: number | null;
//         id: string;
//         image_url: string | null;
//         name: string;
//         video_url: string | null;
//         meditation_categories: {
//             id: string
//             name: string
//             description: string
//         } | null;
//     }
// }


export default function MeditationDetailPage(){
    const { id } = useParams()
    const [isPlaying, setIsPlaying] = useState(false)

    const queryClient = useQueryClient()

    const singleMeditationQuery = useQuery({
        queryKey: ["supabase", "meditation", id],
        queryFn: async () =>{
            if(!id){
                return null
            }
        const result = await supabase
        .from("meditation")
        .select(`
            *,
            meditation_categories(
            name),
            favorites(
            id
            )
            `)
        .eq("id", id)
        .single()
          if(result.error){
              throw result.error
          }
          return result.data
        },
      })

    if(singleMeditationQuery.isPending){
        return "...loading Meditation"
    }
    if(singleMeditationQuery.isError || !singleMeditationQuery.data){
        return "...can't fetch Meditation!"
    }

    const handleFavoriteClick = async () => {
        if(!id){
            console.error("No ID found!")
            return
        }
        if(meditationTechnique.favorites.length > 0){
            await supabase.from("favorites").delete().eq("meditation_id", id)
        } else {
            await supabase.from("favorites").insert({meditation_id: id})
        }
        queryClient.invalidateQueries({queryKey: ["supabase", "meditation"]})
    }

    const handlePlayPause = () => {
        setIsPlaying(!isPlaying)
    }

    const meditationTechnique = singleMeditationQuery.data

    return(
        <div>
            <div>
                <div>
                    <Link to={"/meditation"}>Zurück Pfeil</Link>
                    <button onClick={handleFavoriteClick}>
                        {meditationTechnique.favorites.length > 0 ? "❤️" : "♡"}</button>
                </div>
                <div>
                    <img src={meditationTechnique.image_url!} alt="meditation_cover" /> 
                </div>
                <div>
                    <h1>{meditationTechnique.name}</h1>
                    <p>{meditationTechnique.meditation_categories?.name}</p>
                    <p>{meditationTechnique.description}</p>
                    <div>
                       <button onClick={handlePlayPause}>
                        <ReactPlayer 
                            url={meditationTechnique.audio_url}
                            playing={isPlaying}
                            width="100px"
                            height="100px"
                            style={{ display: 'block' }}
                            config={{ file: { 
                                attributes: {
                                    controlsList: 'nodownload'
                                }
                            }}}
                        />
                    </button>
                    <p>{meditationTechnique.name}</p>  
                    <p>{meditationTechnique.duration}</p>
                    </div>
                   
                    
                </div>
            </div>
        </div>
    )
}