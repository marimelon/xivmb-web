import React, { Component, useState, useEffect } from 'react';
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module './ItemSearch.module.scss' or i... Remove this comment to see the full error message
import style from './ItemSearch.module.scss';
// @ts-expect-error ts-migrate(6142) FIXME: Module './SidebarItem' was resolved to '/root/XIVM... Remove this comment to see the full error message
import SidebarItem from "./SidebarItem";
// @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
const ItemSearchInput = ({ value, changeTextCB }: any) => (<div className={style.inputwrap}>
        {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
        <input className={style.input} placeholder="  アイテム検索" value={value} onChange={(e) => { changeTextCB(e.target.value); }}/>
        {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
        <div className={style.inputclear} onClick={() => { changeTextCB(''); }}>✖</div>
    </div>);
// @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
const FavoriteButton = ({ isActive, addFavoriteCB }: any) => (<div className={`${style.FavoriteButton} ${isActive ? style.active : ''}`} onClick={(e) => { e.stopPropagation(); addFavoriteCB(); }}>☆
    </div>);
const ItemSearchResult = ({ value, onClick, activeItem, favoriteList, addFavoriteCB }: any) => {
    const identifier = 'itemsearch';
    const [result_ids, setResult] = useState({});
    useEffect(() => {
        (window as any).ItemSearchResult_Flag = value;
        if (value === "") {
            setResult([]);
            return;
        }
        var r = {};
        var values = value.split(/[\u{20}\u{3000}]/u);
        for (const key in (window as any).ItemList) {
            if ((window as any).ItemSearchResult_Flag !== value) {
                return; //検索ワードが変更された時検索を中止
            }
            if (values.every((elm: any) => (window as any).ItemList[key].indexOf(elm) !== -1)) {
                // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
                r[key] = (window as any).ItemList[key];
            }
        }
        if ((window as any).ItemSearchResult_Flag === value) {
            setResult(r);
        }
    }, [value]);
    // @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
    return (<div className={style.ItemSearchResult}>
            {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
            {Object.keys(result_ids).map(key => <SidebarItem key={key} customStyles={style.SidebarItem} itemid={key} name={result_ids[key]} onClick={(id: any, name: any) => { onClick(identifier, id, name); }} isActive={activeItem === identifier + key} children={<FavoriteButton isActive={favoriteList.findIndex(({ id }: any) => id === key) !== -1} addFavoriteCB={() => { addFavoriteCB(key, result_ids[key]); }}/>}/>)}
        </div>);
};
type ItemSearchState = any;
class ItemSearch extends Component<{}, ItemSearchState> {
    constructor(props: {}) {
        super(props);
        this.state = { value: "" };
        this.textChange = this.textChange.bind(this);
    }
    textChange(value: any) {
        this.setState({ value: value });
    }
    render() {
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'favoriteList' does not exist on type 'Re... Remove this comment to see the full error message
        const { favoriteList, onClickItem, activeItem, addFavoriteCB } = this.props;
        // @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
        return (<div className={style.ItemSearch}>
                {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                <ItemSearchInput value={this.state.value} changeTextCB={this.textChange}/>
                {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                <ItemSearchResult value={this.state.value} onClick={onClickItem} activeItem={activeItem} favoriteList={favoriteList} addFavoriteCB={addFavoriteCB}/>
            </div>);
    }
}
export default ItemSearch;
