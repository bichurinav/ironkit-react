import React, { useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import BuilderStore from './../../BuilderStore';
import { setCount } from './../../redux/reducers/builderReducer';
import { useDispatch, useSelector } from 'react-redux';
import './CollectorButton.scss';

export default function CollectorButton({ src, className, to }) {
    const builderCount = useSelector((state) => state.builder.count);
    const dispatch = useDispatch();
    const classes = ['button', 'primary', 'outlined', 'collector-btn'];
    if (className) classes.push(className);

    useEffect(() => {
        const count = BuilderStore().count();
        dispatch(setCount(count));
    }, [dispatch]);

    return (
        <NavLink className={classes.join(' ')} to={to}>
            <span className="collector-btn__label">Сборщик</span>
            <div className="collector-btn__icon">
                <img className="collector-btn__img" src={src} alt="" />
                <span className="collector-btn__counter">{builderCount}</span>
            </div>
        </NavLink>
    );
}
