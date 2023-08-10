import StarBorderIcon from '@mui/icons-material/StarBorder'

import style from './FavoriteButton.module.scss'

type DivProps = JSX.IntrinsicElements['div']

export type FavoriteButtonProps = {
  active?: boolean
  onClick: () => void
} & DivProps

export const FavoriteButton = ({
  active,
  onClick,
  ...props
}: FavoriteButtonProps) => (
  <div
    className={`${style.FavoriteButton} ${active ? style.active : ''}`}
    onClick={e => {
      e.stopPropagation()
      onClick()
    }}
    {...props}
  >
    <StarBorderIcon style={{ fontSize: 15 }} />
  </div>
)
