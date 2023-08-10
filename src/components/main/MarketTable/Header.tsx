import moment, { Moment } from 'moment'
type MarketTableHeaderProps = {
  updatedDate?: Moment
  HQFilterState: boolean
  HQFilterCallback: (ishq: boolean) => void
}

export const MarketTableHeader = ({
  updatedDate,
  HQFilterState,
  HQFilterCallback,
}: MarketTableHeaderProps) => {
  let updatedDateText = ''
  if (updatedDate === undefined) {
    updatedDateText = '( データなし )'
  } else if (moment().diff(updatedDate, 'days') > 0) {
    updatedDateText = `(取得日時 ${updatedDate.format('MM/DD\xa0HH:mm')})`
  } else {
    updatedDateText = `( ${updatedDate.fromNow()} に取得)`
  }

  return (
    <div style={{ height: 40, borderBottom: '1px solid #8899a6' }}>
      <span style={{ fontSize: '26px' }}>{'Market '}</span>
      <span style={{ color: '#a9a9a9', fontSize: 16 }}>{updatedDateText}</span>
      <img
        width="20"
        height="20"
        alt={'HQ'}
        style={{ marginLeft: 4 }}
        src={`/img/${HQFilterState ? 'hqicon-yellow' : 'hqicon'}.png`}
        onClick={() => {
          HQFilterCallback(!HQFilterState)
        }}
      />
    </div>
  )
}
