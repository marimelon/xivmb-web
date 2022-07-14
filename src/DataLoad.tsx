import React, { useEffect, useState } from 'react'
import { SetupItemList } from './Common/database'
import LoadingPage from './Common/LoadingPage'

type Props = {
  children: React.ReactNode
}

const DataLoad = ({ children }: Props) => {
  const [initDB, setInitDB] = useState(false)

  useEffect(() => {
    SetupItemList()
      .then(event => {
        setInitDB(true)
      })
      .catch(event => {
        console.log(event)
        alert('Database error: ')
      })
  }, [])

  return <React.Fragment>{initDB ? children : <LoadingPage />}</React.Fragment>
}

export default DataLoad
