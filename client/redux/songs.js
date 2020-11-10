import axios from 'axios';

const SET_SONGS = 'SET_SONGS';

export const setSavedSongs = songs => ({
    type: SET_SONGS,
    songs
})

export const getSavedSongs = accessToken => {
    return async (dispatch) => {
        const songs = await axios.get('https://api.spotify.com/v1/me/tracks', {
            headers: {
                'Authorization': `Bearer ${accessToken}`
            },
            limit: 50
        });
        dispatch(setSavedSongs(songs.data.items)); 
    }
}

export default function songsReducer(state = [], action) {
    switch (action.type) {
        case SET_SONGS:
            return action.songs
        default: 
            return state;
    }
}