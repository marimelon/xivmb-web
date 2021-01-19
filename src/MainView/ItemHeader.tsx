import React, { PureComponent } from 'react';
// @ts-expect-error ts-migrate(6142) FIXME: Module '../Common/ItemIcon' was resolved to '/root... Remove this comment to see the full error message
import ItemIcon from "../Common/ItemIcon";
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module './ItemHeader.module.scss' or i... Remove this comment to see the full error message
import style from './ItemHeader.module.scss';
import FileCopyIcon from '@material-ui/icons/FileCopy';
// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module 'reac... Remove this comment to see the full error message
import CopyToClipBoard from 'react-copy-to-clipboard';
type State = any;
class ItemHeader extends PureComponent<{}, State> {
    constructor(props: {}) {
        super(props);
        this.state = { iscopied: false, };
    }
    componentDidUpdate(prevProps: {}) {
        if ((this.props as any).itemid !== (prevProps as any).itemid) {
            this.setState({ iscopied: false });
        }
    }
    render() {
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'itemid' does not exist on type 'Readonly... Remove this comment to see the full error message
        const { itemid, itemname } = this.props;
        // @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
        return (<div className={style.ItemHeader}>
                {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                <div className={style.icon}>
                    {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                    <ItemIcon className={style.iconimage} itemid={itemid}/>
                    {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                    <img className={style.cover} alt={itemname} src={`${process.env.PUBLIC_URL}/images/itembg1.png`}/>
                </div>
                {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                <div className={style.itemname}>{itemname}</div>
                {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                <CopyToClipBoard onCopy={() => { this.setState({ iscopied: true }); }} text={itemname}>
                    {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                    <FileCopyIcon className={`${style.copyicon} ${this.state.iscopied ? style.active : ""}`}/>
                </CopyToClipBoard>
                
                {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                <a target="_blank" rel="noopener noreferrer" href={`https://eriones.com/search?i=${itemname}`}>
                    {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                    <img className={style.erioneslink} alt={"eriones"} src={`${process.env.PUBLIC_URL}/images/eriones.png`}/>
                </a>
            </div>);
    }
}
export default ItemHeader;
