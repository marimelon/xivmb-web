import React from 'react'
import style from './ItemButtons.module.scss'

type DivProps = JSX.IntrinsicElements['div']
type DeleteFavoriteButtonProps = {
  deleteFavoriteCB: () => void
  className?: string
} & Omit<DivProps, 'onClick'>

export const DeleteFavoriteButton: React.FC<DeleteFavoriteButtonProps> = ({
  deleteFavoriteCB,
  className,
  ...props
}) => (
  <div
    className={`${style.DeleteFavoriteButton} ${className}`}
    onClick={e => {
      e.stopPropagation()
      deleteFavoriteCB()
    }}
    {...props}
  >
    ✖
  </div>
)

DeleteFavoriteButton.defaultProps = {
  className: '',
}
