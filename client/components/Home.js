import React from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import AboutMe from './AboutMe';
import { getUser } from '../redux/user';
import { getSavedSongs } from '../redux/songs';

// To get length of track
// https://developer.spotify.com/console/get-audio-analysis-track/?id=06AKEBrKUckW0KREUWRnvT

// Web player
// https://developer.spotify.com/documentation/web-playback-sdk/quick-start/


class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            hashParams: {},
        };

        this.getHashParams = this.getHashParams.bind(this);
        this.createPlaylist = this.createPlaylist.bind(this);
    }

    componentDidMount() {
        this.getHashParams();

        if (this.state.hashParams.access_token) {
            this.props.getUser(this.state.hashParams.access_token);
            this.props.getSavedSongs(this.state.hashParams.access_token);
        }
    }

    getHashParams() {
        var e, r = /([^&;=]+)=?([^&;]*)/g,
            q = window.location.hash.substring(1);
        while ( e = r.exec(q)) {
           this.state.hashParams[e[1]] = decodeURIComponent(e[2]);
        }
    }

    async createPlaylist(ev) {
        ev.preventDefault();
        const playlist = await axios.post(`https://api.spotify.com/v1/users/${this.props.user.id}/playlists`, {
            name: "Cut for Time Playlist",
            description: "Playlist created by Cut for Time app",
            public: false
        }, {
            headers: { 'Authorization': `Bearer ${this.state.hashParams.access_token}` }
        });
        console.log(playlist.data);
    }

    render() {
        const { user, savedSongs } = this.props;
        return (
            <div>
                {/* <AboutMe user={ user } /> */}
                <div>
                    <h3>My Saved Songs</h3>
                    { 
                        savedSongs.map(song => {
                            return (
                                <p key={ song.track.id }>{ song.track.name }</p>
                            )
                        }) 
                    }
                </div>
                <button onClick={ this.createPlaylist }>Create Playlist</button>
            </div>

        )
    }
}

const mapStateToProps = state => {
    return {
        user: state.user,
        savedSongs: state.songs
    }
}

const mapDispatchToProps = dispatch => {
    return {
        getUser: (accessToken) => dispatch(getUser(accessToken)),
        getSavedSongs: (accessToken) => dispatch(getSavedSongs(accessToken))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);