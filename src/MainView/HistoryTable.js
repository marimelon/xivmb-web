import React, { Component } from 'react';
import { ReactTabulator } from 'react-tabulator'
import moment from 'moment'
import 'react-tabulator/lib/styles.css';
import style from './HistoryTable.module.scss'

import TrendingUpIcon from '@material-ui/icons/TrendingUp';

const HistoryTableHeader = ({ updatedDate,isShownChart,isShownChartCB }) => {
    let updatedDateText = ''
    if (updatedDate == null) {
        updatedDateText = "( データなし )"
    } else {
        if (moment().diff(updatedDate, 'days') > 0) {
            updatedDateText = `(取得日時 ${updatedDate.format('MM/DD\xa0HH:mm')})`
        } else {
            updatedDateText = `( ${updatedDate.fromNow()} に取得)`
        }
    }

    return (
        <div className={style.MarketTableHeader}>
            <span style={{ fontSize: "26px" }}>{"History "}</span>
            <span className={style.HistoryUpdatedDate}>
                {updatedDateText}
            </span>
            <div className={style.ShowTrandButton} onClick={()=>{isShownChartCB(!isShownChart)}}>
                <TrendingUpIcon color={isShownChart?'primary':'secondary'}/>
            </div>
        </div>
    );
}

const separate = (num) => (String(num).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, '$1,'));
const get_url = (itemid) => (`${process.env.REACT_APP_API_URL}/data/history?q=${itemid}&limit=500`);
const columns = [
    { title: "World", field: "world", width: 92, responsive: 0, headerSort: false },
    {
        title: "HQ", field: "hq",cssClass: style.HQ, resizable: false, width: 48, responsive: 0, align: "center", headerSort: false,
        formatter: function (cell, formatterParams, onRendered) {
            return cell.getValue() === 1 ? `<img id="table-hqicon" src="${process.env.PUBLIC_URL}/images/hqicon.png">` : "";
        },

    },
    {
        title: "Price", field: "sellPrice", cssClass: style.Price, resizable: false,  width: 110, responsive: 0, align: "right", headerSort: false,
    },
    {
        title: "QTY", field: "stack", cssClass: style.QTY, resizable: false, width: 56, align: "right", responsive: 0, headerSort: false,
    },
    { title: "Buyer", field: "buyCharacterName", resizable: true, minWidth: 80, responsive: 1, headerSort: false },
    {
        title: "Date", field: "buyDate", sorter: "number", resizable: false, widthGrow: 1, responsive: 0, minWidth: 100, headerSort: false,
        formatter: function (cell, formatterParams, onRendered) {
            return moment(cell.getValue()).format('MM/DD\xa0HH:mm');
        },
    }
];

class HistoryTable extends Component {
    constructor(props) {
        super(props);
        this.ref = React.createRef();
        this.state = { updatedDate: null }
    }
    render() {
        const { itemid, world,isShownChart,isShownChartCB } = this.props;

        if (this.ref.current?.table) {
            const table = this.ref.current.table
            if (table.getAjaxUrl() !== get_url(itemid)) {
                table.setData(get_url(itemid))
            }
            const other_filters = table.getFilters().filter(filrer => filrer.field !== 'world');
            table.setFilter(other_filters);
            if (world !== 'Elemental') {
                table.addFilter("world", "=", world);
            }
        }

        return (
            <div className={style.HistoryTable}>
                <HistoryTableHeader updatedDate={this.state.updatedDate} isShownChart={isShownChart} isShownChartCB={isShownChartCB}/>
                <ReactTabulator
                    ref={this.ref}
                    options={{
                        height: "100%",
                        ajaxURL: get_url(itemid),
                        progressiveRender: true,
                        responsiveLayout: "hide",
                        placeholder: "no data",
                        initialSort: [{ column: "buyDate", dir: "desc" },],
                        dataLoading: (data) => {
                            for (var i = 0; i < data.length; i++) {
                                data[i].sellPrice = separate(data[i].sellPrice);
                            }
                        },
                        ajaxResponse: (url, params, response) => {
                            if (response.length) {
                                let date = moment.unix(response[0].Updated);
                                this.setState({ updatedDate: date });
                            }
                            return response;
                        },
                        rowFormatter: (row, data) => {
                            row.getElement().style['height'] = '2.7rem';
                            row.getElement().querySelectorAll('.tabulator-cell').forEach(e => e.style['height'] = '2.7rem');
                        },
                    }}
                    columns={columns}
                    data={[]}
                    layout={"fitColumns"}
                />
            </div>
        );
    }
}

export default HistoryTable;