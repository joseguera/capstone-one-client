import React from 'react'
import { Link } from 'react-router-dom'
import './Navigation.css'


function Navigation() {
    return (
        <div>
            <h1>Welcome to NomNoms</h1>
            <div className='nav'>
                <Link to={'/'} className='links'><h3>Home Page</h3></Link>
                {' '}
                <Link to={'/nomlist'} className='links'><h3>My Noms</h3></Link>
            </div>
        </div>
    )
}

export default Navigation;