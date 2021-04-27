import React from 'react';
import Logo from './../Logo/Logo';
import IconButton from './../IconButton/IconButton';
import CollectorButton from './../CollectorButton/CollectorButton';
import signIn from './signIn.svg';
import logout from './logout.svg';
import collector from './collector.svg';
//import { useHistory } from 'react-router-dom';
import { setAuth, setForm } from './../../redux/reducers/userReducer';
import { useDispatch, useSelector } from 'react-redux';
import { removeAuth } from './../../utils';
import { Link } from 'react-router-dom';
import './Header.scss';

export default function Header() {
    //const history = useHistory();
    const dispatch = useDispatch();
    const user = useSelector((state) => state.user.user);

    const openAuthFrom = () => {
        dispatch(setForm(true));
    };

    const leaveAuth = () => {
        removeAuth().then((res) => {
            if (!res.auth) {
                dispatch(
                    setAuth({
                        login: '',
                        admin: false,
                    })
                );
            }
        });
    };

    return (
        <header className="header">
            <div className="header__inner container">
                <div className="header-block">
                    <Logo className="header__logo" />
                    <Menu />
                </div>
                <div className="header-block">
                    {user.login ? <User user={user} /> : null}
                    <CollectorButton
                        className="header__btn-collector"
                        src={collector}
                        to={'/builder'}
                        alt="collector"
                    />
                    {user.login ? (
                        <IconButton
                            onClick={() => {
                                leaveAuth();
                            }}
                            className="header__btn-acc"
                            icon={logout}
                            alt="leaveAuth"
                        />
                    ) : (
                        <IconButton
                            onClick={() => {
                                openAuthFrom();
                            }}
                            className="header__btn-acc"
                            icon={signIn}
                            alt="signIn"
                        />
                    )}
                </div>
            </div>
        </header>
    );
}

function User({ user }) {
    return user.admin ? (
        <Link className="header__user" to={'/admin'}>
            {user.login}
        </Link>
    ) : (
        <span className="header__user">{user.login}</span>
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
