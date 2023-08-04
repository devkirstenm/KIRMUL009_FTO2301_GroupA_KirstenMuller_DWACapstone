import React, {createContext, useReducer, useEffect} from 'react'
import AppReducer from "./AppReducer"

// initial state - the initial value of the store
const initialState = {
    watchlater: [], // empty array of podcasts
    favorites: [], // empty array of podcasts
}

// create context
export const GlobalContext = createContext(initialState); // export const so that we can access it from other variables

// provider
// made a provider to be able provide this to other components
// provides allows you to access the GlobalContext from other variables
export const GlobalProvider = props => {
    const [state, dispatch] = useReducer(AppReducer, initialState)

    //actions
    const addPodcastToWatchLater = podcast => {
        dispatch({ type: "ADD_PODCAST_TO_WATCHLATER, payload: podcast" })
    }

    return (
        <GlobalContext.Provider 
            value={{
                watchlater: state.watchlater, 
                favorites: state.favorites, 
                addPodcastToWatchlater,
            }}
        >
            {props.children}
        </GlobalContext.Provider>
    )
}