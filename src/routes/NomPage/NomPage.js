import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types';
import TokenService from '../../services/token-service'
import NomNomsContext from '../../context/NomNomsContext';
import config from '../../config'
import './NomPage.css';

const Required = () => (
    <span className='NomPage_required'>*</span>
)

class NomPage extends Component {
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
              'authorization': `basic ${TokenService.getAuthToken()}`,            
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

    

    handleClickBack = () => {
        this.props.history.push('/nomlist')
    }

    render() {
        const { id, error, nom_name, sub, url, description } = this.state;
        return (
            <section className='NomPage'>
                <h2>{nom_name}</h2>
                    <div>
                        <p className='sub'>
                            <span>
                            Sub:
                            {' '}
                            </span>
                            {sub}
                        </p>
                        <p className='url'>
                            <span>
                            URL:
                            {' '}
                            </span>
                            {url ? url : `No URL available`}
                        </p>
                        <p className='description'>
                            <span>
                            Description:
                            {' '}
                            </span>
                            {description}
                        </p>
                    </div>
                    <div className='NomPage__buttons'>
                        <Link to={`/edit-nom/${id}`}>
                            Edit
                        </Link>
                        {' '}
                        <button type='button' onClick={this.handleClickBack}>
                            Back
                        </button>
                        {' '}
                        <button type='submit'>
                            Save
                        </button>
                    </div>
            </section>
        )
    }
}

export default NomPage;