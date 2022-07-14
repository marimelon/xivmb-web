import React, { ReactElement } from 'react'
import {
  arrayMove,
  SortableContainer,
  SortableElement,
  SortableElementProps,
  SortEndHandler,
} from 'react-sortable-hoc'

type SortableItemProps<T> = {
  item: T
  itemRenderer: (item: T) => ReactElement
}

const SortableItem = <T,>({
  item,
  itemRenderer,
  ...props
}: SortableItemProps<T> & SortableElementProps) => {
  const A = SortableElement<SortableItemProps<T>>(
    ({ item, itemRenderer }: SortableItemProps<T>) => {
      return itemRenderer(item)
    }
  )
  return <A item={item} itemRenderer={itemRenderer} {...props} />
}

type ItemListContainerProps = {
  items: FavoriteItem[]
  itemRenderer: (item: FavoriteItem) => ReactElement
}

export const SortableItemListContainer = SortableContainer(
  ({ items, itemRenderer }: ItemListContainerProps) => {
    return (
      <div>
        {items.map((value, index) => (
          <SortableItem
            key={value.id}
            index={index}
            item={value}
            itemRenderer={itemRenderer}
          />
        ))}
      </div>
    )
  }
)

type ItemListProps = ItemListContainerProps & {
  onChange: (newList: FavoriteItem[]) => void
}

export const SortableItemList: React.FC<ItemListProps> = ({
  onChange,
  ...props
}) => {
  const onSortEnd: SortEndHandler = ({ oldIndex, newIndex }) => {
    onChange(arrayMove(props.items, oldIndex, newIndex))
  }

  return (
    <SortableItemListContainer onSortEnd={onSortEnd} distance={1} {...props} />
  )
}
