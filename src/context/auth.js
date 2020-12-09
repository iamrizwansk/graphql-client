import jwtDecode from 'jwt-decode'
import React, { createContext, useReducer } from 'react'


const initialState = {
    user: null
}

if (localStorage.getItem('jwtToken')) {
    const decodedToken = jwtDecode(localStorage.getItem('jwtToken'))
    if (decodedToken.exp * 1000 < Date.now()) {
        localStorage.removeItem('jwtToken')
    } else {
        initialState.user = decodedToken
    }

}


const AuthContext = createContext({
    login: (data) => { },
    logout: () => { },
    user: null
})

const userReducer = (state, action) => {
    switch (action.type) {
        case 'LOGIN':
            return { ...state, user: action.payload }
        case 'LOGOUT':
            return { ...state, user: null }
        default:
            return state
    }
}


const AuthProvider = (props) => {

    const [state, dispatch] = useReducer(userReducer, initialState)

      const login = (userData) => {
          localStorage.setItem('jwtToken', userData.token)
          dispatch({
              type: 'LOGIN',
              payload: userData
          })
      }
      
      const logout = () => {
          localStorage.removeItem('jwtToken')
        dispatch({
            type: 'LOGOUT',
        })
    }



    return (
        <AuthContext.Provider
         value={{user: state.user, login, logout}}
         {...props}
        />

    )
}

export { AuthProvider, AuthContext }