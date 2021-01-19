import React, { PureComponent } from 'react';
import ItemIcon from "../Common/ItemIcon"
import style from './ItemHeader.module.scss';

import FileCopyIcon from '@material-ui/icons/FileCopy';
import CopyToClipBoard from 'react-copy-to-clipboard';

class ItemHeader extends PureComponent {
    constructor(props) {
        super(props);
        this.state = { iscopied: false,};
    }
    componentDidUpdate(prevProps) {
        if (this.props.itemid !== prevProps.itemid) {
            this.setState({ iscopied: false });
        }
    }
    render() {
        const { itemid, itemname } = this.props;
        
        return (
            <div className={style.ItemHeader}>
                <div className={style.icon}>
                    <ItemIcon className={style.iconimage} itemid={itemid} />
                    <img className={style.cover} alt={itemname} src={`${process.env.PUBLIC_URL}/images/itembg1.png`} />
                </div>
                <div className={style.itemname}>{itemname}</div>
                <CopyToClipBoard onCopy={()=>{this.setState({ iscopied: true })}} text={itemname}>
                    <FileCopyIcon className={`${style.copyicon} ${this.state.iscopied?style.active:""}`}/>
                </CopyToClipBoard>
                
                <a target="_blank" rel="noopener noreferrer" href={`https://eriones.com/search?i=${itemname}`}>
                    <img className={style.erioneslink} alt={"eriones"} src={`${process.env.PUBLIC_URL}/images/eriones.png`} />
                </a>
            </div>
        );
    }
}

export default ItemHeader;