import React, { useEffect, useState } from 'react'
import { get_user } from '../Common/firebase'
import style from './MainView.module.scss'

export type UpdateButtonState = 0 | 1 | 2 | 3

export type UpdateButtonProps = {
  status: UpdateButtonState
  callback: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void
}

export const UpdateButton = ({ status, callback }: UpdateButtonProps) => {
  const [isLogin, setIsLogin] = useState(false)
  useEffect(() => {
    get_user().then(user => {
      if (user) {
        setIsLogin(true)
      }
    })
  }, [])
  const MarketUpdateButtonStateStyle = (() => {
    switch (status) {
      case 1:
        return style.loading
      case 2:
        return style.completed
      default:
        return ''
    }
  })()
  const MarketUpdateButtonProgressBarStyle = (() => {
    switch (status) {
      case 2:
      case 3:
        return style.active
      default:
        return ''
    }
  })()
  if (isLogin) {
    return (
      <button
        className={`${style.MarketUpdateButton} ${MarketUpdateButtonStateStyle}`}
        disabled={status !== 0}
        onClick={callback}
      >
        <span
          className={`${style.ProgressBar} ${MarketUpdateButtonProgressBarStyle}`}
        />
      </button>
    )
  } else {
    return <div></div>
  }
}
