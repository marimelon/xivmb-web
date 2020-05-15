import React, { Component } from 'react';
import style from './TablesView.module.scss'
import MarketTable from './MarketTable'
import HistoryTable from './HistoryTable'

import TrendingUpIcon from '@material-ui/icons/TrendingUp';

class TablesView extends Component {
    constructor(props) {
        super(props);
        this.market_table_ref = React.createRef();
        this.history_table_ref = React.createRef();
    }

    getMarketTableRef(){
        return this.market_table_ref
    }

    getHistoryTableRef(){
        return this.history_table_ref
    }

    render() {
        const {itemid,world,isShownChart,isShownChartCB} = this.props;
        var history_header_children = (
            <div className={style.ShowTrandButton} onClick={() => { isShownChartCB(!isShownChart) }}>
                <TrendingUpIcon color={isShownChart ? 'primary' : 'secondary'} />
            </div>);
        return (
            <div className={style.TablesView}>
                <MarketTable ref={this.market_table_ref} itemid={itemid} world={world} style={style.MarketTable}/>
                <HistoryTable ref={this.history_table_ref} itemid={itemid} world={world} style={style.HistoryTable}
                    header_children={history_header_children}/>
            </div>
        );
    }
}

export default TablesView;