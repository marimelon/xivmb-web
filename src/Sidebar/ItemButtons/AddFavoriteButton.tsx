import React from 'react';
import style from './ItemButtons.module.scss';

export const FavoriteButton: React.FC<{ isActive: boolean, addFavoriteCB: (() => void) }> = ({ isActive, addFavoriteCB }) => (
    <div className={`${style.FavoriteButton} ${isActive ? style.active : ''}`}
        onClick={(e) => { e.stopPropagation(); addFavoriteCB(); }}>
        ☆
    </div>);