import React, {useState, useRef} from 'react';
import {DoublyLinkedList} from '../data_structures/doubly_linked_list'
import Grid from "./Grid"

const Main = () =>{
    const height = Math.floor((getWindowDimensions().height / 30))
    const width = Math.floor((getWindowDimensions().width / 25))
    
    const initialDll = new DoublyLinkedList()
    for(let i = 0; i < height*width; i++){
        initialDll.push(false)
    }
    
    const [rows, setRows] = useState(height)
    const [cols, setCols] = useState(width)
    const [speed, setSpeed] = useState(1)
    const [generation, setGeneration] = useState(0)
    const [population, setPopulation] = useState(0)
    const [run, setRun] = useState(false)
    const [dll, setDll] = useState(initialDll)

    const runRef = useRef(run)
    runRef.current = run
    const generationRef = useRef(generation)
    generationRef.current = generation
    const dllRef = useRef(dll)
    dllRef.current = dll

    const selectBox = (index) => {
        if (!run){
            let newDll = new DoublyLinkedList()
            let node = dll.getNodeAtIndex(index)
            node.value = !node.value
            for(let i = 0; i < dll.length; i++){
                newDll.push(dll.getNodeAtIndex(i).value)
            }
            
            setDll(newDll)
        }
    }
    
    const startButton = () => {
        if (!runRef.current){
            return
        }
        nextButton()
        setTimeout(startButton, speed)
    }

    const nextButton = () => {
        setGeneration(generationRef.current + 1)
        let newDll = new DoublyLinkedList()
        let currentNode = dllRef.current.head
        let aboveNode = dllRef.current.getNodeAtIndex(-cols)
        let belowNode = dllRef.current.getNodeAtIndex(cols)
        let popCount = 0

        for(let i = 0; i < dllRef.current.length; i++){
            let count = 0;

            // current+left+right
            if(currentNode){
                if(currentNode.prev){
                    if(currentNode.prev.value){
                        count++
                    }
                }
                if(currentNode.next){
                    if(currentNode.next.value){
                        count++
                    } 
                } 
            }

            // above
            if(aboveNode){
                if(aboveNode.value){
                    count++
                } 
                if(aboveNode.prev){
                    if(aboveNode.prev.value) {
                        count++
                    }
                } 
                if(aboveNode.next){
                    if(aboveNode.next.value){
                        count++
                    } 
                }
            } else {
                aboveNode = dllRef.current.getNodeAtIndex(i-cols)
            }

            // below
            if(belowNode){
                if(belowNode.value){
                    count++
                } 
                if(belowNode.prev){
                    if(belowNode.prev.value){
                        count++
                    } 
                }
                if(belowNode.next){
                    if(belowNode.next.value){
                        count++
                    } 
                } 
            } else {
                belowNode = dllRef.current.getNodeAtIndex(i+cols)
            }

            // push value to new dll depending on count
            if (count < 2 || count > 3){
                newDll.push(false)
            } else if(count === 3){
                popCount++
                newDll.push(true)
            } else if (count === 2){
                newDll.push(currentNode.value)
                if (currentNode.value) popCount++
            }

            // get new above node
            if (aboveNode.next){
                aboveNode = aboveNode.next
            } else{
                aboveNode = null
            }

            // get new below node
            if (belowNode.next){
                belowNode = belowNode.next
            } else{
                belowNode = null
            }

            // get new current node
            if (currentNode.next){
                currentNode = currentNode.next
            } else{
                currentNode = null
            }
        }
        setPopulation(popCount)
        setDll(newDll) 
    }

    const seed = (number=30) => {
        let newDll = new DoublyLinkedList()
        let popCount = 0
        let current = dll.head

        while(current.next){
            if (Math.floor(Math.random() * 1/number*100) === 0){
                newDll.push(true)
                popCount++
            }
            else {
                newDll.push(false)
            }
            current = current.next
        }
        // add last box
        newDll.push(Math.floor(Math.random() * 1/number*100)===0?true:false)
        if (newDll.tail.value) popCount++

        setPopulation(popCount)
        setDll(newDll)
    }

    const reset = () => {
        const height = Math.floor((getWindowDimensions().height / 30))
        const width = Math.floor((getWindowDimensions().width / 25))

        let newDll = new DoublyLinkedList()
        for(let i = 0; i < height*width; i++){
            newDll.push(false)
        }
        setRows(height)
        setCols(width)
        setDll(newDll)
        setGeneration(0)
    }

    return (
        <div className="main">
            <div className="main game">
                <h1>Conway's Game of Life</h1>
                <div className="buttons_container">
                    <button 
                        onClick={async () => {
                            await setRun(!run);
                            startButton()
                        }}
                        title="Start the Game of Life" 
                        style={
                            run ?
                                {color: "red", border: "red 1px solid"}:
                            {color: "green", border: "green 1px solid"}
                        }
                    >
                        {run ? "Stop" : "Start"}
                    </button>
                    <button title="Go to the next generation" onClick={() => nextButton()}>Next Generation</button>
                    <button title="Randomly select the grid's status" onClick={() => seed()}>Randomize</button>
                    <button title="Reset the grid and the generations" onClick={() => reset()}>Reset</button>
                </div>
                <div className="middle">
                        <Grid dll={dll} rows={rows} cols={cols} selectBox={selectBox}/>
                        <h2 title="The current generation.">Generations: {generation}</h2>
                        <div className="midSection" title="How many cells are currently alive."><h4>Population:</h4><span className="midSection">{population}</span></div>
                        <div className="midSection"><h4 title="The size of the grid, automatically calculated based on your window size.">Grid size:</h4><span className="midSection">{width} x {height} = {width*height}</span></div>
                </div>
            </div>
        </div>
    )
}

export default Main

function getWindowDimensions() {
    const { innerWidth: width, innerHeight: height } = window;
    return {
      width,
      height
    };
}