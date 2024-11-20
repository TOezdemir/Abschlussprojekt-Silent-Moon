import { useEffect, useState } from "react"
import { supabase } from "../lib/supabaseClient"
import type { QueryData } from "@supabase/supabase-js"

const getAllYogaPoses = async() => {
        const result = await supabase.from("yoga").select("*")
        console.log({result});
        return result
    }

type GetYogaData = QueryData<ReturnType<typeof getAllYogaPoses>>

export default function YogaPosesPage(){
    const [yoga, setYoga] = useState<GetYogaData>([])

    useEffect(() =>{
        getAllYogaPoses().then((result) =>{
            setYoga(result)
        })
    },[])

    getAllYogaPoses()
    return(
        <div>
            Yoga Poses
            {yoga.data?.map((pose)=>{
                <div key={pose.id}>
                    {pose.name}
                </div>
            })}
        </div>
    )
}