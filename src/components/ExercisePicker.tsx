import { useEffect, useState } from "react";
import { listExercises } from "../api/exercises";
import type { Exercise } from "../types/training";

export default function ExercisePicker({value, onChange}:{
    value?: string; //currently selected exercise id
    onChange: (exerciseID: string) => void; //when user selects a different exercise
}){
    const[exs, setExs] = useState<Exercise[]>([]);//local state, holds list of exercise from API

    useEffect(()=>{//fetches exercies when rendered
        listExercises()
            .then(setExs)//passes resuklt and updates react state
            .catch(console.error);
    },[])//empty array loads exercise once

    return(
        // value of selected option
        <select value={value} onChange={(e)=> onChange(e.target.value)}
        style={{padding: 6}}
        >

        <option value ="" disabled>
            Select exercise…
        </option>

        {/* Render <option> for each exercise in list */}
        {exs.map((ex) => (
            <option key={ex.id} value={ex.id}>
            {ex.name}
            </option>
        ))}

        </select>
    );

}