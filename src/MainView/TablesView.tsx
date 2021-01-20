import React, { Component } from 'react';
import style from './TablesView.module.scss'
import MarketTable from './MarketTable'
import HistoryTable from './HistoryTable'

import TrendingUpIcon from '@material-ui/icons/TrendingUp';

interface Props {
    itemid: number,
    world: string,
    isShownChart: boolean,
    isShownChartCB: (isShowCHart: boolean) => void
}

class TablesView extends Component<Props> {
    market_table_ref: React.RefObject<MarketTable>;
    history_table_ref: React.RefObject<HistoryTable>;

    constructor(props: Props) {
        super(props);
        this.market_table_ref = React.createRef<MarketTable>();
        this.history_table_ref = React.createRef<HistoryTable>();
    }

    getMarketTableRef() {
        return this.market_table_ref
    }

    getHistoryTableRef() {
        return this.history_table_ref
    }

    render() {
        const { itemid, world, isShownChart, isShownChartCB } = this.props;
        const history_header_children = (
            <div className={style.ShowTrandButton} onClick={() => { isShownChartCB(!isShownChart) }}>
                <TrendingUpIcon color={isShownChart ? 'primary' : 'secondary'} />
            </div>);
        return (
            <div className={style.TablesView}>
                <MarketTable ref={this.market_table_ref} itemid={itemid} world={world} styleClass={style.MarketTable} />
                <HistoryTable ref={this.history_table_ref} itemid={itemid} world={world} styleClass={style.HistoryTable}
                    header_children={history_header_children} />
            </div>
        );
    }
}

export default TablesView;