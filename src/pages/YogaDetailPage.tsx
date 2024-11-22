import { useQuery, useQueryClient } from "@tanstack/react-query"
import { supabase } from "../lib/supabaseClient"
import { Link, useParams } from "react-router-dom"

interface YogaDetailProps {
    yoga: {
        category_id: string | null;
        created_at: string;
        description: string;
        difficulty: string;
        duration: number | null;
        id: string;
        image_url: string | null;
        name: string;
        video_url: string | null;
        favorites: {id: number}[]
        profiles: {
            id: string
            first_name: string
        }   | null
    }
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default function YogaDetailPage({yoga}: YogaDetailProps){
    const { id } = useParams()

    const queryClient = useQueryClient()

    const singleYogaQuery = useQuery({
        queryKey: ["supabase", "yoga", id],
        queryFn: async () =>{
            if(!id){
                return null
            }
        const result = await supabase
        .from("yoga")
        .select(`*,
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

    if(singleYogaQuery.isPending){
        return "...loading Yoga"
    }
    if(singleYogaQuery.isError || !singleYogaQuery.data){
        return "...can't fetch Yoga!"
    }

    const handleFavoriteClick = async () => {
        
        if(!id){
            console.error("No ID found!")
            return
        }
        if(yogaPose.favorites.length > 0){
            await supabase.from("favorites").delete().eq("yoga_id", id)
            // await supabase.from("favorites").insert({yoga_id: id})
        } else {
            // await supabase.from("favorites").delete().eq("yoga_id", id)
            await supabase.from("favorites").insert({yoga_id: id})
        }
        queryClient.invalidateQueries({queryKey: ["supabase", "yoga"]})
    }

    const yogaPose = singleYogaQuery.data

    return(
        <div>
            <div key={yogaPose.id}>
                <div>
                    <Link to={"/yoga"}>Zurück Pfeil</Link>
                    <button onClick={handleFavoriteClick}>
                        {yogaPose.favorites.length > 0 ? "❤️" : "♡"}</button>
                </div>
                <div>
                    Hier wird das Video abgespielt!
                </div>
                <div>
                    <h1>{yogaPose.name}</h1>
                    <p>{yogaPose.difficulty}</p>
                    <p>{yogaPose.description}</p>
                </div>
            </div>
        </div>
    )
}