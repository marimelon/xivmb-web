import React, { PureComponent } from 'react';
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module './WorldTab.module.scss' or its... Remove this comment to see the full error message
import style from './WorldTab.module.scss';

class WorldTab extends PureComponent {
    render() {
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'currentTabType' does not exist on type '... Remove this comment to see the full error message
        const { currentTabType, onClick } = this.props;
        const worldlist = ['Elemental', 'Atomos', 'Aegis', 'Carbuncle', 'Garuda', 'Gungnir',
            'Kujata', 'Ramuh', 'Tonberry', 'Typhon', 'Unicorn'];
        return (
            // @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
            <nav>
                {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                <ul className={style.WorldTab}>
                    {worldlist.map(item =>
                        // @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
                        <li
                            key={item}
                            className={`${style.navitem} ${currentTabType === item ? style.active : ''}`}
                            onClick={() => onClick(item)}
                        >
                            {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                            <div>{item}</div>
                        </li>)}
                </ul>
            </nav>
        );
    }
}

export default WorldTab