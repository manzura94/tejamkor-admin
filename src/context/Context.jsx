import React, { createContext, useState } from 'react'

export const UserContext =createContext()

const Context = ({children}) => {
    const [user, setUser]=useState(localStorage.getItem('user') || false)
  return (
    <UserContext.Provider value={{user, setUser}}>
      {children}
    </UserContext.Provider>
  )
}

export default Context