import axios from "axios";
import React, { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
import { Route, Routes } from "react-router-dom";
import logging from "./config/logging";
import routes from "./config/routes";
import { UserContextProvider } from "./contexts/user";
import IUser from "./interfaces/user";

const Application: React.FunctionComponent<{}> = props => {
    /* Application State Values */
    const [user, setUser] = useState<IUser|null>(null);
    const [token, setToken] = useState<string|null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    // const navigate = useNavigate();

    useEffect(() => {
        logging.info('Loading Application');

        if (user === null || token === null) {
            logging.info('Not logged in in current session, checking localstorage', 'Auth');

            let _token = localStorage.getItem('token');
            let _user = localStorage.getItem('user');
            
            if (_user === null || _token === null) {
                logging.info('Nothing in localstorage, removing vars and redirecting');
                Logout();
                // navigate('/login');
                setLoading(false);
            } else {
                logging.info('Credentials found, verifying', 'Auth');
                VerifyLocalStorageCredentials(_user, _token);
            }
        }
    }, []);

    const VerifyLocalStorageCredentials = async (_token:string, _user: string) => {
        try {
            let _parsedUser = JSON.parse(_user);

            let response = await axios({
                method: 'GET',
                url: 'http://localhost:4000/users/validate',
                headers: {
                    Authorization: `Bearer ${_token}`
                }
            });

            if (response.status === 200 || response.status === 304) {
                Login(_parsedUser, _token);
                setLoading(false);
            } else {
                logging.info('Credentials no longer valid', 'Auth');
                Logout();
                // navigate('/login');
                setLoading(false);
            }
        } catch (error) {
            logging.error(error, 'Auth');
            Logout();
            // navigate('/login');
            setLoading(false);
        }
    };

    const Login = (_user: IUser, _token:string) => {
        setUser(_user);
        setToken(_token);

        localStorage.setItem('user', JSON.stringify(_user));
        localStorage.setItem('token', _token);
    };

    const Logout = () => {
        localStorage.removeItem('user');
        localStorage.removeItem('token');

        setUser(null);
        setToken(null);
    };

    if (loading) {
        return (<div>LOADING...</div>);
    }

    let userContextValue = {
        user,
        token,
        Login,
        Logout
    }

    return (<div>
    <UserContextProvider value={userContextValue}>
        <Routes>
            {routes.map((route, index) => {
                return (
                    <Route
                        key={index}
                        path={route.path}
                        Component={route.component}
                    />
                );
            })}
        </Routes>
    </UserContextProvider>
    </div>)
}

export default Application;