import React, { useRef, useEffect } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import Header from './components/Header/Header';
import Catalog from './views/Catalog/Catalog';
import CatalogMenu from './components/CatalogMenu/CatalogMenu';
import DetailCard from './views/DetailCard/DetailCard';
import Content from './components/Content/Content';
import Builder from './views/Builder/Builder';
import Auth from './views/Auth/Auth';
import Admin from './views/Admin/Admin';
import { CSSTransition } from 'react-transition-group';
import { useSelector, useDispatch } from 'react-redux';
import { setCards } from './redux/reducers/builderReducer';
import { setAuth } from './redux/reducers/userReducer';
import { checkAuth } from './utils';
import PrivateRouter from './components/PrivateRouter/PrivateRouter';
import BuilderStore from './BuilderStore';

export default function App() {
    const authFlag = useSelector((state) => state.user.form);
    const user = useSelector((state) => state.user.user);
    const authRef = useRef();
    const dispatch = useDispatch();
    useEffect(() => {
        const cards = BuilderStore().get();
        dispatch(setCards(cards));
        checkAuth().then((res) => {
            if (res) {
                dispatch(
                    setAuth({
                        login: res.login,
                        admin: res.admin,
                    })
                );
            }
        });
    }, [dispatch]);

    return (
        <div className="App">
            <CSSTransition
                in={authFlag}
                nodeRef={authRef}
                timeout={300}
                classNames="fade"
                unmountOnExit={true}
            >
                <Auth />
            </CSSTransition>
            <Header />
            <Content>
                <CatalogMenu />
                <Switch>
                    <PrivateRouter
                        component={Admin}
                        admin={user.admin}
                        path="/admin"
                    />
                    <Route path="/builder" children={<Builder />} />
                    <Route
                        exact
                        path="/cards/:component"
                        children={<Catalog />}
                    />
                    <Route
                        path="/cards/:component/:id"
                        children={<DetailCard />}
                    />
                    <Redirect from="/" to="/cards/cpu" />
                </Switch>
            </Content>
        </div>
    );
}
