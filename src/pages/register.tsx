import React, { useEffect, useState } from "react";
import IPage from "../interfaces/page";
import logging from "../config/logging";
import { Button, FormGroup, Input } from "reactstrap";
import axios from "axios";
import { Navigate } from "react-router-dom";
import AuthContainer from "../components/authContainer/index"
import { Link } from "react-router-dom";

const RegisterPage: React.FunctionComponent<IPage> = props => {
    const [authing, setAuthing] = useState<boolean>(false);
    const [username, setUsername] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [confirm, setConfirm] = useState<string>('');
    const [error, setError] = useState<string>('');
    const [redirect, setRedirect] = useState<string>('');

    useEffect(() => {
        logging.info(`Loading ${props.name}`);
    }, [props.name]);

    const Register = async () => {
        if (password !== confirm) {
            setError('Passwords don\'t match!');
            return;
        }

        /* @TODO: add other error checking */

        if (error !== '') {
            setError('');
        }

        try {
            let response = await axios({
                method: 'POST',
                url: 'http://localhost:4000/users/register',
                data: {
                    username,
                    email,
                    password
                }
            });
            
            if (response.status === 201) {
                setRedirect('/login');
            } else {
                setError('Unable to register, please try again!');
                setAuthing(false);
            }

        } catch (error) {
            setError('Unable to register, please try again!');
            logging.error(error, 'Register');
            setAuthing(false);
        }
    }

    if (redirect !== '') {
        return <Navigate to={redirect} />;
    }

    return (
        <AuthContainer cardHeader="register">
            <FormGroup>
                <Input
                    type="text"
                    name="name"
                    id="name"
                    placeholder="Your name"
                    onChange={event => setUsername(event.target.value)}
                    value={username}
                />
            </FormGroup>
            <FormGroup>
                <Input
                    type="email"
                    name="email"
                    id="email"
                    placeholder="Your email"
                    onChange={event => setEmail(event.target.value)}
                    value={email}
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
            <FormGroup>
                <Input
                    type="password"
                    name="confirm"
                    id="confirm"
                    placeholder="Confirm password"
                    onChange={event => setConfirm(event.target.value)}
                    value={confirm}
                />
            </FormGroup>
            <Button
                disabled={authing}
                color="info"
                block
                onClick={Register}
            >
                Register account
            </Button>
            <small>
                <p className="m-1 text-center">
                    Already have an account? <Link to="/login">Log in!</Link>
                </p>
            </small>
            {error !== '' && <small className="text-danger">{error}</small>}
        </AuthContainer>
    );
};

export default RegisterPage;