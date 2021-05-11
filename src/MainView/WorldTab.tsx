import MenuItem from '@material-ui/core/MenuItem'
import Select from '@material-ui/core/Select'
import { makeStyles } from '@material-ui/core/styles'
import React from 'react'
import useDimensions from 'react-cool-dimensions'
import { Tab } from '../Components/Tab/Tab'
import style from './WorldTab.module.scss'

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

interface Props {
  currentTabType: string
  onClick: (item: string) => void
}

const WorldTabNomal = React.memo(({ currentTabType, onClick }: Props) => {
  return (
    <Tab
      items={worldlist.map(value => ({ value: value, display: value }))}
      value={currentTabType}
      onChange={onClick}
    />
  )
})

const useStyles = makeStyles({
  icon: {
    color: '#CCCCCC',
  },
  select: {
    '& ul': {
      backgroundColor: '#192734',
    },
    '& li': {
      color: '#CCCCCC',
      fontSize: 12,
    },
    '& li:hover': {
      color: 'rgb(79, 180, 243)',
    },
  },
})

const WorldTabDoropDown = React.memo(({ currentTabType, onClick }: Props) => {
  const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    onClick(event.target.value as string)
  }

  const classes = useStyles()

  return (
    <div className={style.WorldTab}>
      <Select
        disableUnderline
        value={currentTabType}
        onChange={handleChange}
        className={style.CompactWorldTab}
        classes={{ icon: classes.icon }}
        MenuProps={{ classes: { paper: classes.select } }}>
        {worldlist.map(item => (
          <MenuItem key={item} value={item}>
            {item}
          </MenuItem>
        ))}
      </Select>
    </div>
  )
})

const WorldTab = (props: Props) => {
  const { ref, currentBreakpoint } = useDimensions<HTMLDivElement>({
    // COMPACT : 0px - 759px , FULL : 760px ~
    breakpoints: { COMPACT: 0, FULL: 760 },
    updateOnBreakpointChange: true,
  })
  return (
    <div ref={ref}>
      {currentBreakpoint === 'COMPACT' && (
        <WorldTabDoropDown
          currentTabType={props.currentTabType}
          onClick={props.onClick}
        />
      )}
      {currentBreakpoint === 'FULL' && (
        <WorldTabNomal
          currentTabType={props.currentTabType}
          onClick={props.onClick}
        />
      )}
    </div>
  )
}

export default WorldTab
