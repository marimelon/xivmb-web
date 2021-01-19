import React, { Component } from 'react';
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module './TablesView.module.scss' or i... Remove this comment to see the full error message
import style from './TablesView.module.scss'
// @ts-expect-error ts-migrate(6142) FIXME: Module './MarketTable' was resolved to '/root/XIVM... Remove this comment to see the full error message
import MarketTable from './MarketTable'
// @ts-expect-error ts-migrate(6142) FIXME: Module './HistoryTable' was resolved to '/root/XIV... Remove this comment to see the full error message
import HistoryTable from './HistoryTable'

import TrendingUpIcon from '@material-ui/icons/TrendingUp';

class TablesView extends Component {
    history_table_ref: any;
    market_table_ref: any;
    constructor(props: any) {
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
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'itemid' does not exist on type 'Readonly... Remove this comment to see the full error message
        const {itemid,world,isShownChart,isShownChartCB} = this.props;
        var history_header_children = (
            // @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
            <div className={style.ShowTrandButton} onClick={() => { isShownChartCB(!isShownChart) }}>
                {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                <TrendingUpIcon color={isShownChart ? 'primary' : 'secondary'} />
            </div>);
        return (
            // @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
            <div className={style.TablesView}>
                {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                <MarketTable ref={this.market_table_ref} itemid={itemid} world={world} style={style.MarketTable}/>
                {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                <HistoryTable ref={this.history_table_ref} itemid={itemid} world={world} style={style.HistoryTable}
                    header_children={history_header_children}/>
            </div>
        );
    }
}

export default TablesView;