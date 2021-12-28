import React from 'react';
import Authorized from '@/utils/Authorized';
import {getRouteAuthority} from '@/utils/utils';
import {Redirect} from 'react-router-dom';

interface AuthComponentProps {
    routes: any;
    location: any;
    user: any
}

const AuthComponent: React.FC<AuthComponentProps> = ({
                                                         children,
                                                         routes = [],
                                                         location = {
                                                             pathname: '',
                                                         },
                                                         user,
                                                     }) => {
    const {currentUser} = user;
    const isLogin = currentUser && currentUser.name;

    return (
        <Authorized
            authority={getRouteAuthority(location.pathname, routes) || ''}
            noMatch={isLogin ? <Redirect to="/exception/403"/> : <Redirect to="/user/login"/>}
        >
            {children}
        </Authorized>
    );
};

export default AuthComponent;
