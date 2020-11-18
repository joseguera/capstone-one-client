import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types';
import TokenService from '../../services/token-service'
import NomNomsContext from '../../context/NomNomsContext';
import config from '../../config'
import './NomPage.css';

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
        style: ''
    };

    componentDidMount() {
        const { nomId } = this.props.match.params;
        fetch(config.API_ENDPOINT + `/noms/${nomId}`, {
            method: 'GET',
            headers: {
              'content-type': 'application/json',
              'authorization': `bearer ${TokenService.getAuthToken()}`,            
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
                    description: responseData.description,
                    style: responseData.style
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
        const { id, nom_name, sub, url, description, style } = this.state;
        return (
            <section className='NomPage'>
                <h2>{nom_name}</h2>
                    <div>
                        <p className='sub'>
                            <span>
                            Substitution for:
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
                        <p className='style'>
                            <span>
                            Nom Type:
                            {' '}
                            </span>
                            {style ? style : `No Nom type was selected`}
                        </p>
                    </div>
                    <div className='NomPage__buttons'>
                    <button>
                            <Link 
                                to={`/edit-nom/${id}`}
                                style={{ textDecoration: 'none' }}
                            >
                                Edit
                            </Link>
                        </button>
                        {' '}
                        <button type='button' onClick={this.handleClickBack}>
                            Back
                        </button>
                    </div>
            </section>
        )
    }
}

export default NomPage;