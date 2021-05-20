import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import uniqid from 'uniqid';
import './CatalogMenu.scss';

export default function CatalogMenu({ className }) {
    const menu = useSelector((state) => state.catalog.menu);
    const classes = ['catalog-menu'];

    if (className) classes.push(className);

    return (
        <nav className={classes.join(' ')}>
            <ul className="catalog-menu__inner">
                {menu.map((el) => (
                    <li key={uniqid()} className="catalog-menu__item">
                        <NavLink to={'/cards/' + el.component}>
                            <div className="catalog-menu__image">
                                <img src={'/' + el.icon} alt="" />
                            </div>
                            {el.name}
                        </NavLink>
                    </li>
                ))}
                {className === 'mobile' ? (
                    <li className="catalog-menu__item">
                        <NavLink to={'/kits'}>Сборки</NavLink>
                    </li>
                ) : null}
            </ul>
        </nav>
    );
}
