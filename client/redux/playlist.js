import axios from 'axios';

const CREATE_PLAYLIST = 'CREATE_PLAYLIST';

export const _createPlaylist = playlist => ({
    type: CREATE_PLAYLIST,
    playlist
});

export const createPlaylist = (user, hashParam, name, duration, savedSongs) => {
    return async (dispatch) => {
        try {
            // If name is blank give it a default value
            name === '' ? name = 'Cut for Time Playlist' : name;
            // CREATE PLAYLIST
            let playlist = (await axios.post(`https://api.spotify.com/v1/users/${user.id}/playlists`, {
                name: name,
                description: "Playlist created by Cut for Time app",
                public: false
            }, {
                headers: { 'Authorization': `Bearer ${hashParam.access_token}` }
            })).data;

            // FIND ARRAY OF SONGS THAT MEETS CRITERIA
            // const simpleSavedSongs = await Promise.all(savedSongs.map( async (song) => {
            //     const songLength = await getSongLength(song.track.id, hashParam);
            //     return { 
            //         songId: song.track.id,
            //         songLength: Math.round(songLength)
            //     }
            // }));

            const simpleSavedSongs = [];
            for (let i = 0; i < savedSongs.length; i++) {
                const songLength = await getSongLength(savedSongs[i].track.id, hashParam);
                simpleSavedSongs.push ( { 
                    songId: savedSongs[i].track.id,
                    songLength: Math.round(songLength)
                } );
            }

            let songsToAdd = knapsack(simpleSavedSongs, duration * 60);

            // STORE THOSE SONGS INTO THE NEWLY CREATED PLAYLIST
            // format JSON object for request body
            songsToAdd = [...songsToAdd].map(song => `spotify:track:${song.songId}`);
            // Don't save the result, you want the playlist ID to be stored in the store
            await axios.post(`https://api.spotify.com/v1/playlists/${playlist.id}/tracks`, {
                "uris": songsToAdd
            }, {
                headers: { 'Authorization': `Bearer ${hashParam.access_token}` }
            });

            dispatch(_createPlaylist(playlist)); 
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

export const getSavedSongsDuration = async (savedSongs, hashParam) => {
    let duration = await Promise.all(savedSongs.map( async (song) => {
        const songLength = await getSongLength(song.track.id, hashParam);
        return songLength;
    }));
    return duration.reduce((sum, elem) => sum + elem);
}

class Playlist extends Set {
    constructor() {
        super();
        this.duration = 0;
    }
    add(song) {
        super.add(song);
        this.duration += song.songLength;
    }
}

const knapsack = (savedSongs, duration) => {
    let cache = [];

    // set up empty cache matrix
    for (let x = 0; x < savedSongs.length + 1; x++) {
        cache[x] = [];
        for (let y = 0; y < duration + 1; y++) {
            cache[x][y] = new Playlist;
        }
    }

    const weights = savedSongs.map(song => song.songLength);
    const values = savedSongs;

    
    for (let i = 0; i < savedSongs.length + 1; i++) {
        for (let j = 0; j < duration + 1; j++) {
            if (i === 0 || j === 0 ) {
                cache[i][j] = new Playlist;
            } else if (weights[i - 1] <= j) {
                const excluded = new Playlist;
                cache[i - 1][j].forEach(song => excluded.add(song));
                const included = new Playlist;
                cache[i - 1][j - weights[i - 1]].forEach(song => included.add(song))
                included.add(values[i - 1]);

                cache[i][j] = included.duration > excluded.duration ? included : excluded;
            } else {
                cache[i][j] = cache[i - 1][j];
            }
        }
    }
    return cache[savedSongs.length][duration];
}

// ALTERNATE ALGORITHM FOR KNAPSACK:

// const knapsack = (savedSongs, duration) => {
//     let cache = [];

//     // set up empty cache matrix
//     for (let x = 0; x < savedSongs.length + 1; x++) {
//         cache[x] = [];
//         for (let y = 0; y < duration + 1; y++) {
//             cache[x][y] = [];
//         }
//     }

//     const weights = savedSongs.map(song => song.songLength);
//     const values = savedSongs.map(song => song.songId);

    
//     for (let i = 0; i < savedSongs.length + 1; i++) {
//         for (let j = 0; j < duration + 1; j++) {
//             if (i === 0 || j === 0 ) {
//                 cache[i][j] = [];
//             } else if (weights[i - 1] <= j) {
//                 const copy = [...cache[i - 1][j - weights[i - 1]]];
//                 copy.push(values[i - 1]);
//                 const included = copy;
//                 const excluded = cache[i - 1][j];
//                 cache[i][j] = getPlaylistDuration(included, savedSongs) > getPlaylistDuration(excluded, savedSongs) ? included : excluded;
//             } else {
//                 cache[i][j] = cache[i - 1][j];
//             }
//         }
//     }
//     return cache[savedSongs.length][duration];
// }


// const getPlaylistDuration = (playlist, savedSongs) => {
//     return playlist.length > 0 ? 
//         playlist.reduce((sum, elem) => {
//             return savedSongs.find(song => song.songId === elem).songLength + sum;
//         }, 0) : 0;
// }

export default function userReducer(state = {}, action) {
    switch (action.type) {
        case CREATE_PLAYLIST:
            return action.playlist
        default: 
            return state;
    }
}