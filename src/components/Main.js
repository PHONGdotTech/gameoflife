import React, {useState, useRef} from 'react';
import {DoublyLinkedList} from '../data_structures/doubly_linked_list'
import Grid from "./Grid"

const Main = () =>{
    const height = Math.floor((getWindowDimensions().height / 18))
    const width = Math.floor((getWindowDimensions().width / 15))
    
    const initialDll = new DoublyLinkedList()
    for(let i = 0; i < height*width; i++){
        initialDll.push(0)
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
    const popRef = useRef(population)
    popRef.current = population

    const selectBox = (index) => {
        if (!run){
            let newDll = new DoublyLinkedList()
            let node = dll.getNodeAtIndex(index)
            if (node.value === 1){
                node.value = 0
            }else{
                node.value = 1
            }
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
                    if(currentNode.prev.value === 1){
                        count++
                    }
                }
                if(currentNode.next){
                    if(currentNode.next.value === 1){
                        count++
                    } 
                } 
            }

            // above
            if(aboveNode){
                if(aboveNode.value === 1){
                    count++
                } 
                if(aboveNode.prev){
                    if(aboveNode.prev.value === 1) {
                        count++
                    }
                } 
                if(aboveNode.next){
                    if(aboveNode.next.value === 1){
                        count++
                    } 
                }
            } else {
                aboveNode = dllRef.current.getNodeAtIndex(i-cols)
            }

            // below
            if(belowNode){
                if(belowNode.value === 1){
                    count++
                } 
                if(belowNode.prev){
                    if(belowNode.prev.value === 1){
                        count++
                    } 
                }
                if(belowNode.next){
                    if(belowNode.next.value === 1){
                        count++
                    } 
                } 
            } else {
                belowNode = dllRef.current.getNodeAtIndex(i+cols)
            }

            // push value to new dll depending on count
            if (count < 2 || count > 3){
                if (currentNode.value === 1){
                    newDll.push(2)
                } else {
                    newDll.push(0)
                }
            } else if(count === 3){
                popCount++
                newDll.push(1)
            } else if (count === 2){
                if (currentNode.value === 1){
                    popCount++
                    newDll.push(1)
                } else {
                    newDll.push(0)
                }
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
                newDll.push(1)
                popCount++
            }
            else {
                newDll.push(0)
            }
            current = current.next
        }
        // add last box
        newDll.push(Math.floor(Math.random() * 1/number*100)===0?1:0)
        if (newDll.tail.value===1) popCount++

        setPopulation(popCount)
        setDll(newDll)
    }

    const loadGun = () => {
        let newDll = dllRef.current
        newDll.setNodeAtIndex(16, 1)
        newDll.setNodeAtIndex(17+cols, 1)
        newDll.setNodeAtIndex(15+(2*cols), 1)
        newDll.setNodeAtIndex(16+(2*cols), 1)
        newDll.setNodeAtIndex(17+(2*cols), 1)
        newDll.setNodeAtIndex(23+(4*cols), 1)
        newDll.setNodeAtIndex(25+(4*cols), 1)
        newDll.setNodeAtIndex(21+(5*cols), 1)
        newDll.setNodeAtIndex(25+(5*cols), 1)
        newDll.setNodeAtIndex(13+(6*cols), 1)
        newDll.setNodeAtIndex(21+(6*cols), 1)
        newDll.setNodeAtIndex(12+(7*cols), 1)
        newDll.setNodeAtIndex(13+(7*cols), 1)
        newDll.setNodeAtIndex(14+(7*cols), 1)
        newDll.setNodeAtIndex(15+(7*cols), 1)
        newDll.setNodeAtIndex(20+(7*cols), 1)
        newDll.setNodeAtIndex(25+(7*cols), 1)
        newDll.setNodeAtIndex(34+(7*cols), 1)
        newDll.setNodeAtIndex(35+(7*cols), 1)
        newDll.setNodeAtIndex(11+(8*cols), 1)
        newDll.setNodeAtIndex(12+(8*cols), 1)
        newDll.setNodeAtIndex(14+(8*cols), 1)
        newDll.setNodeAtIndex(16+(8*cols), 1)
        newDll.setNodeAtIndex(21+(8*cols), 1)
        newDll.setNodeAtIndex(34+(8*cols), 1)
        newDll.setNodeAtIndex(35+(8*cols), 1)
        newDll.setNodeAtIndex((9*cols), 1)
        newDll.setNodeAtIndex(1+(9*cols), 1)
        newDll.setNodeAtIndex(10+(9*cols), 1)
        newDll.setNodeAtIndex(11+(9*cols), 1)
        newDll.setNodeAtIndex(12+(9*cols), 1)
        newDll.setNodeAtIndex(14+(9*cols), 1)
        newDll.setNodeAtIndex(17+(9*cols), 1)
        newDll.setNodeAtIndex(21+(9*cols), 1)
        newDll.setNodeAtIndex(25+(9*cols), 1)
        newDll.setNodeAtIndex((10*cols), 1)
        newDll.setNodeAtIndex(1+(10*cols), 1)
        newDll.setNodeAtIndex(11+(10*cols), 1)
        newDll.setNodeAtIndex(12+(10*cols), 1)
        newDll.setNodeAtIndex(14+(10*cols), 1)
        newDll.setNodeAtIndex(16+(10*cols), 1)
        newDll.setNodeAtIndex(23+(10*cols), 1)
        newDll.setNodeAtIndex(25+(10*cols), 1)
        newDll.setNodeAtIndex(12+(11*cols), 1)
        newDll.setNodeAtIndex(13+(11*cols), 1)
        newDll.setNodeAtIndex(14+(11*cols), 1)
        newDll.setNodeAtIndex(15+(11*cols), 1)
        newDll.setNodeAtIndex(13+(12*cols), 1)

        setPopulation(39)
        setDll(newDll)
    }

    const reset = () => {
        const height = Math.floor((getWindowDimensions().height / 18))
        const width = Math.floor((getWindowDimensions().width / 15))

        let newDll = new DoublyLinkedList()
        for(let i = 0; i < height*width; i++){
            newDll.push(0)
        }
        dllRef.current = newDll
        setPopulation(0)
        setRows(height)
        setCols(width)
        setDll(newDll)
        setGeneration(0)
    }

    return (
        <div className="main">
            <div className="main">
                <h1 className="title">Conway's Game of Life</h1>
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
                    {cols > 37 ? 
                        <button title="Load a preset called the Gosper glider gun." className="hide_when_small" onClick={()=>{
                            reset();
                            loadGun()}}>
                                Load Gosper Gun
                        </button> : ""
                    }
                    <button title="Reset the grid and the generations" onClick={() => reset()}>Reset</button>
                </div>
                <div className="middle">
                        <Grid dll={dll} rows={rows} cols={cols} selectBox={selectBox}/>
                        <div className="key_container">
                            <div className="key"><div className="box on"/><span>Alive</span></div>
                            <div className="key"><div className="box dying"/><span>Just died</span></div>
                            <div className="key"><div className="box off"/><span>Dead</span></div>
                        </div>
                        <h2 title="The current generation.">Generations: {generation}</h2>
                        <div className="midSection" title="How many cells are currently alive."><h4>Population:</h4><span className="midSection">{popRef.current}</span></div>
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