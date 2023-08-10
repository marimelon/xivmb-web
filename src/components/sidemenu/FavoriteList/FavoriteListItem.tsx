import { ComponentProps } from 'react'

import { Item } from '@/types/item'

import { SideMenuItem } from '../SideMenuItem'
import cssStyle from './FavoriteListItem.module.scss'

type DeleteFavoriteButtonProps = {
  onClick: () => void
}

export const DeleteFavoriteButton = ({
  onClick,
}: DeleteFavoriteButtonProps) => (
  <div
    className={cssStyle.DeleteFavoriteButton}
    onClick={e => {
      e.stopPropagation()
      onClick()
    }}
  >
    ✖
  </div>
)

type FavoriteListItemProps = {
  onDelete: (item: Item) => void
} & Omit<ComponentProps<typeof SideMenuItem>, 'children'>

export const FavoriteListItem = ({
  onDelete,
  ...props
}: FavoriteListItemProps) => {
  const handleDelete = () => {
    onDelete(props.item)
  }

  return (
    <SideMenuItem {...props}>
      <DeleteFavoriteButton onClick={handleDelete} />
    </SideMenuItem>
  )
}
