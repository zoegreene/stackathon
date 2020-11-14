import React from 'react';
import { connect } from 'react-redux';

class PlaylistForm extends React.Component {
    render() {
        const { playlist } = this.props;

        return (
            Object.keys(playlist).length === 0 ? <p>Loading...</p> :
            
            // Spotify embed takes 10 mins to sync so below gets 404
            // <iframe src={ playlistLink } width="300" height="380" frameBorder="0" allowtransparency="true" allow="encrypted-media"></iframe>
                <a href={ playlist.external_urls.spotify } target="_blank" className="btn-secondary">OPEN PLAYLIST ON SPOTIFY</a>
        )
    }
}

const mapStateToProps = state => ({
    playlist: state.playlist
});

export default connect(mapStateToProps, null)(PlaylistForm);
