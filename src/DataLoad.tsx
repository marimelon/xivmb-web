import React, { useEffect, useState } from 'react'
import { IndexedDBFunction } from './Common/database'
import LoadingPage from './Common/LoadingPage'

const DataLoad: React.FC = ({ children }) => {
  const [initDB, setInitDB] = useState(false)

  useEffect(() => {
    IndexedDBFunction()
      .then(event => {
        setInitDB(true)
      })
      .catch(event => {
        alert('Database error: ' + event.target.errorCode)
      })
  }, [])

  return <React.Fragment>{initDB ? children : <LoadingPage />}</React.Fragment>
}

export default DataLoad
