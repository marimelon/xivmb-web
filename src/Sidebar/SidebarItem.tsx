import React, { Component } from 'react';
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module './SidebarItem.module.scss' or ... Remove this comment to see the full error message
import style from './SidebarItem.module.scss';

// @ts-expect-error ts-migrate(6142) FIXME: Module '../Common/ItemIcon' was resolved to '/root... Remove this comment to see the full error message
import ItemIcon from "../Common/ItemIcon"

class SidebarItem extends Component {
    static defaultProps = {
        isActive: false,
        onClick: () => { }
    };
    
    render() {
        const {
            // @ts-expect-error ts-migrate(2339) FIXME: Property 'itemid' does not exist on type 'Readonly... Remove this comment to see the full error message
            itemid,
            // @ts-expect-error ts-migrate(2339) FIXME: Property 'name' does not exist on type 'Readonly<{... Remove this comment to see the full error message
            name,
            // @ts-expect-error ts-migrate(2339) FIXME: Property 'isActive' does not exist on type 'Readon... Remove this comment to see the full error message
            isActive,
            // @ts-expect-error ts-migrate(2339) FIXME: Property 'customStyles' does not exist on type 'Re... Remove this comment to see the full error message
            customStyles,
            // @ts-expect-error ts-migrate(2339) FIXME: Property 'iconStyle' does not exist on type 'Reado... Remove this comment to see the full error message
            iconStyle,
            // @ts-expect-error ts-migrate(2339) FIXME: Property 'nameStyle' does not exist on type 'Reado... Remove this comment to see the full error message
            nameStyle,
            // @ts-expect-error ts-migrate(2339) FIXME: Property 'onClick' does not exist on type 'Readonl... Remove this comment to see the full error message
            onClick,
            children,
        } = this.props;
        return (
            // @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
            <div className={`${style.SidebarItem} ${customStyles} ${isActive ? style.active : ''}`}
                onClick={() => { onClick(itemid,name) }}>
                {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                <ItemIcon className={`${style.icon} ${iconStyle}`} itemid={itemid} />
                {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                <div className={`${style.name} ${nameStyle}`}>{name}</div>
                {children}
            </div>
        );
    }
}

export default SidebarItem;