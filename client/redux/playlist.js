import axios from 'axios';

const CREATE_PLAYLIST = 'CREATE_PLAYLIST';

export const _createPlaylist = playlist => ({
    type: CREATE_PLAYLIST,
    playlist
})

export const createPlaylist = (user, hashParam, name, duration, savedSongs) => {
    return async (dispatch) => {
        const playlist = await axios.post(`https://api.spotify.com/v1/users/${user.id}/playlists`, {
            name: name,
            description: "Playlist created by Cut for Time app",
            public: false
        }, {
            headers: { 'Authorization': `Bearer ${hashParam.access_token}` }
        });
        // TODO: ADD LOGIC HERE TO ADD SONGS TO THE PLAYLIST FROM SAVED SONGS IN STATE
        dispatch(_createPlaylist(playlist.data)); 
    }
}

export default function userReducer(state = {}, action) {
    switch (action.type) {
        case CREATE_PLAYLIST:
            return action.playlist
        default: 
            return state;
    }
}