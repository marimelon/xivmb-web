import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from '@dnd-kit/core'
import {
  SortableContext,
  arrayMove,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'

import { Item } from '@/types/item'

import { useFavorite } from '../../../client/firebase/favorite'
import { FavoriteListItem } from './FavoriteListItem'

export const SortableItem = ({ item }: { item: Item }) => {
  const { delete: deleteFav } = useFavorite()
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: item.id })

  const style = {
    // border: '1px solid #ddd',
    // padding: '0.5rem 1rem',
    // marginBottom: '0.5rem',
    // backgroundColor: '#fafafa',
    // cursor: 'move',
    listStyle: 'none',
    transform: CSS.Transform.toString(transform),
    transition,
  }

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
      <FavoriteListItem
        item={item}
        onDelete={item => {
          deleteFav(item.id)
        }}
      />
    </div>
  )
}

export const FavoriteList = () => {
  const { items, update } = useFavorite()

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  )

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event

    if (!over) {
      return
    }

    if (active.id !== over.id) {
      const oldIndex = items.findIndex(v => v.id === active.id)
      const newIndex = items.findIndex(v => v.id === over.id)
      update(arrayMove(items, oldIndex, newIndex))
    }
  }

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
    >
      <SortableContext items={items} strategy={verticalListSortingStrategy}>
        <div style={{ width: '100%', padding: 0, margin: 0 }}>
          {items.map(item => (
            <SortableItem key={item.id} item={item} />
          ))}
        </div>
      </SortableContext>
    </DndContext>
  )
}
