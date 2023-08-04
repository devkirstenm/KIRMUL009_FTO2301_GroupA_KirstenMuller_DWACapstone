// AppReducer: function that returns some state data; describes how the state is transferred into the next state 
// reducer tells how to store the data
export default (state, action) => {
    switch(action.type) {
        case "ADD_PODCAST_TO_WATCHLATER":
            return {
                ...state, // existing state
                watchlater: [action.payload, ...state.watchlist]
            }
        // default state = return state
        default:
            return state 
    }
}

// as you make more actions (object that tells the reducer how to change state)