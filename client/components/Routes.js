import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Home from './Home';
import Navbar from './Navbar';

const Routes = () => {
    return (
        <Router>
            <Navbar />
            <Route exact path='/' component={ Home } />
        </Router>
    )
}

export default Routes;