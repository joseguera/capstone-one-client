import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import TokenService from '../../services/token-service'
import NomNomsContext from '../../context/NomNomsContext';
import config from '../../config';
import './NomItem.css';

function deleteNomRequest(nomId, cb) {
    fetch(config.API_ENDPOINT + `/noms/${nomId}`, {
        method: 'DELETE',
        headers: {
            'content-type': 'application/json',
            'authorization': `basic ${TokenService.getAuthToken()}`,        
        }
    })
        .then(data => {
            cb(nomId)
            // window.location = '/nomlist'
        })
        .catch(error => {
            console.error(error)
        })
}

export default function NomItem(props) {
    return (
        <NomNomsContext.Consumer>
            {(context) => (
                <li className='NomItem'>
                    <div className='NomItem_row'>
                        <h3 className='NomItem_title'>
                            <Link to={`/nom-page/${props.id}`}
                                href={props.url}
                                // target='_blank'
                                // rel='noopener noreferrer'
                            >
                                {props.nom_name}
                            </Link>
                        </h3>
                    </div>
                    <p className='NomItem_description'>
                        {props.description}
                    </p>
                    <div className='NomItem_buttons'>
                        <Link to={`/edit-nom/${props.id}`}>
                            Edit
                        </Link>
                        {' '}
                        <button
                            className='NomItem_description'
                            onClick={() =>
                                deleteNomRequest(props.id, context.deleteNom)
                            }
                        >
                            Delete
                        </button>
                    </div>
                </li>
            )}
        </NomNomsContext.Consumer>
    )
}

NomItem.defaultProps = {
    onClickDelete: () => { },
}

NomItem.propTypes = {
    id: PropTypes.oneOfType([
        PropTypes.number,
        PropTypes.string,
    ]).isRequired,
    nom_name: PropTypes.string.isRequired,
    sub: PropTypes.string.isRequired,
    url: PropTypes.string,
    desciption: PropTypes.string,
    onClickDelete: PropTypes.func,
}