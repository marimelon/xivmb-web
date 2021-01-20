import React, { useState } from 'react';
import style from './ItemSearch.module.scss';
import { ItemSearchInput } from './ItemSearchInput';
import { ItemSearchResult } from './ItemSearchResult';

interface Props {
    favoriteList: FavoriteItem[],
    onClickItem: (parent: string, itemid: number, name: string) => void,
    activeItem?: string,
    addFavoriteCB: (itemid: number, name: string) => void
}

const ItemSearch: React.FC<Props> = (props) => {
    const [value, setValue] = useState<string>("");

    const onChangeText = (newValue: string) => {
        setValue(newValue);
    }

    return (
        <div className={style.ItemSearch}>
            <ItemSearchInput value={value} changeTextCB={onChangeText} />
            <ItemSearchResult
                value={value}
                onClick={props.onClickItem}
                activeItem={props.activeItem}
                favoriteList={props.favoriteList}
                addFavoriteCB={props.addFavoriteCB} />
        </div>);
}

export default ItemSearch;
