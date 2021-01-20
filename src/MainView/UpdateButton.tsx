import React, { useState, useEffect } from "react";
import style from './MainView.module.scss';
import firebase from '../Common/firebase';

interface Props {
    status: number,
    callback: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void
}

export const UpdateButton = ({ status, callback }: Props) => {
    const [isLogin, setIsLogin] = useState(false);
    useEffect(() => {
        firebase.auth().onAuthStateChanged(user => {
            if (user) {
                setIsLogin(true);
            }
        });
    }, []);
    const MarketUpdateButtonStateStyle = (() => {
        switch (status) {
            case 1:
                return style.loading;
            case 2:
                return style.completed;
            default:
                return '';
        }
    })();
    const MarketUpdateButtonProgressBarStyle = (() => {
        switch (status) {
            case 2:
            case 3:
                return style.active;
            default:
                return '';
        }
    })();
    if (isLogin) {
        return (
            <button
                className={`${style.MarketUpdateButton} ${MarketUpdateButtonStateStyle}`}
                disabled={status !== 0}
                onClick={callback}>
                <span className={`${style.ProgressBar} ${MarketUpdateButtonProgressBarStyle}`} />
            </button>);
    }
    else {
        return <div></div>;
    }
};