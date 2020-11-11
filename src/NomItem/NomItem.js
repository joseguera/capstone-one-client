import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import NomsContext from '../NomsContext';
import config from '../config';
import './NomItem.css';

function deleteNomRequest(nomId, cb) {
    fetch(config.API_ENDPOINT + `/${nomId}`, {
        method: 'DELETE',
        headers: {
            'content-type': 'application/json',
            'authorization': `bearer ${config.API_KEY}`
        }
    })
    .then(res => {
        if (!res.ok) {
            return res.json().then(error => Promise.reject(error))
        }
        return res.json()
    })
    .then(data => {
        cb(nomId)
    })
    .catch(error => {
        console.error(error)
    })
}

export default function NomItem(props) {
    return (
        <NomsContext.Consumer>
            {(context) => (
                <li className='NomItem'>
                    <div className='NomItem_row'>
                        <h3 className='NomItem_title'>
                            <a
                                href={props.url}
                                target='_blank'
                                rel='noopener noreferrer'>
                                {props.title}
                            </a>
                        </h3>
                    </div>
                    <p></p>
                </li>
            )}
        </NomsContext.Consumer>
    )
}