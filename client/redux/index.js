import { combineReducers } from 'redux';
import userReducer from './user';
import songsReducer from './songs';
import paramReducer from './hashParam';

const reducer = combineReducers({
    user: userReducer,
    songs: songsReducer,
    hashParam: paramReducer
});

export default reducer;