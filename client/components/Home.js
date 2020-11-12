// LIBRARIES
import React from 'react';
import { connect } from 'react-redux';

// FILES
import PlaylistForm from './PlaylistForm';
import { getUser } from '../redux/user';
import { getSavedSongs } from '../redux/songs';
import { getParam } from '../redux/hashParam';

// Web player
// https://developer.spotify.com/documentation/web-playback-sdk/quick-start/


class Home extends React.Component {

    async componentDidMount() {
        const { getParam, getUser, getSavedSongs } = this.props;
        
        await getParam();

        if (this.props.hashParam.access_token) {
            getUser(this.props.hashParam.access_token);
            getSavedSongs(this.props.hashParam.access_token);
        }
    }

    render() {
        const { user, hashParam, savedSongs } = this.props;
        return (
            <div>
                {/* <div>
                    <h3>My Saved Songs</h3>
                    { 
                        savedSongs.map(song => {
                            return (
                                <p key={ song.track.id }>{ song.track.name }</p>
                            )
                        }) 
                    }
                </div> */}
                <PlaylistForm user={ user } hashParam={ hashParam } savedSongs={ savedSongs } />
            </div>

        )
    }
}

const mapStateToProps = state => {
    return {
        user: state.user,
        savedSongs: state.songs,
        hashParam: state.hashParam
    }
}

const mapDispatchToProps = dispatch => {
    return {
        getUser: (accessToken) => dispatch(getUser(accessToken)),
        getSavedSongs: (accessToken) => dispatch(getSavedSongs(accessToken)),
        getParam: () => dispatch(getParam())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);