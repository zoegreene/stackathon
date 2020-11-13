// LIBRARIES
import React from 'react';
import { connect } from 'react-redux';

// FILES
import PlaylistForm from './PlaylistForm';
import PlaylistDisplay from './PlaylistDisplay';
import { getUser } from '../redux/user';
import { getSavedSongs } from '../redux/songs';
import { getParam } from '../redux/hashParam';

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
        const { user, hashParam, savedSongs, playlist } = this.props;
        return (
            <div>
                <PlaylistForm user={ user } hashParam={ hashParam } savedSongs={ savedSongs } />
                { playlist.id ? 
                    <PlaylistDisplay playlist={ playlist } /> : <div /> 
                }
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        user: state.user,
        savedSongs: state.songs,
        hashParam: state.hashParam,
        playlist: state.playlist
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