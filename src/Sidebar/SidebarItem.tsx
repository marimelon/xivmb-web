import React, { Component } from 'react';
import style from './SidebarItem.module.scss';

import ItemIcon from "../Common/ItemIcon"

class SidebarItem extends Component {
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
                {children}
            </div>
        );
    }
}

export default SidebarItem;