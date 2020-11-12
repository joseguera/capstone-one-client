import React, { Component } from 'react';
import PropTypes from 'prop-types';
import NomsContext from '../NomsContext';
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

    static contextType = NomsContext;

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
        fetch(config.API_ENDPOINT + `/${nomId}`, {
            method: 'GET',
            header: {
                'authorization': `Bearer ${config.API_KEY}`
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
            })
            .catch(error => {
                console.error(error)
                this.setState({ error })
            })
    }

    
}