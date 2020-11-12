import axios from 'axios';
import { get } from 'jquery';

const CREATE_PLAYLIST = 'CREATE_PLAYLIST';

export const _createPlaylist = playlist => ({
    type: CREATE_PLAYLIST,
    playlist
});

export const createPlaylist = (user, hashParam, name, duration, savedSongs) => {
    return async (dispatch) => {
        console.log('about to try with duration', typeof duration);
        try {
            // CREATE PLAYLIST
            // const playlist = await axios.post(`https://api.spotify.com/v1/users/${user.id}/playlists`, {
            //     name: name,
            //     description: "Playlist created by Cut for Time app",
            //     public: false
            // }, {
            //     headers: { 'Authorization': `Bearer ${hashParam.access_token}` }
            // });

            // FIND ARRAY OF SONGS THAT MEETS CRITERIA
            console.log('before knapsack');
            const simpleSavedSongs = savedSongs.map(song => {
                return { 
                    songId: song.track.id,
                    songLength: getSongLength(song.track.id, hashParam)
                }
            });
            console.log(simpleSavedSongs);
            const songsToAdd = knapsack(duration * 60, simpleSavedSongs, simpleSavedSongs.length);
            console.log('songs to add: ', songsToAdd);

            // STORE THOSE SONGS INTO THE NEWLY CREATED PLAYLIST

            // const songLengths = savedSongs.map(song => getSongLength(song.track.id, hashParam));
            // console.log(getPlaylistDuration(savedSongs, hashParam));
            // console.log('savedSongs', savedSongs);
            // dispatch(_createPlaylist(playlist.data)); 
        }
        catch(err) {
            console.log(err);
        }
    }
}

// Helper function to get the length of any given song
const getSongLength = async (songId, hashParam) => {
    const songLength = await axios.get(`https://api.spotify.com/v1/audio-analysis/${songId}`, {
        headers: { 'Authorization': `Bearer ${hashParam.access_token}` }
    });
    return songLength.data.track.duration;
}

const getPlaylistDuration = (playlist) => {
    const duration = playlist.length > 0 ? 
        playlist.reduce((sum, song) => sum + song.songLength, 0) : 0;
    return duration;
}

const knapsack = (runningDuration, savedSongs, n, playlist = []) => {
    console.log('playlist', playlist);
    // Base case
    if (runningDuration === 0 || n === 0) {
        return playlist;
    }
    if (savedSongs[n - 1].songLength > runningDuration) {
        return knapsack(runningDuration, savedSongs, n - 1, playlist);
    }
    else {
        const newPlaylist = [...playlist];
        newPlaylist.push(savedSongs[n - 1]);
        let included = knapsack(runningDuration - savedSongs[n - 1].songLength, savedSongs, n - 1, newPlaylist);
        let excluded = knapsack(runningDuration, savedSongs, n - 1, playlist);
        if (getPlaylistDuration(included) > getPlaylistDuration(excluded)) {
            return included;
        } else {
            return excluded;
        }
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