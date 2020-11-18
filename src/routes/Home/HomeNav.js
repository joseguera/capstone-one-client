import React from 'react'
import { Link } from 'react-router-dom'

function HomeNav() {
    return (
        <div>
            <div className='nav'>
                <Link to='/why-noms' className='links'><h3>Home Page</h3></Link>
                {' '}
                <Link to='/no-noms' className='links'><h3>My Noms</h3></Link>
                {' '}
                <Link to='/noms-4-all' className='links'><h3>My Noms</h3></Link>
            </div>
        </div>
    )
}

export default HomeNav;