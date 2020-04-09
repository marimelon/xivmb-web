import React, { Component } from 'react';
import SidebarItem from "./SidebarItem";
import { SortableContainer, SortableElement } from 'react-sortable-hoc';
import arrayMove from 'array-move';

import style from './Favorite.module.scss';

const DeleteFavoriteButton = ({ deleteFavoriteCB }) => (
    <div className={style.DeleteFavoriteButton}
        onClick={(e) => { e.stopPropagation(); deleteFavoriteCB() }}>✖
    </div>
);

const SortableItem = SortableElement(({ value, onClickItem, activeItem, children }) => {
    const  isActive = activeItem == 'fav' + value.id
    return (
        <SidebarItem
            itemid={value.id}
            name={value.name}
            customStyles={`${style.SidebarItem} ${isActive?style.active:''}`}
            onClick={(id, name) => { onClickItem('fav', id, name) }}
            isActive={isActive}>
            {children}
        </SidebarItem>);
});


const SortableList = SortableContainer(({ items, onClickItem, activeItem, deleteFavoriteCB }) => {
    return (
        <div>
            {items.map((value, index) => (
                <SortableItem
                    key={value.id}
                    index={index}
                    value={value}
                    onClickItem={onClickItem}
                    activeItem={activeItem}>
                    <DeleteFavoriteButton deleteFavoriteCB={() => { deleteFavoriteCB(value.id) }} />
                </SortableItem>
            ))}
        </div>
    );
});



class Favorite extends Component {
    constructor(props) {
        super(props);
        this.state = { items: props.favoriteList }
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        return { items: nextProps.favoriteList }
    }

    onSortEnd = ({ oldIndex, newIndex }) => {
        this.props.onChange(arrayMove(this.state.items, oldIndex, newIndex))
    };

    render() {
        const { onClickItem, activeItem, deleteFavoriteCB } = this.props;
        return (
            <div className={style.Favorite}>
                <div>お気に入り</div>
                <SortableList
                    items={this.state.items}
                    onClickItem={onClickItem}
                    activeItem={activeItem}
                    deleteFavoriteCB={deleteFavoriteCB}
                    onSortEnd={this.onSortEnd}
                    distance={5}
                />
            </div>);
    }
}

export default Favorite;