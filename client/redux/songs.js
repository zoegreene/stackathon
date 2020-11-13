import axios from 'axios';

const SET_SONGS = 'SET_SONGS';
const SET_MORE_SONGS = 'SET_MORE_SONGS';

export const setSavedSongs = songs => ({
    type: SET_SONGS,
    songs
});

export const setMoreSongs = songs => ({
    type: SET_MORE_SONGS,
    songs
});

export const getSavedSongs = accessToken => {
    return async (dispatch) => {
        try {
            const songs = await axios.get('https://api.spotify.com/v1/me/tracks', {
                headers: {
                    'Authorization': `Bearer ${accessToken}`
                }
            });
            dispatch(setSavedSongs(songs.data.items)); 
        }
        catch(err) {
            console.log(err);
        }
    }
}

export const getMoreSongs = accessToken => {
    return async (dispatch) => {
        try {
            const songs = await axios.get('https://api.spotify.com/v1/me/tracks', {
                params: {
                    limit: 20,
                    offset: 20
                },
                headers: {
                    'Authorization': `Bearer ${accessToken}`
                },

            });
            dispatch(setMoreSongs(songs.data.items)); 
        }
        catch(err) {
            console.log(err);
        }
    } 
}

export default function songsReducer(state = [], action) {
    switch (action.type) {
        case SET_SONGS:
            return action.songs;
        case SET_MORE_SONGS:
            return [...state, ...action.songs]
        default: 
            return state;
    }
}