import React, { Component } from 'react';
import PropTypes from 'prop-types';
import NomNomsContext from '../../context/NomNomsContext';
import config from '../../config';
import TokenService from '../../services/token-service'
import './AddNom.css'

const Required = () => (
    <span className='AddNom_required'>*</span>
)

class AddNom extends Component {
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
        var d = document.getElementById("style");
        var result = d.options[d.selectedIndex].text;
        // get the form fields from the event
        const { nom_name, sub, url, description, style } = e.target;
        const nom = {
            nom_name: nom_name.value,
            sub: sub.value,
            url: url.value,
            description: description.value,
            style: result
        }
        this.setState({ error: null })
        fetch(config.API_ENDPOINT + `/noms`, {
            method: 'POST',
            body: JSON.stringify(nom),
            headers: {
                'content-type': 'application/json',
                'authorization': `bearer ${TokenService.getAuthToken()}`,
            }
        })
            .then(res => {
                if (!res.ok) {
                    return res.json().then(error => Promise.reject(error))
                }
                return res.json()
            })
            .then(data => {
                nom_name.value = ''
                sub.value = ''
                url.value = ''
                description.value = ''
                style.value = ''
                this.context.addNom(data)
                this.props.history.push('/nomlist')
            })
            .catch(error => {
                console.error(error)
                this.setState({ error })
            })
    }

    handleClickCancel = () => {
        this.props.history.push('/nomlist')
    }

    render() {
        const { error } = this.state;
        return (
            <section className='AddNom'>
                <h2>Create a nom</h2>
                <form
                    className='AddNom_form'
                    onSubmit={this.handleSubmit}
                >
                    <div className='AddNom_error' role='alert'>
                        {error && <p>{error.message}</p>}
                    </div>
                    <div>
                        <label htmlFor='nom_name'> 
                            Nom Name
                            {' '}
                            <Required />
                        </label>
                        <input 
                            type='text'
                            name='nom_name'
                            id='nom_name'
                            placeholder='Vegan honey'
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor='sub'>
                            Substitution for
                            {' '}
                            <Required />
                        </label>
                        <input 
                            type='text'
                            name='sub'
                            id='sub'
                            placeholder='honey'
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor='url'>
                            URL
                            {' '}
                        </label>
                        <input 
                            type='url'
                            name='url'
                            id='url'
                            placeholder='https://www.veganhoney.com'
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
                        <label htmlFor='style'>
                            Nom Type:
                            {' '}
                            <Required />
                        </label>
                        <select id="style">
                            <option value="None">-- Select --</option>
                            <option value="nom">Nom</option>
                            <option value="recipe">Recipe</option>
                        </select>
                    </div>                    
                    <div className='AddNom_buttons'>
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

export default AddNom;