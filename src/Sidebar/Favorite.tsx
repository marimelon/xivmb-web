import React from 'react'
import style from './Favorite.module.scss'
import { DeleteFavoriteButton } from './ItemButtons/DeleteFavoriteButton'
import { SortableItemList } from './ItemList/ItemList'
import { SidebarItem } from './SidebarItem'

interface Props {
  favoriteList: FavoriteItem[]
  onChange: (newList: FavoriteItem[]) => void
  onClickItem: (parent: string, itemid: number, itemname: string) => void
  activeItem?: string
  deleteFavoriteCB: (itemid: number) => void
}

const Favorite: React.FC<Props> = ({
  favoriteList,
  onChange,
  onClickItem,
  activeItem,
  deleteFavoriteCB,
}) => {
  const _onClickItem = (itemid: number, itemname: string) =>
    onClickItem('favorite', itemid, itemname)
  return (
    <SortableItemList
      items={favoriteList}
      itemRenderer={item => (
        <SidebarItem
          itemid={item.id}
          name={item.name}
          onClick={_onClickItem}
          isActive={activeItem === 'favorite' + item.id}
          className={style.SidebarItem}
        >
          <DeleteFavoriteButton
            deleteFavoriteCB={() => {
              deleteFavoriteCB(item.id)
            }}
            className={style.DeleteFavoriteButton}
            style={
              activeItem === 'favorite' + item.id ? { color: 'black' } : {}
            }
          />
        </SidebarItem>
      )}
      onChange={onChange}
    />
  )
}

export default Favorite
