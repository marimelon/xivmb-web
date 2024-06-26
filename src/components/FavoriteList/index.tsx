import { use } from 'react'

import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  useSensor,
  useSensors,
  DragEndEvent,
  MouseSensor,
} from '@dnd-kit/core'
import { Props as DndContextProps } from '@dnd-kit/core/dist/components/DndContext/DndContext'
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { Card, VStack } from '@yamada-ui/react'

import { FavoriteContext } from '../../api/firebaseHooks'
import { Item } from '../../types/item'
import { SidebarItem } from '../SidebarItem'

const SortableItem = ({ item }: { item: Item }) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: item.id })

  return (
    <div
      ref={setNodeRef}
      style={{
        listStyle: 'none',
        transform: CSS.Transform.toString(transform),
        transition,
      }}
      {...attributes}
      {...listeners}>
      <Card height={10} variant="outline">
        <SidebarItem item={item} />
      </Card>
    </div>
  )
}

type Props = {
  items: Item[]
}

const TypedDndContext = DndContext as React.FC<DndContextProps>

export const FavoriteLIst = ({ items }: Props) => {
  const { update } = use(FavoriteContext)
  const sensors = useSensors(
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
    useSensor(MouseSensor, { activationConstraint: { distance: 5 } }),
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
    <div style={{ width: '100%' }}>
      <TypedDndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}>
        <SortableContext items={items} strategy={verticalListSortingStrategy}>
          <VStack gap={1}>
            {items.map(item => (
              <SortableItem key={item.id} item={item} />
            ))}
          </VStack>
        </SortableContext>
      </TypedDndContext>
    </div>
  )
}
