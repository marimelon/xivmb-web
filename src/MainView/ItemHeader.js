import React, { Component } from 'react';
import ItemIcon from "../Common/ItemIcon"
import style from './ItemHeader.module.scss';

class ItemHeader extends Component {
    shouldComponentUpdate(nextProps, nextState) {
        return this.props.itemid !== nextProps.itemid
    }
    render() {
        const { itemid, itemname } = this.props;

        return (
            <div className={style.ItemHeader}>
                <div className={style.icon}>
                    <ItemIcon className={style.iconimage} itemid={itemid} />
                    <img className={style.cover} src={`${process.env.PUBLIC_URL}/images/itembg1.png`} />
                </div>
                <div className={style.itemname}>{itemname}</div>
                <a target="_blank" rel="noopener noreferrer" href={`https://eriones.com/search?i=${itemname}`}>
                    <img className={style.erioneslink} src={`${process.env.PUBLIC_URL}/images/eriones.png`} />
                </a>
            </div>
        );
    }
}

export default ItemHeader;