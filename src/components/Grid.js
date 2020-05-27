import React from 'react';
import Box from './Box'

const Grid = (props) =>{
    const width = props.cols*15 + props.cols

    var rowsArr = []

    for(let i = 0; i < props.dll.length; i++){
        const currentValue = props.dll.getNodeAtIndex(i).value
        const boxClass = currentValue ? "box on" : "box off"
        const index = i

        rowsArr.push(
            <Box boxClass={boxClass} key={index} index={index} selectBox={props.selectBox}/>
        )
    }

    return(
        <div className="grid" style={{width: width}}>
            {rowsArr}
        </div>
    )
}

export default Grid