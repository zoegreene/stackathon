import { combineReducers } from 'redux';
import userReducer from './user';
import songsReducer from './songs';

const reducer = combineReducers({
    user: userReducer,
    songs: songsReducer
});

export default reducer;