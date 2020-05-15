import React, { Component } from 'react';
//import style from './App.module.css';
import style from './ViewApp.module.scss';
import { ItemIconURL } from './Common/ItemIcon';
import changeFavicon from './Common/changeFavicon';

import ItemHeader from './MainView/ItemHeader';
import WorldTab from './MainView/WorldTab';
import MarketTable from './MainView/MarketTable';
import HistoryTable from './MainView/HistoryTable';

import './css/tabulator.css';
import './css/my_tabulator.css';

class ViewApp extends Component {
    constructor(props) {
        super(props);
        const { itemid } = props.match.params
        this.state = { itemid: Number(itemid), itemname: window.ItemList[Number(itemid)],currentWorldTab: "Elemental" };
        this.changeItem = this.changeItem.bind(this);
        this.unlisten = props.history.listen((location) => {
            if (location.state === undefined) {
                var itemid = Number(location.pathname.slice(1));
                this.setState({ itemid: itemid, itemname: window.ItemList[itemid] });
            }
            else {
                this.setState(location.state);
            }
        });
        this.tabChange = this.tabChange.bind(this);
    }
    componentWillUnmount() {
        this.unlisten();
    }

    changeItem(itemid, itemname) {
        this.props.history.push({ pathname: `/${itemid}`, state: { itemid: itemid, itemname: itemname } });
    }

    tabChange(tabtype) {
        this.setState({ currentWorldTab: tabtype });
    }

    render() {
        changeFavicon(ItemIconURL(this.state.itemid));
        document.title = this.state.itemname;
        console.log(style.ViewApp);
        return (
            <div className={style.ViewApp}>
                <ItemHeader itemid={this.state.itemid} itemname={this.state.itemname} />
                <WorldTab currentTabType={this.state.currentWorldTab} onClick={this.tabChange} />
                <div className={style.TablesView}>
                <MarketTable itemid={this.state.itemid} world={this.state.currentWorldTab} style={style.MarketTable}/>
                <HistoryTable itemid={this.state.itemid} world={this.state.currentWorldTab} style={style.HistoryTable}/>
                </div>
            </div>
        );
    }
}

export default ViewApp;
