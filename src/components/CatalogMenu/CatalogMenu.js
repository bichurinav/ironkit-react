import React, { useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setMenu } from './../../redux/reducers/catalogReducer';
import uniqid from 'uniqid';
import './CatalogMenu.scss';

export default function CatalogMenu({ className }) {
    const menu = useSelector((state) => state.catalog.menu);
    const dispatch = useDispatch();
    const getMenu = () => {
        return async (dispatch) => {
            try {
                const req = await fetch('/api/menu');
                const res = await req.json();
                dispatch(setMenu(res));
            } catch (e) {
                console.error(e);
            }
        };
    };
    useEffect(() => {
        dispatch(getMenu());
    }, [dispatch]);

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
