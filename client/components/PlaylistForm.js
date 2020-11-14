import React from 'react';
import { connect } from 'react-redux';
import { createPlaylist, getSavedSongsDuration } from '../redux/playlist';
import { getMoreSongs } from '../redux/songs';
import PlaylistDisplay from './PlaylistDisplay';

class PlaylistForm extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            name: '',
            duration: 0,
            loading: false
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(ev) {
        const { target: { name, value } } = ev;
        this.setState({ [name]: value });
    }

    async handleSubmit(ev) {
        ev.preventDefault();
        const { createPlaylist, user, hashParam, getMoreSongs } = this.props;
        const { name, duration } = this.state;

        this.setState({ loading: true });

        // CHECK IF DESIRED PLAYLIST DURATION IS > TOTAL DURATION OF SAVED SONGS
        // IF SO, ADD MORE SAVED SONGS
        const savedSongsDuration = await getSavedSongsDuration(this.props.songs, hashParam);
        if (savedSongsDuration < duration * 60) {
            await getMoreSongs(hashParam.access_token);
        }
        createPlaylist(user, hashParam, name, duration * 1, this.props.songs);
    }

    render() {
        const { name, duration, loading } = this.state;
        const { playlist } = this.props;

        return (
            <div id="center-page">
                <h2>Enter playlist details to get started:</h2>
                <form className="playlist-form" onSubmit={ this.handleSubmit }>
                    <div className="form-item">
                        <label htmlFor="name">Playlist Name</label>
                        <input name="name" value={ name } onChange={ this.handleChange } />
                    </div>
                    <div className="form-item">
                        <label htmlFor="duration">Duration (minutes)</label>
                        <input name="duration" type="number" value={ duration } onChange={ this.handleChange } />
                    </div>
                    <button type="submit" className="btn-primary">CREATE PLAYLIST</button>
                </form>
                { loading ? <PlaylistDisplay /> 
                    : <div /> 
                }
            </div>

        )
    }
}

const mapStateToProps = state => ({
    songs: state.songs,
    playlist: state.playlist
});

const mapDispatchToProps = dispatch => ({
    createPlaylist: (user, hashParam, name, duration, songs) => dispatch(createPlaylist(user, hashParam, name, duration, songs)),
    getMoreSongs: (accessToken) => dispatch(getMoreSongs(accessToken))
});

export default connect(mapStateToProps, mapDispatchToProps)(PlaylistForm);