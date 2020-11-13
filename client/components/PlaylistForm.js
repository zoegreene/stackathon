import React from 'react';
import { connect } from 'react-redux';
import { createPlaylist } from '../redux/playlist';

class PlaylistForm extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            name: '',
            duration: 0
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(ev) {
        const { target: { name, value } } = ev;
        this.setState({ [name]: value });
    }

    handleSubmit(ev) {
        ev.preventDefault();
        const { createPlaylist, user, hashParam, savedSongs } = this.props;
        const { name, duration } = this.state;

        // TODO: CHECK IF PLAYLIST DURATION IS > TOTAL DURATION OF SAVED SONGS
        // IF SO, ADD MORE SAVED SONGS
        createPlaylist(user, hashParam, name, duration * 1, savedSongs);
    }

    render() {
        const { name, duration } = this.state;
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
            </div>

        )
    }
}

const mapDispatchToProps = dispatch => ({
    createPlaylist: (user, hashParam, name, duration, songs) => dispatch(createPlaylist(user, hashParam, name, duration, songs))
});

export default connect(null, mapDispatchToProps)(PlaylistForm);