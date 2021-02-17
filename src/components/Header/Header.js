import React from 'react'
import Logo from './../Logo/Logo'
import IconButton from './../IconButton/IconButton'
import signIn from './signIn.svg'
import './Header.scss'

export default function Header() {
    return (
        <header className="header">
            <div className="header__inner container">
                <Logo className="header__logo" />
                <IconButton className="header__acc" src={signIn} alt="signIn" />
            </div>
        </header>
    )
}