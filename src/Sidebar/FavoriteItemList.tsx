import React from "react";
import { SortableContainer, SortableElement } from "react-sortable-hoc";
import { DeleteFavoriteButton } from "./ItemButtons/DeleteFavoriteButton";
import SidebarItem from "./SidebarItem";
import style from './Favorite.module.scss';

interface SortableItemProps {
    value: FavoriteItem,
    onClickItem: (parent: string, itemid: number, itemname: string) => void,
    activeItem?: string,
    children?: JSX.Element
}

const SortableItem = SortableElement(({ value, onClickItem, activeItem, children }: SortableItemProps) => {
    const isActive = activeItem === 'fav' + value.id;
    return (
        <SidebarItem
            itemid={value.id}
            name={value.name}
            customStyles={`${style.SidebarItem} ${isActive ? style.active : ''}`}
            onClick={(id, name) => { onClickItem('fav', id, name); }}
            isActive={isActive}>
            {children}
        </SidebarItem>);
});

interface Props {
    items: FavoriteItem[],
    onClickItem: (parent: string, itemid: number, itemname: string) => void,
    activeItem?: string,
    deleteFavoriteCB: (itemid: number) => void
}

export const FavoriteItemList = SortableContainer(({ items, onClickItem, activeItem, deleteFavoriteCB }: Props) => {
    return (
        <div>
            {items.map((value, index) => (
                <SortableItem key={value.id} index={index} value={value} onClickItem={onClickItem} activeItem={activeItem}>
                    <DeleteFavoriteButton deleteFavoriteCB={() => { deleteFavoriteCB(value.id); }} className={style.DeleteFavoriteButton} />
                </SortableItem>
            ))}
        </div>);
});