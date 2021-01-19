import React, { Component } from 'react';
// @ts-expect-error ts-migrate(6142) FIXME: Module './SidebarItem' was resolved to '/root/XIVM... Remove this comment to see the full error message
import SidebarItem from "./SidebarItem";
import { SortableContainer, SortableElement } from 'react-sortable-hoc';
import arrayMove from 'array-move';
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module './Favorite.module.scss' or its... Remove this comment to see the full error message
import style from './Favorite.module.scss';
// @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
const DeleteFavoriteButton = ({ deleteFavoriteCB }: any) => (<div className={style.DeleteFavoriteButton} onClick={(e) => { e.stopPropagation(); deleteFavoriteCB(); }}>✖
    </div>);
const SortableItem = SortableElement(({ value, onClickItem, activeItem, children }: any) => {
    const isActive = activeItem === 'fav' + value.id;
    // @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
    return (<SidebarItem itemid={value.id} name={value.name} customStyles={`${style.SidebarItem} ${isActive ? style.active : ''}`} onClick={(id: any, name: any) => { onClickItem('fav', id, name); }} isActive={isActive}>
            {children}
        </SidebarItem>);
});
const SortableList = SortableContainer(({ items, onClickItem, activeItem, deleteFavoriteCB }: any) => {
    // @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
    return (<div>
            {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
            {items.map((value: any, index: any) => (<SortableItem key={value.id} index={index} value={value} onClickItem={onClickItem} activeItem={activeItem}>
                    {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                    <DeleteFavoriteButton deleteFavoriteCB={() => { deleteFavoriteCB(value.id); }}/>
                </SortableItem>))}
        </div>);
});
type FavoriteState = any;
class Favorite extends Component<{}, FavoriteState> {
    constructor(props: {}) {
        super(props);
        this.state = { items: (props as any).favoriteList };
    }
    static getDerivedStateFromProps(nextProps: any, prevState: any) {
        return { items: nextProps.favoriteList };
    }
    onSortEnd = ({ oldIndex, newIndex }: any) => {
        (this.props as any).onChange(arrayMove(this.state.items, oldIndex, newIndex));
    };
    render() {
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'onClickItem' does not exist on type 'Rea... Remove this comment to see the full error message
        const { onClickItem, activeItem, deleteFavoriteCB } = this.props;
        // @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
        return (<div className={style.Favorite}>
                {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                <div>お気に入り</div>
                {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                <SortableList items={this.state.items} onClickItem={onClickItem} activeItem={activeItem} deleteFavoriteCB={deleteFavoriteCB} onSortEnd={this.onSortEnd} distance={5}/>
            </div>);
    }
}
export default Favorite;
