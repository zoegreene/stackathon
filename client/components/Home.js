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
        // this.authorize = this.authorize.bind(this);
    }

    // componentDidMount() {
    //     this.getHashParams();
    // }

    getHashParams() {
        const hashParams = {};
        var e, r = /([^&;=]+)=?([^&;]*)/g,
            q = window.location.hash.substring(1);
        while ( e = r.exec(q)) {
           hashParams[e[1]] = decodeURIComponent(e[2]);
        }
        return hashParams;
    }

    // async authorize() {
    //     const auth = await axios.get('https://api.spotify.com/v1/me', {
    //         headers: { 'Authorization': 'Bearer' + this.hashParams.access_token }
    //     });    
    //     return auth.data;
    // }

    render() {

        // var userProfileSource = document.getElementById('user-profile-template').innerHTML,
        //     userProfileTemplate = Handlebars.compile(userProfileSource),
        //     userProfilePlaceholder = document.getElementById('user-profile');

        // var oauthSource = document.getElementById('oauth-template').innerHTML,
        //     oauthTemplate = Handlebars.compile(oauthSource),
        //     oauthPlaceholder = document.getElementById('oauth');

        // var params = this.getHashParams();

        // var access_token = params.access_token,
        //     refresh_token = params.refresh_token,
        //     error = params.error;

        //     if (error) {
        //         alert('There was an error during the authentication');
        //       } else {
        //         if (access_token) {
        //           // render oauth info
        //           oauthPlaceholder.innerHTML = oauthTemplate({
        //             access_token: access_token,
        //             refresh_token: refresh_token
        //           });
      
        //           $.ajax({
        //               url: 'https://api.spotify.com/v1/me',
        //               headers: {
        //                 'Authorization': 'Bearer ' + access_token
        //               },
        //               success: function(response) {
        //                 userProfilePlaceholder.innerHTML = userProfileTemplate(response);
      
        //                 $('#login').hide();
        //                 $('#loggedin').show();
        //               }
        //           });
        //         } else {
        //             // render initial screen
        //             $('#login').show();
        //             $('#loggedin').hide();
        //         }
      
                // document.getElementById('obtain-new-token').addEventListener('click', function() {
                //   $.ajax({
                //     url: '/refresh_token',
                //     data: {
                //       'refresh_token': refresh_token
                //     }
                //   }).done(function(data) {
                //     access_token = data.access_token;
                //     oauthPlaceholder.innerHTML = oauthTemplate({
                //       access_token: access_token,
                //       refresh_token: refresh_token
                //     });
                //   });
                // }, false);
            // }

            return (
                <h1>Logged in!</h1>
            )


    //     !this.isAuth ? 
    //         console.log(this.authorize())
    //         : console.log('not yet auth')


    //     return (
    //         this.hashParams.error ? 
    //             alert('There was an error during the authentication') :
    //             this.hashParams.access_token ? 
    //                 <div className="oauth-section">
    //                     <h4>Access token: { this.hashParams.access_token }</h4>
    //                     <h4>Refresh token: { this.hashParams.refresh_token }</h4>
    //                     <button>Obtain new token using the refresh token</button>
    //                 </div>
    //             : <div />
    //    );
    }
}

export default Home;