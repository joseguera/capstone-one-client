import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types';
import NomNomsContext from '../NomNomsContext';
import RecipeItem from '../RecipeItem/RecipeItem';
import './RecipeList.css';

class RecipeList extends Component {
    static propTypes = {
        recipes: PropTypes.arrayOf(
            PropTypes.shape({
                id: PropTypes.oneOfType([
                    PropTypes.number,
                    PropTypes.string,
                ]).isRequired,
            })
        )
    };

    static defaultProps = {
        recipes: []
    };

    static contextType = NomNomsContext;

    render() {
        const { recipes } = this.context;
        return (
            <section className='RecipeList'>
                <h2>My Recipes</h2>
                <Link to={'/add-recipe'}><h3>Add Recipe</h3></Link>
                {' '}
                <ul className='RecipeList_list' aria-live='polite'>
                    {recipes.map(recipe =>
                        <RecipeItem
                            key={recipe.id}
                            {...recipe}
                        />
                    )}
                </ul>
            </section>
        )
    }
}

export default RecipeList;
