import style from './ItemButtons.module.scss'
import StarBorderIcon from '@mui/icons-material/StarBorder'
type DivProps = JSX.IntrinsicElements['div']

export type FavoriteButtonProps = {
  isActive: boolean
  addFavoriteCB: () => void
} & DivProps

export const FavoriteButton = ({
  isActive,
  addFavoriteCB,
  ...props
}: FavoriteButtonProps) => (
  <div
    className={`${style.FavoriteButton} ${isActive ? style.active : ''}`}
    onClick={e => {
      e.stopPropagation()
      addFavoriteCB()
    }}
    {...props}
  >
    <StarBorderIcon style={{ fontSize: 15 }} />
  </div>
)
