import React, { Component } from 'react';
import PropTypes from 'prop-types';
import NomsContext from '../NomsContext';
import BookmarkItem from '../BookmarkItem/BookmarkItem';
import './BookmarkList.css'

export default function Noms() {
    return(
        <div className='noms'>
            <h2>My Noms</h2>
            <h6>Check out your Noms:</h6>
        </div>
    )
}


export default Noms;