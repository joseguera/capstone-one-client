import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types';
import NomNomsContext from '../../context/NomNomsContext';
import NomItem from '../../components/NomItem/NomItem';
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

    static contextType = NomNomsContext;

    render() {
        const { noms } = this.context;
        return (
            <section className='NomList'>
                <h2>My Noms</h2>
                    <ul className='NomList_list' aria-live='polite'>
                        <li>
                            <button>
                                <Link 
                                    to={'/new-nom'}
                                    style={{ textDecoration: 'none' }}
                                >
                                        <h3>Add Nom +</h3>
                                </Link>
                            </button>
                        </li>
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