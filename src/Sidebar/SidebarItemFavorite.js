import React, { Component } from 'react';
import style from './SidebarItem.module.scss';

import ItemIcon from "../Common/ItemIcon"

const DeleteFavoriteButton = ({ deleteFavoriteCB }) => (
    <a className={style.DeleteFavoriteButton}
        href="#"
        onClick={(e) => { e.stopPropagation(); deleteFavoriteCB() }}>✖
    </a>
);

class FavoriteItem extends Component {
    static defaultProps = {
        isActive: false,
        onClick: () => { }
    };
    
    render() {
        const {
            itemid,
            name,
            isActive,
            customStyles,
            iconStyle,
            nameStyle,
            onClick,
            children,
        } = this.props;
        return (
            <div className={`${style.SidebarItem} ${customStyles} ${isActive ? style.active : ''}`}
                onClick={() => { onClick(itemid,name) }}>
                <ItemIcon className={`${style.icon} ${iconStyle}`} itemid={itemid} />
                <div className={`${style.name} ${nameStyle}`}>{name}</div>
                <DeleteFavoriteButton deleteFavoriteCB={() => { }} />
            </div>
        );
    }
}

export default FavoriteItem;