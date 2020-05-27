import React from 'react'

export default function Box(props){
    const selectBox = () => {
        props.selectBox(props.index)
    }

    let bgColor = "b9b9b9"
    if (props.boxClass === "box on"){
        bgColor = (Math.floor(Math.random() * 40)*100 + 166000).toString()
    }
        
    return(
        <div className={props.boxClass} index={props.index} onClick={selectBox}>

        </div>
    )
}