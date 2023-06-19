import React, { useState } from 'react'
import { FaStar } from 'react-icons/fa'


function Star(props) {

    const { count, selected, onSelect } = props

    return (
        <FaStar id='star' style={{ width: '35px',height: '90px', color: selected ? 'red' : '' }} onClick={onSelect} />
    )
}

export default function StarRating(props) {

    const myStar = [...Array(5)]
    const [selected, setSelected] = useState(0)
    const {setReview,review} = props
    // console.log(props.selected)
    return (
        <div>
            {myStar.map((start,i) => <Star key={i} count={i} selected={selected>i} onSelect={()=>{setSelected(i+1); setReview(review.rating = i+1)} }/>)}
            {/* {myStar.map((star, i) => {
                return <FaStar id='star' key={i} style={{ width: '35px', height: '90px', color: selected ? 'red' : '' }} onClick={() => { console.log(i + 1) }} />
            })} */}
        </div>
    )
}
