import React from 'react'
import { SortEndHandler } from 'react-sortable-hoc'
import arrayMove from 'array-move'
import style from './Favorite.module.scss'
import { FavoriteItemList } from './FavoriteItemList'

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
  const onSortEnd: SortEndHandler = ({ oldIndex, newIndex }) => {
    onChange(arrayMove(favoriteList, oldIndex, newIndex))
  }

  return (
    <div className={style.Favorite}>
      <div>お気に入り</div>
      <FavoriteItemList
        items={favoriteList}
        onClickItem={onClickItem}
        activeItem={activeItem}
        deleteFavoriteCB={deleteFavoriteCB}
        onSortEnd={onSortEnd}
        distance={5}
      />
    </div>
  )
}

export default Favorite
