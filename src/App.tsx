import React, { useState } from 'react';
import { useHistory, useRouteMatch } from 'react-router-dom';
import style from './App.module.css';
import MainView from "./MainView/MainView";
import Sidebar from "./Sidebar/Sidebar";

type State = { itemid: number, itemname: string };

const App: React.FC = () => {
    const history = useHistory<State>();
    const match = useRouteMatch<{ itemid: string }>();
    const itemid = Number(match.params.itemid);
    const [state, setState] = useState({ itemid: itemid, itemname: window.ItemList.get(Number(itemid)) ?? "??" })
    history.listen(location => {
        if (location.state === undefined) {
            const itemid = Number(location.pathname.slice(1));
            setState({ itemid: itemid, itemname: window.ItemList.get(itemid) ?? "??" });
        }
        else {
            setState(location.state);
        }
    });

    const changeItem = (itemid: number, itemname: string) => {
        history.push({ pathname: `/${itemid}`, state: { itemid: itemid, itemname: itemname } });
    }

    document.title = state.itemname;

    return (
        <div className={style.App}>
            <Sidebar changeItem={changeItem} />
            <MainView itemid={state.itemid} itemname={state.itemname} />
        </div>
    );
}

export default App;
