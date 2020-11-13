import React, { Component } from 'react';
import PropTypes from 'prop-types';
import NomNomsContext from '../NomNomsContext';
import config from '../config'
import './EditNom.css';

const Required = () => (
    <span className='EditNom_required'>*</span>
)

class EditNom extends Component {
    static propTypes = {
        match: PropTypes.shape({
            params: PropTypes.object,
        }),
        history: PropTypes.shape({
            push: PropTypes.func,
        }).isRequired,
    };

    static contextType = NomNomsContext;

    state = {
        error: null,
        id: '',
        nom_name: '',
        sub: '',
        url: '',
        description: '',
    };

    componentDidMount() {
        const { nomId } = this.props.match.params;
        fetch(config.API_ENDPOINT + `/noms/${nomId}`, {
            method: 'GET',
            headers: {
              'content-type': 'application/json',
              'Authorization': `Bearer ${config.API_KEY}`
            }
        })
            .then(res => {
                if(!res.ok)
                    return res.json().then(error => Promise.reject(error))

                return res.json()
            })
            .then(responseData => {
                this.setState({
                    id: responseData.id,
                    nom_name: responseData.nom_name,
                    sub: responseData.sub,
                    url: responseData.url,
                    description: responseData.description
                })
            console.log(this.state)
            })
            .catch(error => {
                console.error(error)
                this.setState({ error })
            })
    }

    handleChangeName = e => {
        this.setState({ nom_name: e.target.value })
    };

    handleChangeSub = e => {
        this.setState({ sub: e.target.value })
    };

    handleChangeUrl = e => {
        this.setState({ url: e.target.value })
    };

    handleChangeDescription = e => {
        this.setState({ description: e.target.value })
    };

    handleSubmit = e => {
        e.preventDefault();
        const { nomId } = this.props.match.params;
        const { id, nom_name, sub, url, description } = this.state;
        const newNom = { id, nom_name, sub, url, description };
        fetch(config.API_ENDPOINT + `/noms/${nomId}`, {
            method: 'PATCH',
            body: JSON.stringify(newNom),
            headers: {
                'content-type': 'application/json',
                'authorization': `Bearer ${config.API_KEY}`
            },
        })
            .then(res => {
                if (!res.ok)
                    return res.json().then(error => Promise.reject(error))
            })
            .then(() => {
                this.resetFields(newNom)
                this.context.updateNom(newNom)
                this.props.history.push('/nomlist')
            })
            .catch(error => {
                console.error(error)
                this.setState({ error })
            })
    }

    resetFields = (newFields) => {
        this.setState({
            id: newFields.id || '',
            nom_name: newFields.nom_name || '',
            sub: newFields.sub || '',
            url: newFields.url || '',
            description: newFields.description || '' 
        })
    }

    handleClickCancel = () => {
        this.props.history.push('/nomlist')
    }

    render() {
        const { error, nom_name, sub, url, description } = this.state;
        return (
            <section className='EditNom'>
                <h2>Edit Nom</h2>
                <form
                    className='EditNom_form'
                    onSubmit={this.handleSubmit}
                >
                    <div className='EditNom_error' role='alert'>
                        {error && <p>{error.message}</p>}
                    </div>
                    <input 
                        type='hidden'
                        name='id'
                    />
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
                            value={nom_name}
                            onChange={this.handleChangeName}
                        />
                    </div>
                    <div>
                        <label htmlFor='sub'>
                            Sub
                            {' '}
                            <Required />
                        </label>
                        <input
                            type='sub'
                            name='sub'
                            id='sub'
                            placeholder='honey'
                            required
                            value={sub}
                            onChange={this.handleChangeSub}
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
                            placeholder='http//:www.vegan-honey.com'
                            value={url}
                            onChange={this.handleChangeUrl}
                        />
                    </div>
                    <div>
                        <label htmlFor='description'>
                            Description
                        </label>
                        <textarea
                            name='description'
                            id='description'
                            value={description}
                            onChange={this.handleChangeDescription}
                        />
                    </div>
                    <div className='EditNom__buttons'>
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

export default EditNom;