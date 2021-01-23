import moment, { Moment } from 'moment'
import React, { Component } from 'react'
import { ReactTabulator } from 'react-tabulator'
import 'react-tabulator/lib/styles.css'
import { HistoryResponse } from '../@types/historyResponse'
import style from './HistoryTable.module.scss'

interface HistoryTableHeaderProps {
  updatedDate?: Moment
}

const HistoryTableHeader: React.FC<HistoryTableHeaderProps> = ({
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
const separate = (num: number) =>
  String(num).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, '$1,')
const get_url = (itemid: number) =>
  `${process.env.REACT_APP_API_URL}/data/history?q=${itemid}&limit=500`
const columns = [
  {
    title: 'World',
    field: 'world',
    width: 92,
    responsive: 0,
    headerSort: false,
  },
  {
    title: 'HQ',
    field: 'hq',
    cssClass: style.HQ,
    resizable: false,
    width: 48,
    responsive: 0,
    align: 'center',
    headerSort: false,
    formatter: function (cell: any, _formatterParams: any, _onRendered: any) {
      return cell.getValue() === 1
        ? `<img id="table-hqicon" src="${process.env.PUBLIC_URL}/images/hqicon.png">`
        : ''
    },
  },
  {
    title: 'Price',
    field: 'sellPrice',
    cssClass: style.Price,
    resizable: false,
    width: 110,
    responsive: 0,
    align: 'right',
    headerSort: false,
    formatter: (cell: any, _: any, __: any) => separate(cell.getValue()),
  },
  {
    title: 'QTY',
    field: 'stack',
    cssClass: style.QTY,
    resizable: false,
    width: 56,
    align: 'right',
    responsive: 0,
    headerSort: false,
  },
  {
    title: 'Buyer',
    field: 'buyCharacterName',
    resizable: true,
    minWidth: 80,
    responsive: 1,
    headerSort: false,
  },
  {
    title: 'Date',
    field: 'buyDate',
    sorter: 'number',
    resizable: false,
    widthGrow: 1,
    responsive: 0,
    minWidth: 100,
    headerSort: false,
    formatter: function (cell: any, _formatterParams: any, _onRendered: any) {
      return moment(cell.getValue()).format('MM/DD\xa0HH:mm')
    },
  },
]

type HistoryTableState = { updatedDate?: Moment }
interface Props {
  itemid: number
  world: string
  header_children?: JSX.Element
  styleClass?: string
}
class HistoryTable extends Component<Props, HistoryTableState> {
  ref: any
  constructor(props: Props) {
    super(props)
    this.ref = React.createRef()
    this.state = { updatedDate: undefined }
  }
  render() {
    const { itemid, world, header_children } = this.props
    if (this.ref.current?.table) {
      const table = this.ref.current.table
      if (table.getAjaxUrl() !== get_url(itemid)) {
        table.setData(get_url(itemid))
      }
      const other_filters = table
        .getFilters()
        .filter((filrer: any) => filrer.field !== 'world')
      table.setFilter(other_filters)
      if (world !== 'Elemental') {
        table.addFilter('world', '=', world)
      }
    }
    return (
      <div className={`${style.HistoryTable} ${this.props.styleClass}`}>
        <HistoryTableHeader updatedDate={this.state.updatedDate}>
          {header_children}
        </HistoryTableHeader>
        <ReactTabulator
          ref={this.ref}
          options={{
            height: '100%',
            ajaxURL: get_url(itemid),
            progressiveRender: true,
            responsiveLayout: 'hide',
            placeholder: 'no data',
            initialSort: [{ column: 'buyDate', dir: 'desc' }],
            ajaxResponse: (
              _url: any,
              _params: any,
              response: HistoryResponse
            ) => {
              if (response.length) {
                let date = moment.unix(response[0].Updated)
                this.setState({ updatedDate: date })
              }
              return response
            },
            rowFormatter: (row: any, _data: any) => {
              row.getElement().style['height'] = '2.7rem'
              row
                .getElement()
                .querySelectorAll('.tabulator-cell')
                .forEach((e: any) => (e.style['height'] = '2.7rem'))
            },
          }}
          columns={columns}
          data={[]}
          layout={'fitColumns'}
        />
      </div>
    )
  }
}
export default HistoryTable
