import axios from 'axios';

const SET_USER = 'SET_USER';

export const setUser = user => ({
    type: SET_USER,
    user
})

export const getUser = accessToken => {
    return async (dispatch) => {
        try {
            const user = await axios.get('https://api.spotify.com/v1/me', {
                headers: {
                    'Authorization': `Bearer ${accessToken}`
                }
            });
            dispatch(setUser(user.data)); 
        }
        catch(err) {
            console.log(err);
        }
    }
}

export default function userReducer(state = {}, action) {
    switch (action.type) {
        case SET_USER:
            return action.user
        default: 
            return state;
    }
}