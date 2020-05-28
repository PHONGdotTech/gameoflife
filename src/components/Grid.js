import React from 'react';
import Box from './Box'

const Grid = (props) =>{
    const width = props.cols*15 + props.cols

    var rowsArr = []

    let index = 0
    let current = props.dll.head
    while(current.next){
        const boxClass = current.value ? "box on" : "box off"
        rowsArr.push(<Box boxClass={boxClass} key={index} index={index} selectBox={props.selectBox}/>)
        
        index++ 
        current = current.next
    }
    // add last box
    rowsArr.push(<Box boxClass={props.dll.tail.value?"box on":"box off"} key={index} index={index} selectBox={props.selectBox}/>)
    

    return(
        <div className="grid" style={{width: width}}>
            {rowsArr}
        </div>
    )
}

export default Grid