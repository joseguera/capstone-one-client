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
                <Link to={'/nomlist'} className='links'><h3>Noms Page</h3></Link>
                {' '}
                {/* <Link to={'/add-nom'} className='links'><h3>Add Nom</h3></Link>
                {' '} */}
                <Link to={'/recipes/recipe_id'} className='links'><h3>My Recipes</h3></Link>
                {' '}
                <Link to={'/users/user_id'} className='links'><h3>My Account</h3></Link>
            </div>
        </div>
    )
}

export default Navigation;