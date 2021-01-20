import React, { useState, useRef } from 'react';
import { useHistory } from 'react-router';
import firebase from '../Common/firebase';
import LoginHeader from './LoginHeader';
import ItemHeader from './ItemHeader';
import WorldTab from './WorldTab';
import TablesView from './TablesView';
import HistoryChart from './HistoryChart';
import Collapse from '@material-ui/core/Collapse';
import style from './MainView.module.scss';

import { UpdateButton } from './UpdateButton';

interface Props {
    itemid: number,
    itemname: string
}

const MainView: React.FC<Props> = ({ itemid, itemname }) => {
    const [world, setWorld] = useState("Elemental");
    const [updateButtonState, setUpdateButtonState] = useState(0);
    const [isShownHistoryChart, setIsShownHistoryChart] = useState(false);
    const [rateLimit, setRateLimit] = useState<number>();
    const history = useHistory();
    const TablesViewRef = useRef<TablesView | null>(null);

    const onTabChange = (tabtype: string) => {
        setWorld(tabtype);
    }
    const onClickHistoryChartButton = (value: boolean) => {
        setIsShownHistoryChart(value);
    }

    const onClickMarketUpdateButton = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        event.currentTarget.blur();
        setUpdateButtonState(1);
        firebase.auth().onAuthStateChanged(user => {
            if (user) {
                user.getIdToken(true)
                    .then(idToken => {
                        if (rateLimit === undefined) {
                            fetch(`${process.env.REACT_APP_API_URL}/rate_limit`, {
                                headers: { "Authorization": 'Bearer ' + idToken }
                            }).then(res => res.text())
                                .then(res => setRateLimit(Number(res)));
                        }
                        const _itemid = itemid;
                        fetch(`${process.env.REACT_APP_API_URL}/newdata/market/${itemid}`, {
                            headers: { "Authorization": 'Bearer ' + idToken }
                        }).then(res => {
                            if (!res.ok) {
                                throw Error(res.statusText);
                            }
                            return res.json();
                        }).then(res => {
                            setUpdateButtonState(2);
                            setTimeout(() => { setUpdateButtonState(0); }, (rateLimit ?? 20) * 1000);
                            if (_itemid === itemid) {
                            }
                        }).catch(err => {
                            setUpdateButtonState(0);
                            alert(`更新に失敗しました (${err.message})`);
                        });
                    });
            }
            else {
                history.push('/signin');
            }
        });
    }

    return (
        <div className={style.MainView}>
            <LoginHeader />
            <ItemHeader itemid={itemid} itemname={itemname} />
            <UpdateButton status={updateButtonState} callback={onClickMarketUpdateButton} />
            <WorldTab currentTabType={world} onClick={onTabChange} />
            <Collapse in={isShownHistoryChart}>
                <HistoryChart itemid={itemid} isshown={isShownHistoryChart} />
            </Collapse>
            <TablesView ref={TablesViewRef} itemid={itemid} world={world} isShownChart={isShownHistoryChart} isShownChartCB={onClickHistoryChartButton} />
        </div>);
}

export default MainView;
