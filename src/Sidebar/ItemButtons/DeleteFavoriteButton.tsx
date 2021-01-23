import React from 'react'
import style from './ItemButtons.module.scss'

interface Props {
  deleteFavoriteCB: () => void
  className?: string
}

export const DeleteFavoriteButton: React.FC<Props> = ({
  deleteFavoriteCB,
  className,
}) => (
  <div
    className={`${style.DeleteFavoriteButton} ${className}`}
    onClick={e => {
      e.stopPropagation()
      deleteFavoriteCB()
    }}>
    ✖
  </div>
)

DeleteFavoriteButton.defaultProps = {
  className: '',
}
