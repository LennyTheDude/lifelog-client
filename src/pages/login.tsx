import React, { useContext, useEffect, useState } from "react";
import IPage from "../interfaces/page";
import logging from "../config/logging";
import { Button, FormGroup, Input } from "reactstrap";
import axios from "axios";
import { Navigate } from "react-router-dom";
import AuthContainer from "../components/authContainer/index"
import { Link } from "react-router-dom";
import UserContext from "../contexts/user";

const LoginPage: React.FunctionComponent<IPage> = props => {
    const [authing, setAuthing] = useState<boolean>(false);
    const [username, setUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [error, setError] = useState<string>('');
    const [redirect, setRedirect] = useState<string>('');

    const userContext = useContext(UserContext);

    useEffect(() => {
        logging.info(`Loading ${props.name}`);
    }, [props.name]);

    const Login = async () => {
        if (error !== '') {
            setError('');
        }

        try {
            let response = await axios({
                method: 'POST',
                url: 'http://localhost:4000/users/login',
                data: {
                    username,
                    password
                }
            });
            
            if (response.status === 201) {
                userContext.Login(response.data.user, response.data.token);
                setRedirect('/');
            } else {
                setError('Unable to sign in, please try again!');
                setAuthing(false);
            }

        } catch (error) {
            setError('Unable to sign in, please try again!');
            logging.error(error, 'Login');
            setAuthing(false);
        }
    }

    if (redirect !== '') {
        return <Navigate to={redirect} />;
    }

    return (
        <AuthContainer cardHeader="login">
            <FormGroup>
                <Input
                    type="text"
                    name="username"
                    id="username"
                    placeholder="Your username"
                    onChange={event => setUsername(event.target.value)}
                    value={username}
                />
            </FormGroup>
            <FormGroup>
                <Input
                    type="password"
                    name="password"
                    id="password"
                    placeholder="Your password"
                    onChange={event => setPassword(event.target.value)}
                    value={password}
                />
            </FormGroup>
            <Button
                disabled={authing}
                color="info"
                block
                onClick={Login}
            >
                Sign in
            </Button>
            <small>
                <p className="m-1 text-center">
                    Don't have an account? <Link to="/register">Register one!</Link>
                </p>
            </small>
            {error !== '' && <small className="text-danger">{error}</small>}
        </AuthContainer>
    );
};

export default LoginPage;