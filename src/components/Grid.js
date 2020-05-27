import React from 'react';
import Box from './Box'

const Grid = (props) =>{
    const width = props.cols*15 + props.cols

    var rowsArr = []
    let boxClass =""

    for(let row = 0; row<props.rows; row++){
        for(let col = 0; col<props.cols; col++){
            let boxId = row + "_" + col;

            boxClass = props.gridFull[row][col] ? "box on" : "box off"
            rowsArr.push(
                <Box boxClass={boxClass} key={boxId} boxId={boxId} row={row} col={col} selectBox={props.selectBox}/>
            )

        }
    }


    return(
        <div className="grid" style={{width: width}}>
            {rowsArr}
        </div>
    )
}

export default Grid