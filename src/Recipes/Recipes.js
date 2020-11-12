import React from 'react'
import { useParams } from 'react-router-dom'

export default function Recipes() {
    let { meta } = useParams();
    return (
        <div className='recipes'>
            <h2>Your Recipes</h2>
            <h6>Checkout Your Recipe number: {meta}</h6>
        </div>
    )
}

