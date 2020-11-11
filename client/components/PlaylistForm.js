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

        createPlaylist(user, hashParam, name, duration, savedSongs);
    }

    render() {
        const { name, duration } = this.state;
        return (
            <form className="playlist-form" onSubmit={ this.handleSubmit }>
                <label htmlFor="name">Playlist Name</label>
                <input name="name" value={ name } onChange={ this.handleChange } />

                <label htmlFor="duration">Duration (minutes)</label>
                <input name="duration" value={ duration } onChange={ this.handleChange } />
                <button type="submit">Create Playlist</button>
            </form>
        )
    }
}

const mapDispatchToProps = dispatch => ({
    createPlaylist: (user, hashParam, name, duration, songs) => dispatch(createPlaylist(user, hashParam, name, duration, songs))
});

export default connect(null, mapDispatchToProps)(PlaylistForm);