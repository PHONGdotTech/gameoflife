import React from 'react';
import Box from './Box'

const Grid = (props) =>{
    const width = props.cols*12 + props.cols

    var rowsArr = []

    let index = 0
    let current = props.dll.head
    let boxClass = "box off"

    // loop through the dll and create a box for each node, then append to rowsArr to be returned in the grid
    while(current.next){
        if (current.value === 1){
            boxClass = "box on"
        } else if (current.value === 2){
            boxClass = "box dying"
        } else {
            boxClass = "box off"
        }
        rowsArr.push(<Box boxClass={boxClass} key={index} index={index} selectBox={props.selectBox}/>)
        
        index++ 
        current = current.next
    }
    // add last box
    rowsArr.push(<Box boxClass={props.dll.tail.value===1?"box on":props.dll.tail.value===2?"box dying":"box off"} key={index} index={index} selectBox={props.selectBox}/>)
    

    return(
        <div className="grid" style={{width: width}}>
            {rowsArr}
        </div>
    )
}

export default Grid