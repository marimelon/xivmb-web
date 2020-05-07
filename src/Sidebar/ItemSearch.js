import React, { Component, useState, useEffect } from 'react';
import style from './ItemSearch.module.scss';
import SidebarItem from "./SidebarItem";

const ItemSearchInput = ({ value, changeTextCB }) => (
    <div className={style.inputwrap}>
        <input
            className={style.input}
            placeholder="  アイテム検索"
            value={value}
            onChange={(e) => { changeTextCB(e.target.value) }}
        />
        <div className={style.inputclear} onClick={() => { changeTextCB('') }}>✖</div>
    </div>
);


const FavoriteButton = ({ isActive, addFavoriteCB }) => (
    <div className={`${style.FavoriteButton} ${isActive ? style.active : ''}`}
        onClick={(e) => { e.stopPropagation(); addFavoriteCB() }}>☆
    </div>
);

const ItemSearchResult = ({ value, onClick, activeItem, favoriteList, addFavoriteCB }) => {
    const identifier = 'itemsearch'
    const [result_ids, setResult] = useState({});
    useEffect(() => {
        window.ItemSearchResult_Flag = value;
        if (value === "") {
            setResult([]);
            return;
        }
        var r = {};
        for (const key in window.ItemList) {
            if (window.ItemSearchResult_Flag !== value) {
                return;
            }
            if (window.ItemList[key].indexOf(value) !== -1) {
                r[key] = window.ItemList[key];
            }
        }
        if (window.ItemSearchResult_Flag === value) {
            setResult(r);
        }
    }, [value]);

    return (
        <div className={style.ItemSearchResult}>
            {Object.keys(result_ids).map(key =>
                <SidebarItem
                    key={key}
                    customStyles={style.SidebarItem}
                    itemid={key}
                    name={result_ids[key]}
                    onClick={(id, name) => { onClick(identifier, id, name) }}
                    isActive={activeItem === identifier + key}
                    children={<FavoriteButton
                        isActive={favoriteList.findIndex(({ id }) => id === key) !== -1}
                        addFavoriteCB={() => { addFavoriteCB(key, result_ids[key]) }}
                    />}
                />
            )}
        </div>
    );
};

class ItemSearch extends Component {
    constructor(props) {
        super(props);
        this.state = { value: "" }
        this.textChange = this.textChange.bind(this);
    }

    textChange(value) {
        this.setState({ value: value });
    }

    render() {
        const { favoriteList, onClickItem, activeItem, addFavoriteCB } = this.props;
        return (
            <div className={style.ItemSearch}>
                <ItemSearchInput value={this.state.value} changeTextCB={this.textChange} />
                <ItemSearchResult value={this.state.value} onClick={onClickItem} activeItem={activeItem} favoriteList={favoriteList} addFavoriteCB={addFavoriteCB} />
            </div>
        );
    }
}

export default ItemSearch