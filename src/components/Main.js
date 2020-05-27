import React, {useState, useEffect} from 'react';
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
    const [intervalId, setIntervalId] = useState()
    const [run, setRun] = useState(false)
    const [dll, setDll] = useState(initialDll)

    useEffect(()=>{
        let newDll = new DoublyLinkedList()

        for(let i = 0; i < dll.length; i++){
            let currentNode = dll.getNodeAtIndex(i)
            let count = 0;
            // left
            if(dll.getNodeAtIndex(i-1).value) count++;

            // right
            if(dll.getNodeAtIndex(i+1).value) count++;

            // above
            if(dll.getNodeAtIndex(i-cols).value) count++

            // below
            if(dll.getNodeAtIndex(i+cols).value) count++;

            // upper left
            if(dll.getNodeAtIndex((i-cols)-1).value) count++;

            // upper right
            if(dll.getNodeAtIndex((i-cols)+1).value) count++;

            // lower left
            if(dll.getNodeAtIndex((i+cols)-1).value) count++;

            // lower right
            if(dll.getNodeAtIndex((i+cols)+1).value) count++;

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
        let newDll = new DoublyLinkedList()
        for(let i = 0; i < dll.length; i++){
            if (Math.floor(Math.random() * 1/number*100) === 0){
                newDll.push(true)
            }
            else {
                newDll.push(false)
            }
        }
        setDll(newDll)
    }

    const reset = () => {
        setDll(initialDll)
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
            <Grid dll={dll} rows={rows} cols={cols} selectBox={selectBox}/>
            <h2>Generations: {generation}</h2>
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