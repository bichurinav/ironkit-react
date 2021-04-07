import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import Header from './components/Header/Header';
import Catalog from './views/Catalog/Catalog';
import CatalogMenu from './components/CatalogMenu/CatalogMenu';
import DetailCard from './views/DetailCard/DetailCard';
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
