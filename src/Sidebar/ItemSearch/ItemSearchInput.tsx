import React from 'react';
import style from './ItemSearch.module.scss';

interface Props {
    value: string,
    changeTextCB: (text: string) => void
}

export const ItemSearchInput: React.FC<Props> = ({ value, changeTextCB }) => (
    <div className={style.inputwrap}>
        <input
            className={style.input}
            placeholder="  アイテム検索"
            value={value}
            onChange={(e) => { changeTextCB(e.target.value); }} />
        <div className={style.inputclear} onClick={() => { changeTextCB(''); }}>✖</div>
    </div>);