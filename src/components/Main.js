import React, {useState, useEffect, useRef} from 'react';
import Grid from "./Grid"

const Main = () =>{
    const height = Math.floor((getWindowDimensions().height / 30))
    const width = Math.floor((getWindowDimensions().width / 25))

    const [rows, setRows] = useState(height)
    const [cols, setCols] = useState(width)
    const [speed, setSpeed] = useState(1)
    const [generation, setGeneration] = useState(0)
    const [intervalId, setIntervalId] = useState()
    const [run, setRun] = useState(false)
    const [gridFull, setGridFull] = useState(Array(rows).fill().map(() => Array(cols).fill(false)))

    useEffect(()=>{
        let gridCopy = arrayClone(gridFull);

        for (let i = 0; i < rows; i++) {
            for (let j = 0; j < cols; j++) {
                let count = 0

                // count cells around each cell
                if (i > 0) if (gridFull[i - 1][j]) count++;
                if (i > 0 && j > 0) if (gridFull[i - 1][j - 1]) count++;
                if (i > 0 && j < cols - 1) if (gridFull[i - 1][j + 1]) count++;
                if (j < cols - 1) if (gridFull[i][j + 1]) count++;
                if (j > 0) if (gridFull[i][j - 1]) count++;
                if (i < rows - 1) if (gridFull[i + 1][j]) count++;
                if (i < rows - 1 && j > 0) if (gridFull[i + 1][j - 1]) count++;
                if (i < rows - 1 && j < cols - 1) if (gridFull[i + 1][j + 1]) count++;

                // rules
                if (count < 2 || count > 3){
                    gridCopy[i][j] = false
                }
                if (count === 3){
                    gridCopy[i][j] = true
                }
            }
        }
        setGridFull(gridCopy)

    }, [generation])

    const selectBox = (row, col) => {
        if (!run){
            let gridCopy = arrayClone(gridFull)
            gridCopy[row][col] = !gridCopy[row][col]
            setGridFull(gridCopy)
        }
    }
    
    const startButton = () => {
        if (run){
            clearInterval(intervalId)
            setRun(false)
        } else {
            setRun(true)
            setIntervalId(setInterval(start, speed))
        }
    }

    const stopButton = () => {
        clearInterval(intervalId)
        setRun(false)
    }

    const nextButton = () => {
        setGeneration(generation => generation + 1)
    }

    const start = () => {
        setGeneration(generation => generation + 1)
    }

    const seed = (number=30) => {
        let gridCopy = arrayClone(gridFull)

        for(let i = 0; i < rows; i++){
            for (let j = 0; j < cols; j++){
                gridCopy[i][j] = false
                if (Math.floor(Math.random() * 1/number*100) === 0){
                    gridCopy[i][j] = true
                }

            }
        }
        setGridFull(gridCopy)
    }

    const reset = () => {
        setGridFull(Array(rows).fill().map(() => Array(cols).fill(false)))
        setGeneration(0)
        clearInterval(intervalId)
    }

    return (
        <div className="main">
            <h1>Conway's Game of Life</h1>
            <div className="buttons_container">
                <button 
                    onClick={() => startButton()} 
                    style={
                        run ?
                            {color: "red", border: "red 1px solid"}:
                        {color: "green", border: "green 1px solid"}
                    }
                >
                    {run ? "Stop" : "Start"}
                </button>
                {/* <button onClick={() => stopButton()}>Stop</button> */}
                <button onClick={() => nextButton()}>Next Generation</button>
                <button onClick={()=> seed()}>Randomize</button>
                <button onClick={() => reset()}>Reset</button>
            </div>
            <Grid gridFull={gridFull} rows={rows} cols={cols} selectBox={selectBox}/>
            <h2>Generations: {generation}</h2>
        </div>
    )
}

export default Main

function arrayClone(arr){
    return JSON.parse(JSON.stringify(arr))
}

function getWindowDimensions() {
    const { innerWidth: width, innerHeight: height } = window;
    return {
      width,
      height
    };
}