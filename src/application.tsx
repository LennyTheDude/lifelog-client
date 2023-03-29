import React, { useEffect } from "react";
import { 
    BrowserRouter,
    Route,
    Routes, // instead of Switch
    // useParams
 } from "react-router-dom";
import logging from "./config/logging";
import routes from "./config/routes";
// import { BrowserRouter, Route, Switch, RouteComponentProps } from "react-router-dom";

const Application: React.FunctionComponent<{}> = props => {
    // const params = useParams();

    useEffect(() => {
        logging.info('Loading Application');
    }, []);

    return (<div>
        <BrowserRouter>
            <Routes>
                {routes.map((route, index) => {
                    return (
                        <Route 
                            key={index}
                            path={route.path}
                            Component={route.component}
                        />
                    )
                })}
            </Routes>
        </BrowserRouter>
    </div>)
}

export default Application;