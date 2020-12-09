import React from 'react'
import App from './App'
import { setContext } from 'apollo-link-context'
 

import { 
    ApolloProvider,
    ApolloClient, 
    InMemoryCache, 
    createHttpLink 
} from '@apollo/client'

const httpLink = createHttpLink({
    uri: 'http://localhost:5000'
})

const authLink = setContext(() => {
    const token = localStorage.getItem('jwtToken')

    return {
        headers: {
            Authorization: token ? `Bearer ${token}` : ''
        }
    }
})

const client = new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache(),
    connectToDevTools: true
})

export default (
    <ApolloProvider client={client}>
        <App/>
    </ApolloProvider>
);