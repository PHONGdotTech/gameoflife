import React from 'react'

export default function Box(props){
    const selectBox = () => {
        props.selectBox(props.index)
    }
        
    return(
        <div className={props.boxClass} index={props.index} onClick={selectBox}>

        </div>
    )
}