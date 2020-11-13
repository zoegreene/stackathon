import React from 'react';

const PlaylistForm = (playlist)  => {
    return (
        // Spotify embed takes 10 mins to sync so below gets 404
        // <iframe src={ playlistLink } width="300" height="380" frameBorder="0" allowtransparency="true" allow="encrypted-media"></iframe>
            <a href={ playlist.playlist.external_urls.spotify } target="_blank" className="btn-secondary">OPEN PLAYLIST ON SPOTIFY</a>
        )
}

export default PlaylistForm;