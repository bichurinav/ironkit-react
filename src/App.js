import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import Header from './components/Header/Header';
import Catalog from './views/Catalog/Catalog';
import CatalogMenu from './components/CatalogMenu/CatalogMenu';
import Content from './components/Content/Content';
import Admin from './views/Admin/Admin';

export default function App() {
    return (
        <div className="App">
            <Header />
            <Content>
                <CatalogMenu />
                <Switch>
                    <Route path="/admin" children={<Admin />} />
                    <Route path="/:component" children={<Catalog />} />
                    <Redirect from="/" to="/cpu" />
                </Switch>
            </Content>
        </div>
    );
}
