import React from 'react';
import Handlebars from 'handlebars';
import $ from 'jquery';
import axios from 'axios';

class Home extends React.Component {
    constructor(props) {
        super(props);
        this.hashParams = {};
        this.isAuth = false;
        this.getHashParams = this.getHashParams.bind(this);
    }


    getHashParams() {
        const hashParams = {};
        var e, r = /([^&;=]+)=?([^&;]*)/g,
            q = window.location.hash.substring(1);
        while ( e = r.exec(q)) {
           hashParams[e[1]] = decodeURIComponent(e[2]);
        }
        return hashParams;
    }

    render() {

            return (
                <h1>Logged in!</h1>
            )
    }
}

export default Home;