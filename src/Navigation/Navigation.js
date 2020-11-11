import React from 'react'
import { NavLink } from 'react-router-dom'
import './Navigation.css'


function Navigation() {
    return (
        <div>
            <h1>Welcome to NomNoms</h1>
            <div className='nav'>
                <NavLink to='/' className='links'><h3>Home Page</h3></NavLink>
                <NavLink to='/noms' className='links'><h3>Noms Page</h3></NavLink>
                <NavLink to='/recipes/recipe_id' className='links'><h3>My Recipes</h3></NavLink>
                <NavLink to='/users/user_id' className='links'><h3>My Account</h3></NavLink>
            </div>    
        </div>
    )
}

export default Navigation;