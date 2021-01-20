import React, { useState } from 'react';
import style from './ViewApp.module.scss';
import ItemHeader from './MainView/ItemHeader';
import WorldTab from './MainView/WorldTab';
import MarketTable from './MainView/MarketTable';
import HistoryTable from './MainView/HistoryTable';
import './css/tabulator.css';
import './css/my_tabulator.css';
import { useHistory, useRouteMatch } from 'react-router-dom';

type State = { itemid: number, itemname: string };

const ViewApp: React.FC = () => {
    const history = useHistory<State>();
    const match = useRouteMatch<{ itemid: string }>();
    const itemid = Number(match.params.itemid);
    const [state, setState] = useState({ itemid: itemid, itemname: window.ItemList.get(Number(itemid)) ?? "??" });
    const [world, setWorld] = useState("Elemental");

    history.listen(location => {
        if (location.state === undefined) {
            const itemid = Number(location.pathname.slice(1));
            setState({ itemid: itemid, itemname: window.ItemList.get(itemid) ?? "??" });
        }
        else {
            setState(location.state);
        }
    });

    document.title = state.itemname;

    return (
        <div className={style.ViewApp}>
            <ItemHeader itemid={state.itemid} itemname={state.itemname} />
            <WorldTab currentTabType={world} onClick={setWorld} />
            <div className={style.TablesView}>
                <MarketTable itemid={state.itemid} world={world} styleClass={style.MarketTable} />
                <HistoryTable itemid={state.itemid} world={world} styleClass={style.HistoryTable} />
            </div>
        </div>
    );
}

export default ViewApp;
