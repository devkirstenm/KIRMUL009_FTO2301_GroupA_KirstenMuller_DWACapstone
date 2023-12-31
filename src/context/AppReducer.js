// AppReducer: function that returns some state data; describes how the state is transferred into the next state 
// reducer explains how to store the data
export default (state, action) => {
    switch(action.type) {
        case "ADD_PODCAST_TO_WATCHLATER":
            return {
                ...state, // existing state
                watchlater: [action.payload, ...state.watchlater]
            }
        case "REMOVE_PODCAST_FROM_WATCHLATER":
            return {
                ...state, 
                watchlater: state.watchlater.filter(
                    (podcast) => podcast.id !== action.payload // remove the id
                )
            }
        // default state = return state
        default:
            return state 
    }
}

// as you make more actions (object that tells the reducer how to change state)