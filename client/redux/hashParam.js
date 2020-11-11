
const SET_PARAM = 'SET_PARAM';

export const setParam = hashParam => ({
    type: SET_PARAM,
    hashParam
})

export const getParam = () => {
    return (dispatch) => {
        const hashParam = {};
        var e, r = /([^&;=]+)=?([^&;]*)/g,
        q = window.location.hash.substring(1);
        while ( e = r.exec(q)) {
            hashParam[e[1]] = decodeURIComponent(e[2]);
        }
        dispatch(setParam(hashParam));
    }

}

export default function paramReducer(state = {}, action) {
    switch (action.type) {
        case SET_PARAM:
            return action.hashParam
        default: 
            return state;
    }
}