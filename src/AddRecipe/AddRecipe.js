import React, { Component } from 'react';
import PropTypes from 'prop-types';
import NomNomsContext from '../NomNomsContext';
import config from '../config';
import './AddRecipe.css'

const Required = () => (
    <span className='AddRecipe_required'>*</span>
)

class AddRecipe extends Component {
    static propTypes = {
        history: PropTypes.shape({
            push: PropTypes.func,
        }).isRequired,
    };

    static contextType = NomNomsContext;

    state = {
        error: null,
    };

    handleSubmit = e => {
        e.preventDefault()
        // get the form fields from the event
        const { recipe_name, description, author } = e.target;
        const recipe = {
            recipe_name: recipe_name.value,
            description: description.value,
        }
        this.setState({ error: null })
        fetch(config.API_ENDPOINT + `/recipes`, {
            method: 'POST',
            body: JSON.stringify(recipe),
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
                this.setState({
                    author: data.author
                })
                recipe_name.value = ''
                description.value = ''
                this.context.addRecipe(data)
                this.props.history.push('/recipelist')
            })
            .catch(error => {
                console.error(error)
                this.setState({ error })
            })
    }

    handleClickCancel = () => {
        this.props.history.push('/recipelist')
    }

    render() {
        const { error } = this.state;
        return (
            <section className='AddRecipe'>
                <h2>Create a recipe</h2>
                <form
                    className='AddRecipe_form'
                    onSubmit={this.handleSubmit}
                >
                    <div className='AddRecipe_error' role='alert'>
                        {error && <p>{error.message}</p>}
                    </div>
                    <div>
                        <label htmlFor='recipe_name'> 
                            Recipe Name
                            {' '}
                            <Required />
                        </label>
                        <input 
                            type='text'
                            name='recipe_name'
                            id='recipe_name'
                            placeholder='Vegan honey'
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor='description'>
                            Description
                        </label>
                        <textarea
                            name='description'
                            id='description'
                        />
                    </div>
                    <div>
                        <input 
                            type='hidden'
                            name='id'
                        />
                    </div>
                    <p>Add Nom (feature goes here)</p>                    
                    <div className='AddRecipe_buttons'>
                        <button type='button' onClick={this.handleClickCancel}>
                            Cancel
                        </button>
                        {' '}
                        <button type='submit'>
                            Save
                        </button>
                    </div>
                </form>
            </section>
        )
    }
}

export default AddRecipe;