import React from 'react';
import { Route, Redirect } from 'react-router-dom';

const PrivateRoute = ({ component: Component, admin, ...rest }) => {
    return (
        <Route
            {...rest}
            render={(props) => {
                return admin ? <Component {...props} /> : <Redirect to="/" />;
            }}
        />
    );
};

export default PrivateRoute;
