import React, {useState, useEffect, useCallback, useRef} from 'react';
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
    const [run, setRun] = useState(false)
    const [dll, setDll] = useState(initialDll)

    const runRef = useRef(run)
    runRef.current = run

    useEffect(()=>{
        let newDll = new DoublyLinkedList()
        for(let i = 0; i < dll.length; i++){
            const currentNode = dll.getNodeAtIndex(i)
            let count = 0;

            // left
            if(currentNode) if(currentNode.prev) if(currentNode.prev.value) count++

            // right
            if(currentNode) if(currentNode.next) if(currentNode.next.value) count++

            // above
            const aboveNode = dll.getNodeAtIndex(i-cols)
            if(aboveNode) if(aboveNode.value) count++
            
            // upper left
            if(aboveNode) if(aboveNode.prev) if(aboveNode.prev.value) count++
            
            // upper right
            if(aboveNode) if(aboveNode.next) if(aboveNode.next.value) count++

            // below
            const belowNode = dll.getNodeAtIndex(i+cols)
            if(belowNode) if(belowNode.value) count++

            // lower left
            if(belowNode) if(belowNode.prev) if(belowNode.prev.value) count++
            
            // lower right
            if(belowNode) if(belowNode.next) if(belowNode.next.value) count++


            if (count < 2 || count > 3){
                newDll.push(false)
            }
            if (count === 3){
                newDll.push(true)
            }
            if (count === 2){
                newDll.push(currentNode.value)
            }
        }
        setDll(newDll)
    }, [generation])

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
    
    const startButton = useCallback(() => {
        if (!runRef.current){
            return
        }
        
        setGeneration(generation => generation + 1)
        setTimeout(startButton, speed)
    }, [])

    const nextButton = () => {
        setGeneration(generation => generation + 1)
    }

    const seed = (number=30) => {
        let newDll = new DoublyLinkedList()
        
        let current = dll.head
        while(current.next){
            if (Math.floor(Math.random() * 1/number*100) === 0){
                newDll.push(true)
            }
            else {
                newDll.push(false)
            }
            current = current.next
        }
        // add last box
        newDll.push(Math.floor(Math.random() * 1/number*100)===0?true:false)
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
                        onClick={() => {
                            setRun(!run);
                            runRef.current = true;
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
                        <div className="midSection"><h4 title="The size of the grid, automatically calculated based on your window size.">Grid size:</h4><span className="midSection">{width} x {height} = {width*height}</span></div>
                </div>
            </div>
            <div className="about">
                <div className="about_section">
                    <div className="rules text">
                        <h4>About The Game of Life</h4>
                        <p>The Game of Life, also known simply as Life, is a cellular automaton devised by the British mathematician John Horton Conway in 1970. It is a zero-player game, meaning that its evolution is determined by its initial state, requiring no further input.</p>
                        <span><a href="https://en.wikipedia.org/wiki/Conway's_Game_of_Life" target="_blank">Wikipedia</a></span>
                    </div>
                    <div className="rules">
                        <ol>
                            <h4>Rules</h4>
                            <li>Any live cell with two or three live neighbours survives.</li>
                            <li>Any dead cell with three live neighbours becomes a live cell.</li>
                            <li>All other live cells die in the next generation. Similarly, all other dead cells stay dead.</li>
                        </ol>
                    </div>
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