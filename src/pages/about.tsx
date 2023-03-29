import React, { useEffect } from "react";
import IPage from "../interfaces/page";
import logging from "../config/logging";

const AboutPage: React.FunctionComponent<IPage> = props => {
    useEffect(() => {
        logging.info(`Loading ${props.name}`);
    }, [])

    return <h2>This is the ABOUT page</h2>
};

export default AboutPage;