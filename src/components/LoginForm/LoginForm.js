import React, { Component } from 'react'
import TokenService from '../../services/token-service'
import { Button, Input } from '../Utils/Utils'

export default class LoginForm extends Component {
    static defaultProps = {
        onLoginSuccess: () => { }
    }

    state = { error: null }

    handleSubmitBasicAuth = ev => {
        ev.preventDefault()
        const { username, password } = ev.target

        TokenService.saveAuthToken(
            TokenService.makeBasicAuthToken(username.value, password.value)
        )

        username.value = ''
        password.value = ''
        this.props.onLoginSuccess()
    }

    render() {
        const { error } = this.state
        return (
            <form
                className='LoginForm'
                onSubmit={this.handleSubmitBasicAuth}
            >
                <div role='alert'>
                    {error && <p className='red'>{error}</p>}
                </div>
                <div className='username'>
                    <label htmlFor='LoginForm__username'>
                        User name
          </label>
                    <Input
                        required
                        name='username'
                        id='LoginForm__username'>
                    </Input>
                </div>
                <div className='password'>
                    <label htmlFor='LoginForm__password'>
                        Password
          </label>
                    <Input
                        required
                        name='password'
                        type='password'
                        id='LoginForm__password'>
                    </Input>
                </div>
                <Button type='submit'>
                    Login
        </Button>
            </form>
        )
    }
}
