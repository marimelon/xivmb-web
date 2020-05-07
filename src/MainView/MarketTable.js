import React, { Component } from 'react';
import { ReactTabulator } from 'react-tabulator'
import moment from 'moment'
import 'react-tabulator/lib/styles.css';
import style from './MarketTable.module.scss'

const MarketTableHeader = ({ updatedDate, HQFilterState, HQFilterCallback }) => {
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
            <span style={{ fontSize: "26px" }}>{"Market "}</span>
            <font className={style.MarketUpdatedDate}>
                {updatedDateText}
            </font>
            <span style={{ fontSize: "16px" }}>
                {" Filter "}
            </span>
            <img width="20" height="20"
                alt={"HQIcon"}
                src={`${process.env.PUBLIC_URL}/images/${HQFilterState ? 'hqicon-yellow' : 'hqicon'}.png`}
                onClick={() => { HQFilterCallback(!HQFilterState) }}
            />
        </div>
    );
}

const separate = (num) => (String(num).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, '$1,'));
const get_url = (itemid) => (`${process.env.REACT_APP_API_URL}/data/market?q=${itemid}`);
const get_id = (url) => (Number(url.substr(`${process.env.REACT_APP_API_URL}/data/market?q=`.length)))
const columns = [
    { title: "World", field: "world", width: 92, resizable: true, responsive: 0, sorter: "string", headerSort: false },
    {
        title: "HQ", field: "hq", width: 48, responsive: 0, cssClass: style.HQ,resizable: false, align: "center", headerSort: false,
        formatter: (cell, formatterParams, onRendered) => (
            cell.getValue() === 1 ? `<img id="table-hqicon" src="${process.env.PUBLIC_URL}/images/hqicon.png">` : ""
        ),
    },
    {
        title: "Materia", field: "materia", width: 82, align: "center", resizable: false, headerSort: false, tooltip: function (cell) {
            var str = "";
            const value = cell.getValue();
            if (value === 0) { return; }
            if (value > 0) { str += cell.getData().materia1 + '\n' }
            if (value > 1) { str += cell.getData().materia2 + '\n' }
            if (value > 2) { str += cell.getData().materia3 + '\n' }
            if (value > 3) { str += cell.getData().materia4 + '\n' }
            if (value > 4) { str += cell.getData().materia5 + '\n' }
            return str;
        },
        formatter: (cell, formatterParams, onRendered) => (cell.getValue() === 0 ? "" : cell.getValue()),
    },
    {
        title: "Price", field: "sellPrice", cssClass: style.PriceCell, responsive: 0, width: 115, resizable: false, sorter: "number", align: "right",
    },
    {
        title: "QTY", field: "stack", sorter: "number", width: 56, cssClass: style.QTY, resizable: false, responsive: 0, align: "right", headerSort: false,
    },
    {
        title: "Total", field: "total", sorter: "number", width: 115, cssClass: style.Total, resizable: false, responsive: 0, align: "right",
    },
    {
        title: "", field: "registerTown", width: 28, cssClass: style.RegisterTown, responsive: 0, resizable: false, headerSort: false,
        formatter: (cell, formatterParams, onRendered) => (`<img src="${process.env.PUBLIC_URL}/images/town/${cell.getValue()}.png" width="24" height="24">`)
    },
    {
        title: "Retainer", field: "sellRetainerName", minWidth: 60, headerSort: false
    },
];

const CACHE_MAX_COUNT = 10
class MarketTable extends Component {
    constructor(props) {
        super(props);
        this.ref = React.createRef();
        this.state = { updatedDate: null, hqFilter: false }
        this.datacache = []
    }

    setData(itemid,data) {
        if (this.ref.current?.table) {
            this.ref.current.table.replaceData(data);

            this.datacache.push({ id: itemid, res: data })
            if (this.datacache.length > CACHE_MAX_COUNT) {
                this.datacache.shift();
            }
        }
    }

    render() {
        const { itemid, world } = this.props;
        if (this.ref.current?.table) {
            const table = this.ref.current.table
            //キャッシュ検索
            if (table.getAjaxUrl() !== get_url(itemid)) {
                var index = this.datacache.findIndex(({ id }) => id === itemid);
                if (index !== -1) {
                    table.setData(this.datacache[index].res)
                    this.datacache.splice(index, 1)
                    table.replaceData(get_url(itemid))
                } else {
                    table.setData(get_url(itemid))
                }
            }
            //ワールドフィルター
            const filters = table.getFilters();
            const i = filters.findIndex(({ field }) => field === "world")
            if (i !== -1) {
                table.removeFilter(filters[i].field, filters[i].type, filters[i].value)
            }
            if (world !== 'Elemental') {
                table.addFilter("world", "=", world);
            }
            //NQ/HQフィルター
            if (this.state.hqFilter) {
                table.addFilter("hq", "=", 1);
            } else {
                while(table.getFilters().findIndex(({ field }) => field === "hq") !== -1){
                    table.removeFilter("hq", "=", 1);
                }
            }
        }

        return (
            <div className={style.MarketTable}>
                <MarketTableHeader
                    updatedDate={this.state.updatedDate}
                    HQFilterState={this.state.hqFilter}
                    HQFilterCallback={(value) => { this.setState({ hqFilter: value }) }}
                />
                <ReactTabulator
                    ref={this.ref}
                    options={{
                        height: "100%",
                        ajaxURL: get_url(itemid),
                        progressiveRender: true,
                        placeholder: "Placeholder Data",
                        responsiveLayout: "hide",
                        columnMinWidth: 10,
                        initialSort: [{ column: "sellPrice", dir: "asc" }],
                        dataLoading: (data) => {
                            if (data.length) {
                                let date = moment.unix(data[0].Updated);
                                this.setState({ updatedDate: date });
                            } else {
                                this.setState({ updatedDate: null });
                            }
                            for (var i = 0; i < data.length; i++) {
                                data[i].sellPrice = separate(data[i].sellPrice);
                                data[i].total = separate(data[i].total);
                            }
                        },
                        ajaxResponse: (url, params, response) => {
                            this.datacache.push({ id: get_id(url), res: response })
                            if (this.datacache.length > CACHE_MAX_COUNT) {
                                this.datacache.shift();
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

export default MarketTable;