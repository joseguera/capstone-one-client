import React, { Component } from 'react'
import HomeNav from './HomeNav'


class Home extends Component  {
    
    render() {
        return (
            <div>
                <h2>How NomNoms works:</h2>
                <p>NomNoms allows you to create vegan recipes or collect vegan ingredients (noms) all in one place.</p>
                <HomeNav />
            </div> 
        )  
    }
}

export default Home;
