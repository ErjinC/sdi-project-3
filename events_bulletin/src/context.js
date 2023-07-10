import React, {createContext, useState} from 'react'

const responseContext = createContext()

const ResponseProvider = ({children}) => {
  const [responseBody, setResponseBody] = useState([]);

  return (
    <responseContext.Provider value={ {responseBody, setResponseBody} }>
      {children}
    </responseContext.Provider>
  )
}

export {responseContext, ResponseProvider}