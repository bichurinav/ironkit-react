import React, { useState } from 'react';
import TextField from '../../components/TextField/TextField';
import { useInput } from './../../hooks';
import { useDispatch } from 'react-redux';
import { setForm, setAuth } from './../../redux/reducers/userReducer';
import { checkAuth } from './../../utils';
import './Auth.scss';

function Auth() {
    const [currentForm, setCurrentForm] = useState('auth');
    const [formActive, setFormActive] = useState(true);
    const [authError, setAuthError] = useState('');
    const dispatch = useDispatch();
    const login = useInput('');
    const password = useInput('');
    const repeatedPassword = useInput('');
    const classesRegBtn = ['auth__reg-btn'];
    const classesAuthBtn = ['auth__auth-btn'];
    if (currentForm === 'reg') classesRegBtn.push('active');
    if (currentForm === 'auth') classesAuthBtn.push('active');

    const addGetUser = async (body, url) => {
        try {
            const req = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json;charset=utf-8',
                },
                body: JSON.stringify(body),
            });
            const res = await req.json();
            if (!req.ok) throw res.message;
            if (res.auth) {
                setAuthError('');
                checkAuth().then((res) => {
                    dispatch(
                        setAuth({
                            login: res.login,
                            admin: res.admin,
                        })
                    );
                    dispatch(setForm(false));
                });
            }
        } catch (e) {
            setAuthError(e);
        }
    };

    const formHandler = (e) => {
        e.preventDefault();
        if (!formActive) return setFormActive(true);

        function checkForm(login, password, repeatedPassword) {
            let reg = false;
            const arr = [];
            const fields = [login, password];
            if (repeatedPassword) {
                fields.push(repeatedPassword);
                reg = true;
            }

            checkEmpty(fields);
            if (reg) {
                checkRepeated(password, repeatedPassword);
            }

            return arr.length < 1;

            function checkEmpty(fields) {
                fields.forEach((field) => {
                    if (field.value().trim() === '') {
                        field.setError('Введите значение');
                        arr.push(1);
                    } else {
                        if (field.error()) field.setError('');
                        checkLength(login);
                        checkLength(password, true);
                    }
                });
            }
            function checkLength(field, pass) {
                if (!pass) {
                    if (
                        field.value().length > 1 &&
                        field.value().length <= 16
                    ) {
                        if (field.error()) field.setError('');
                        checkInvalid(login, 'login');
                    } else {
                        field.setError('Логин от 2 до 16 символов');
                        arr.push(1);
                    }
                } else {
                    if (
                        field.value().length > 3 &&
                        field.value().length <= 32
                    ) {
                        if (field.error()) field.setError('');
                        checkInvalid(password, 'password');
                    } else {
                        field.setError('Пароль от 4 до 32 символов');
                        arr.push(1);
                    }
                }
            }
            function checkInvalid(field, name) {
                switch (name) {
                    case 'login':
                        if (!/^[a-zA-Z](.[a-zA-Z0-9_]*)$/.test(field.value())) {
                            field.setError('Некорректный логин');
                            arr.push(1);
                        } else {
                            if (field.error()) field.setError('');
                        }
                        break;
                    case 'password':
                        if (
                            !/^[a-zA-Z0-9!@#$%^&*]{4,32}$/.test(field.value())
                        ) {
                            field.setError('Некорректный пароль');
                            arr.push(1);
                        } else {
                            if (field.error()) field.setError('');
                        }
                        break;
                    default:
                        return;
                }
            }
            function checkRepeated(password, repeatedPassword) {
                if (
                    password.value().trim() !== repeatedPassword.value().trim()
                ) {
                    arr.push(1);
                    repeatedPassword.setError('Пароль не совпадает');
                } else {
                    if (repeatedPassword.error()) repeatedPassword.setError('');
                }
            }
        }

        const body = {
            login: login.value(),
            password: password.value(),
        };

        if (currentForm === 'reg') {
            body.repeatedPassword = repeatedPassword.value();
            if (checkForm(login, password, repeatedPassword)) {
                addGetUser(body, '/api/users/add');
            }
        } else {
            if (checkForm(login, password)) {
                addGetUser(body, '/api/users/login');
            }
        }
    };

    const authHanlder = (e) => {
        const btnActive = e.target.classList.contains('active');
        const btnName = e.target.name;
        if (!btnActive) {
            setFormActive(false);
            if (login.error()) login.setError();
            if (password.error()) password.setError();
            if (repeatedPassword.error()) repeatedPassword.setError();
            if (authError) setAuthError('');
            setCurrentForm(btnName);
            return;
        }
    };

    const authClose = (e) => {
        const cls = e.target.className;
        if (cls === 'auth' || cls === 'auth__close') {
            dispatch(setForm(false));
        }
    };

    return (
        <div onMouseDown={(e) => authClose(e)} className="auth">
            <form className="auth__form" onSubmit={(e) => formHandler(e)}>
                <span className="auth__close">&times;</span>
                <h2 className="primary auth__title">
                    {currentForm === 'reg' ? 'Регистрация' : 'Авторизация'}
                </h2>
                <TextField label="Логин" name="login" field={login} />
                <TextField
                    label="Пароль"
                    name="password"
                    type="password"
                    field={password}
                />
                {currentForm === 'reg' ? (
                    <TextField
                        label="Повторный пароль"
                        name="repeat-password"
                        type="password"
                        field={repeatedPassword}
                    />
                ) : null}

                <span className="auth__error">{authError}</span>

                <div className="auth__buttons">
                    <button
                        onClick={(e) => {
                            authHanlder(e);
                        }}
                        className={classesRegBtn.join(' ')}
                        name={'reg'}
                        type={currentForm === 'reg' ? 'submit' : 'button'}
                    >
                        Регистрация
                    </button>
                    <button
                        onClick={(e) => {
                            authHanlder(e);
                        }}
                        name={'auth'}
                        type={currentForm === 'auth' ? 'submit' : 'button'}
                        className={classesAuthBtn.join(' ')}
                    >
                        Войти
                    </button>
                </div>
            </form>
        </div>
    );
}

export default Auth;
