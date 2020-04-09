import React, { Component,PureComponent } from 'react';
import style from './WorldTab.module.scss';

class WorldTab extends PureComponent {
    render() {
        const { currentTabType, onClick } = this.props;
        const worldlist = ['Elemental', 'Atomos', 'Aegis', 'Carbuncle', 'Garuda', 'Gungnir',
            'Kujata', 'Ramuh', 'Tonberry', 'Typhon', 'Unicorn'];
        return (
            <nav>
                <ul className={style.WorldTab}>
                    {worldlist.map(item =>
                        <li
                            key={item}
                            className={`${style.navitem} ${currentTabType === item ? style.active : ''}`}
                            onClick={() => onClick(item)}
                        >
                            <a>{item}</a>
                        </li>)}
                </ul>
            </nav>
        );
    }
}

export default WorldTab