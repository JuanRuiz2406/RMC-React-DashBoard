import React from 'react';
// import { Navbar } from '../components/ui/Navbar';
import { Switch, Route, Redirect } from 'react-router-dom';

import { Home } from "../components/pages/index";

export const DashboardRoutes = () => {
    return (
        <>
            {/* <Navbar /> */}

            {/* <div className="container mt-2"> */}
                <Switch>
                    <Route exact path="/reportes" component={ Home } />
                    <Route exact path="/reporte" component={ Home } />

                    <Redirect to="/reportes" />
                </Switch>
            {/* </div> */}


        </>
    )
}
