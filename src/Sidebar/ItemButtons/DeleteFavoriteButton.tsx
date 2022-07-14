import style from './ItemButtons.module.scss'

type DivProps = JSX.IntrinsicElements['div']
type DeleteFavoriteButtonProps = {
  deleteFavoriteCB: () => void
  className?: string
} & Omit<DivProps, 'onClick'>

export const DeleteFavoriteButton = ({
  deleteFavoriteCB,
  className,
  ...props
}: DeleteFavoriteButtonProps) => (
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
