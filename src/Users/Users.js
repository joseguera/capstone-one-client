import React from 'react'
import { useParams } from 'react-router-dom'

export default function Users() {
    let { meta } = useParams();
    return (
        <div className='users'>
            <h2>My Account</h2>
            <h6>Checkout or Edit your Account Settings: {meta}</h6>
        </div>
    )
}

