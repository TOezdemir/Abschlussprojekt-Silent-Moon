import { useEffect, useState } from "react"
import { supabase } from "../lib/supabaseClient"
import type { QueryData } from "@supabase/supabase-js"

// const getAllYogaPoses = async() => {
//         const result = await supabase.from("yoga").select("*")
//         console.log({result});
//         return result
//     }

// type GetYogaData = QueryData<ReturnType<typeof getAllYogaPoses>>

const getAllYogaPoses = async () => {
    const { data, error } = await supabase.from("yoga").select("*");
  
    if (error) {
      console.error("Fehler beim Abrufen der Yoga-Posen:", error);
      return [];
    }
  
    return data ?? [];
  };

export default function YogaPosesPage(){
    // const [yoga, setYoga] = useState<GetYogaData>([])
    const [yoga, setYoga] = useState<any[]>([])

    // useEffect(() =>{
    //     getAllYogaPoses().then((result) =>{
    //         setYoga(result)
    //     })
    // },[])

    useEffect(() => {
        const fetchData = async () => {
          const yogaData = await getAllYogaPoses();
          console.log(yogaData)
          setYoga(yogaData);
        };
    
        fetchData();
      }, []);
    return(
        <div>
            Yoga Poses
            {yoga.map((pose)=>(
                <div key={pose.id}>
                    <h2>{pose.name}</h2>
                    <p>{pose.description}</p>
                    <p>{pose.difficulty}</p>
                </div>
            ))}
        </div>
    )
}