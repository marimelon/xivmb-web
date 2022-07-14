import moment, { Moment } from 'moment'
import React from 'react'
import 'react-tabulator/lib/styles.css'
import style from './HistoryTable.module.scss'

type HistoryTableHeaderProps = {
  updatedDate?: Moment
  children: React.ReactNode
}

export const HistoryTableHeader: React.FC<HistoryTableHeaderProps> = ({
  updatedDate,
  children,
}) => {
  let updatedDateText = ''
  if (updatedDate === undefined) {
    updatedDateText = '( データなし )'
  } else if (moment().diff(updatedDate, 'days') > 0) {
    updatedDateText = `(取得日時 ${updatedDate.format('MM/DD\xa0HH:mm')})`
  } else {
    updatedDateText = `( ${updatedDate.fromNow()} に取得)`
  }
  return (
    <div className={style.MarketTableHeader}>
      <span style={{ fontSize: '26px' }}>{'History '}</span>
      <span className={style.HistoryUpdatedDate}>{updatedDateText}</span>
      {children}
    </div>
  )
}
