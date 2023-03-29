import React, { useEffect } from "react";
import IPage from "../interfaces/page";
import logging from "../config/logging";

const HomePage: React.FunctionComponent<IPage> = props => {
    useEffect(() => {
        logging.info(`Loading ${props.name}`);
    }, [])

    return <h2>This is the HOMEPAGE</h2>
};

export default HomePage;