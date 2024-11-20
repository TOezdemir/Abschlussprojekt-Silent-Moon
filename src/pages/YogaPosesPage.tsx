import type { QueryData } from "@supabase/supabase-js"
import { supabase } from "../lib/supabaseClient"





export default function YogaPosesPage(){
   
    type GetYogaData = QueryData<ReturnType<typeof getAllYogaPoses>>
    const getAllYogaPoses = async() => {
        const result = await supabase
        .from("yoga")
        .select("*")
        console.log({result});
        return result
    }
    
    getAllYogaPoses()
    return(
        <div>Yoga Poses</div>
    )
}