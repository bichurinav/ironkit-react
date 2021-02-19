import React from 'react'
import Logo from './../Logo/Logo'
import IconButton from './../IconButton/IconButton'
import CollectorButton from './../CollectorButton/CollectorButton'
import signIn from './signIn.svg'
import collector from './collector.svg'
import './Header.scss'

export default function Header() {
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
                        alt="collector" 
                    />
                    <IconButton 
                        className="header__btn-acc" 
                        src={signIn} 
                        alt="signIn" 
                    />
                </div>
            </div>
        </header>
    )
}

function Menu() {
    return (
        <nav className="menu">
            <ul className="menu__inner">
                <li className="menu__item">
                    <a href="/#" className="menu__link">
                        Сборки
                    </a>
                </li>
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
    )
}