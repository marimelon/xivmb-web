import React, { Component } from 'react';
import style from './TablesView.module.scss'
import MarketTable from './MarketTable'
import HistoryTable from './HistoryTable'

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
        const {itemid,world} = this.props;
        return (
            <div className={style.TablesView}>
                <MarketTable ref={this.market_table_ref} itemid={itemid} world={world}/>
                <HistoryTable ref={this.history_table_ref} itemid={itemid} world={world}/>
            </div>
        );
    }
}

export default TablesView;