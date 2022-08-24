// We want a user context that manages all of our user info
// react context provides a component + value that wraps child components and gives them all the context value

import React, { useContext, useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { auth } from '../firebase' // auth is instance of firebase app created in firebase.js

const AuthContext = React.createContext()

// useContext returns value of context argument, would be user in this case
export const useAuth = () => useContext(AuthContext)

// manage user data in AuthProvider
// the children prop is there to render jsx elements wrapped inside <AuthProvider> component
export const AuthProvider = ({ children }) => {

  // loading state, true at start
  // used in an if-condition to prevent rendering children until loading is finished (false)
  const [loading, setLoading] = useState(true)

  // user object, null at start, our context value
  const [user, setUser] = useState(null)

  // useHistory hook to renavigate to past
  const history = useHistory()

  // function to get user from firebase and update states
  useEffect(() => {
    // on change to user sign-in status (triggers on signin/signout), firebase gives us the user as argument
    auth.onAuthStateChanged((user) => {
      setUser(user)
      setLoading(false) // no longer loading
      if(user) history.push('/chats')  // renavigate to chat app only if user exists
    })
  }, [user, history]) // call function whenever we add user or renavigate

  // when working with react context, need value for context provider, it is the value of your context
  const value = { user }  // give all children of context provider access to user state

  return (
    // need context provider to wrap code that needs access to info from the context
    // everything inside the provider has access to the value prop
    <AuthContext.Provider value={value}>
      {/* context is good for passing the context value prop down to all the provider's children without having
       to declare the value as a prop for each children. it's like a global state for children */}
      {/* inline-if, conditional rendering: only show children if not loading */}
      {!loading && children}
    </AuthContext.Provider>
  )

}