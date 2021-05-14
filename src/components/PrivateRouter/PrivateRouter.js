import React from 'react';
import { Route, Redirect } from 'react-router-dom';

const PrivateRoute = ({ component: Component, access, ...rest }) => {
    return (
        <Route
            {...rest}
            render={(props) => {
                return access ? <Component {...props} /> : <Redirect to="/" />;
            }}
        />
    );
};

export default PrivateRoute;
