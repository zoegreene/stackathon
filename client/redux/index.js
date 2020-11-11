import { combineReducers } from 'redux';
import userReducer from './user';
import songsReducer from './songs';
import paramReducer from './hashParam';
import playlistReducer from './playlist';

const reducer = combineReducers({
    user: userReducer,
    songs: songsReducer,
    hashParam: paramReducer,
    playlist: playlistReducer
});

export default reducer;