import React from 'react'
import style from './Tab.module.scss'

export type TabItem<T extends string | number> = {
  value: T
  display: React.ReactNode
}

export type TabProps<T extends string | number> = {
  items: TabItem<T>[]
  value: T
  onChange: (value: T) => void
}

export const Tab = <T extends string | number>({
  items,
  value,
  onChange,
}: TabProps<T>) => {
  return (
    <nav>
      <ul className={style.Tab}>
        {items.map(val => {
          return (
            <li
              key={val.value}
              className={`${style.navitem} ${
                val.value === value ? style.active : ''
              }`}
              onClick={() => onChange(val.value)}>
              <div>{val.display}</div>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}
