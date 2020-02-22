import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useStore } from 'react-redux';

const PrivateRoute = ({ component: Component, ...rest }) => {
    const store = useStore();
    const currentState = store.getState();
    const isAuthenticated = currentState.isAuthenticated;
    return (
        <Route {...rest} render={(props) => (
         isAuthenticated === true
            ? <Component {...props} />
            : <Redirect to={{
                pathname: '/login',
                state: { from: props.location }
            }} />
        )} />
    )
}

export default PrivateRoute;