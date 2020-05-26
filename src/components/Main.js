import React, {useState} from 'react';
import Grid from "./Grid"

const Main = () =>{
    const [generation, setGeneration] = useState(0)
    
    return (
        <div>
            <h1>Conway's Game of Life</h1>
            <Grid />
            <h2>Generations: {generation}</h2>
        </div>
    )
}

export default Main