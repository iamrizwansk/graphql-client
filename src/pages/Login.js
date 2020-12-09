import React, { useState, useContext } from 'react'
import { Button, Form } from 'semantic-ui-react'
import { useMutation } from '@apollo/client'
import gql from 'graphql-tag'

import { useForm } from '../util/hooks'
import { AuthContext } from '../context/auth'

function Login(props) {
    const context = useContext(AuthContext)
    const [errors, setErrors] = useState({})
    
    const {onChange, onSubmit, values} = useForm(loginUserCallback, {
        username: '',
        password: ''
    })  
  
    const [loginUser, { loading }] = useMutation(LOGIN_USER, {
        update(_, {data: {login : userData}}) {
            props.history.push('/')
            context.login(userData)
        },
        onError(err) {
            setErrors(err.graphQLErrors[0].extensions.exception.errors)
        },
        variables: values
    })

   function loginUserCallback() {
       loginUser()
   }


    return (
        <div className='form-container'>
            <Form onSubmit={onSubmit} noValidate className={loading ? "loading" : ""}>
                <h1>Login</h1>
                <Form.Input
                    label="Username"
                    placeholder="Username..."
                    name="username"
                    value={values.username}
                    error={errors.username ? true : false}
                    onChange={onChange}
                    type="text"
                />
                <Form.Input
                    label="Password"
                    placeholder="Password..."
                    name="password"
                    error={errors.password ? true : false}
                    value={values.password}
                    onChange={onChange}
                    type="password"
                />
                <Button type="submit" primary>
                Login
                </Button>
            </Form>
            { Object.keys(errors).length > 0 && (
                <div className="ui error message">
                    <ul className="list">
                        {
                            Object.values(errors).map(error =>
                                <li>{error}</li>)
                        }
                    </ul>
                </div>
            )

            }
        </div>
    )
}

const LOGIN_USER = gql`
mutation login(
    $username: String!
    $password: String!
) {
    login(
            username: $username password: $password ){
        id email username createdAt token 
    }
}
`

export default Login