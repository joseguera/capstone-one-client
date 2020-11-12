import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types';
import NomsContext from '../NomsContext';
import NomItem from '../NomItem/NomItem';
import './NomList.css';

class NomList extends Component {
    static propTypes = {
        noms: PropTypes.arrayOf(
            PropTypes.shape({
                id: PropTypes.oneOfType([
                    PropTypes.number,
                    PropTypes.string,
                ]).isRequired,
            })
        )
    };

    static defaultProps = {
        noms: []
    };

    static contextType = NomsContext;

    render() {
        const { noms } = this.context;
        return (
            <section className='NomList'>
                <h2>Your Noms</h2>
                <Link to={'/add-nom'}><h3>Add Nom</h3></Link>
                {' '}
                <ul className='NomList_list' aria-live='polite'>
                    {noms.map(nom =>
                        <NomItem
                            key={nom.id}
                            {...nom}
                        />
                    )}
                </ul>
            </section>
        )
    }
}

export default NomList;