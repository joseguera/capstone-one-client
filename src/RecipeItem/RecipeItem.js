import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import NomNomsContext from '../NomNomsContext';
import config from '../config';
import './RecipeItem.css';

function deleteRecipeRequest(recipeId, cb) {
    fetch(config.API_ENDPOINT + `/recipes/${recipeId}`, {
        method: 'DELETE',
        headers: {
            'content-type': 'application/json',
            'authorization': `Bearer ${config.API_KEY}`
        }
    })
        .then(data => {
            cb(recipeId)
            window.location = '/recipelist'
        })
        .catch(error => {
            console.error(error)
        })
}

export default function RecipeItem(props) {
    return (
        <NomNomsContext.Consumer>
            {(context) => (
                <li className='RecipeItem'>
                    <div className='RecipeItem_row'>
                        <h3 className='RecipeItem_title'>
                            <a
                                href={props.url}
                                target='_blank'
                                rel='noopener noreferrer'>
                                {props.recipe_name}
                            </a>
                        </h3>
                    </div>
                    <p className='RecipeItem_description'>
                        {props.description}
                    </p>
                    <div className='RecipeItem_buttons'>
                        <Link to={`/edit-recipe/${props.id}`}>
                            Edit
                        </Link>
                        {' '}
                        <button
                            className='RecipeItem_description'
                            onClick={() =>
                                deleteRecipeRequest(props.id, context.deleteRecipe)
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

RecipeItem.defaultProps = {
    onClickDelete: () => { },
}

RecipeItem.propTypes = {
    id: PropTypes.oneOfType([
        PropTypes.number,
        PropTypes.string,
    ]).isRequired,
    recipe_name: PropTypes.string.isRequired,
    sub: PropTypes.string.isRequired,
    url: PropTypes.string,
    desciption: PropTypes.string,
    onClickDelete: PropTypes.func,
}