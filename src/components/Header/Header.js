import React from 'react';
import Logo from './../Logo/Logo';
import IconButton from './../IconButton/IconButton';
import CollectorButton from './../CollectorButton/CollectorButton';
import signIn from './signIn.svg';
import collector from './collector.svg';
//import { useHistory } from 'react-router-dom';
import { setForm } from './../../redux/reducers/userReducer';
import { useDispatch } from 'react-redux';
import './Header.scss';

export default function Header() {
    //const history = useHistory();
    const dispatch = useDispatch();

    const signInHandler = () => {
        dispatch(setForm(true));
    };

    return (
        <header className="header">
            <div className="header__inner container">
                <div className="header-block">
                    <Logo className="header__logo" />
                    <Menu />
                </div>
                <div className="header-block">
                    <CollectorButton
                        className="header__btn-collector"
                        src={collector}
                        to={'/builder'}
                        alt="collector"
                    />
                    <IconButton
                        onClick={() => {
                            signInHandler();
                        }}
                        className="header__btn-acc"
                        icon={signIn}
                        alt="signIn"
                    />
                </div>
            </div>
        </header>
    );
}

function Menu() {
    return (
        <nav className="menu">
            <ul className="menu__inner">
                <li className="menu__item">
                    <a href="/#" className="menu__link">
                        Инструкция
                    </a>
                </li>
                <li className="menu__item">
                    <a href="/#" className="menu__link">
                        О проекте
                    </a>
                </li>
            </ul>
        </nav>
    );
}
