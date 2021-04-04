import React, { useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setMenu } from './../../redux/reducers/catalogReducer';
import uniqid from 'uniqid';
import './CatalogMenu.scss';

export default function CatalogMenu() {
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

    return (
        <nav className="catalog-menu">
            <ul className="catalog-menu__inner">
                {menu.map((el) => (
                    <li key={uniqid()} className="catalog-menu__item">
                        <NavLink to={'/' + el.component}>{el.name}</NavLink>
                    </li>
                ))}
            </ul>
        </nav>
    );
}
