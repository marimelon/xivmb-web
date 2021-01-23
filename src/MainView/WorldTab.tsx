import React from 'react'
import style from './WorldTab.module.scss'

interface Props {
  currentTabType: string
  onClick: (item: string) => void
}

const WorldTab = React.memo(({ currentTabType, onClick }: Props) => {
  const worldlist = [
    'Elemental',
    'Atomos',
    'Aegis',
    'Carbuncle',
    'Garuda',
    'Gungnir',
    'Kujata',
    'Ramuh',
    'Tonberry',
    'Typhon',
    'Unicorn',
  ]
  return (
    <nav>
      <ul className={style.WorldTab}>
        {worldlist.map(item => (
          <li
            key={item}
            className={`${style.navitem} ${
              currentTabType === item ? style.active : ''
            }`}
            onClick={() => onClick(item)}>
            <div>{item}</div>
          </li>
        ))}
      </ul>
    </nav>
  )
})

export default WorldTab
