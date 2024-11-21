import { ElementRef, useEffect, useRef, useState } from "react"
import { supabase } from "../lib/supabaseClient"
import type { QueryData } from "@supabase/supabase-js"
import { Link } from "react-router-dom"
import slugify from "slugify"
import { useQueryClient } from "@tanstack/react-query"


export default function MeditationsPage(){

    const getAllMeditations = async() => {
        const result = await supabase
        .from("meditation")
        .select(`
            *,
            meditation_categories(
                name
            ),
            favorites(
                id
            )
            `)
        .like("name", `%${searchText}%`)
        // .or("meditation_categories.name",`%${searchText}%`)
        console.log({result});
        return result
    }

    type GetMeditationData = QueryData<ReturnType<typeof getAllMeditations>>

    const [meditation, setMeditation] = useState<GetMeditationData>([])
    const [searchText, setSearchText] = useState("")
    const inputRef = useRef<ElementRef<"input">>(null)

    useEffect(() =>{
        getAllMeditations().then((result) =>{
            setMeditation(result?.data ?? [])         
        })
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [searchText])

    const queryClient = useQueryClient()
    
    

    const handleFavoriteClick = async (meditationId: string) => {
        const isFavorited = meditation.some((m: GetMeditationData[0])=> m.favorites.some((f)=> f.id === meditationId))
        if(!isFavorited){
            await supabase.from("favorites").insert({meditation_id: meditationId })
        } else {
            await supabase.from("favorites").delete().eq("meditation_id", meditationId )
        }
        queryClient.invalidateQueries({queryKey: ["supabase", "articles"]})
    }

    const handleSearch: React.FormEventHandler<HTMLFormElement> = (e) =>{
        e.preventDefault()
        const value = inputRef.current?.value || ""
        setSearchText(value)
    }

    const handleReset = () =>{
        inputRef.current!.value = ""
        setSearchText("")
    }

    return(
        <div>
            <h1>Meditations</h1>
            <form 
            onSubmit={handleSearch}>
                <input 
                ref={inputRef}
                type="text" />
                {searchText && (
                    <button onClick={handleReset}>X</button>
                )}
                <button>Suche</button>
            </form>
            
            {meditation.map((e) =>(
                <div>
             <Link to={`/yoga/${slugify(e.name, {lower: true})}/${e.id}`}>   
                <div key={e.id}>
                    <h2>{e.name}</h2>
                    <p>{e.meditation_categories?.name}</p>
                    <p>{e.description}</p>
                    <p>{e.duration}</p>
                    
                </div>
            </Link>
                <button onClick={() => handleFavoriteClick(e.id)}>
                        {e.favorites.some((f) => f.id === e.id) ? "❤️" : "♡"}
                    </button>
                </div>
            ))}
            

        </div>
    )
}