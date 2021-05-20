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
import { setMenu } from './redux/reducers/catalogReducer';
import { checkAuth } from './utils';
import PrivateRouter from './components/PrivateRouter/PrivateRouter';
import Kits from './views/Kits/Kits';
import DetailKit from './views/DetailKit/DetailKit';
import BuilderStore from './BuilderStore';

export default function App() {
    const authActive = useSelector((state) => state.user.form);
    const user = useSelector((state) => state.user.user);
    const menuActive = useSelector((state) => state.catalog.menuActive);
    const authRef = useRef();
    const menuRef = useRef();
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
        const cards = BuilderStore().get();
        dispatch(getMenu());
        dispatch(setCards(cards));
        checkAuth().then((res) => {
            if (res) {
                dispatch(
                    setAuth({
                        login: res.login,
                        email: res.email,
                        admin: res.admin,
                    })
                );
            }
        });
    }, [dispatch]);

    return (
        <div className="App">
            {/* Auth */}
            <CSSTransition
                in={authActive}
                nodeRef={authRef}
                timeout={300}
                classNames="fade"
                unmountOnExit={true}
            >
                <Auth />
            </CSSTransition>
            {/* Header */}
            <Header />
            {/* MenuMobile */}
            <CSSTransition
                in={menuActive}
                nodeRef={menuRef}
                timeout={300}
                classNames="fade"
                unmountOnExit={true}
            >
                <CatalogMenu className="mobile" />
            </CSSTransition>
            <Content>
                <CatalogMenu />
                <Switch>
                    <PrivateRouter
                        component={Admin}
                        access={user.admin}
                        path="/admin"
                    />
                    <Route exact path="/kits" children={<Kits />} />
                    <Route path="/kits/:user/:id" children={<DetailKit />} />
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
