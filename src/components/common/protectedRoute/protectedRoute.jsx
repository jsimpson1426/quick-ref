import React from 'react'
import auth from '../../../services/api/auth';
import { Route, Redirect } from 'react-router-dom';

const ProtectedRoute = ({path, component: Component, render, adminOnly ,...rest}) => {
    adminOnly = adminOnly ? adminOnly : false;
    return(
        <Route 
            {...rest}
            render={props => {
                if(!auth.getCurrentUser()){
                    return (
                        <Redirect 
                            to={{
                                pathname: "/login",
                                state: {from: props.location}
                            }}
                        />
                    );
                }
                if(adminOnly && !auth.getCurrentUser().isAdmin){
                    return <Redirect to={{ pathname: "/" }} />;
                }
                return  Component ? <Component {...props}/> : render(props);
            }}
        
        />
    );
};
 
export default ProtectedRoute;