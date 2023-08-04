import React, {createContext, useReducer, useEffect} from 'react'
import AppReducer from "./AppReducer"

// initial state: - the initial value of the store (store = a central container that holds the state of the application and allows components to access and update that state.)
const initialState = {
    // check if there's anything in local storage
    watchlater: localStorage.getItem('watchlater') 
        ? JSON.parse(localStorage.getItem('watchlater')) // if there's podcasts stored, return them (convert string back to array of data)
        : [], // otherwise return empty array of podcasts
    favorites: [], // empty array of podcasts
}

// create context:
export const GlobalContext = createContext(initialState); // export const so that we can access it from other variables

// provider components:
// made a provider to be able provide this to other components
// provides allows you to access the GlobalContext from other variables
export const GlobalProvider = (props) => {
    const [state, dispatch] = useReducer(AppReducer, initialState) // created reducer called appreducer

    // store in localStorage
    // useEffect is triggered whenever the state changes inside the provider (e.g., when podcast is added to watchlater list)
    useEffect(() => {
        // whenever this is triggered, save to my local storage the 'watchlater'
        localStorage.setItem('watchlater', JSON.stringify(state.watchlater)) // has to be string in local storage, at the moment its an array
    }, [state])
    // check it's added to localStorage: chrome > inspect > application > local storage

    // actions:
    const addPodcastToWatchlater = (podcast) => { // provide with podcast data
        // dispatch a type. payload = podcast data
        dispatch({ type: "ADD_PODCAST_TO_WATCHLATER", payload: podcast })
    }

    // return statements explanations:
    // value: the values available form the provider
    // {props.children} wraps all the elements of the application to access the global context from every component

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


/**
 * EXPLANATION about Context Api
 * - so we've looked at React hooks in terms of using the state, but now we need a global state
- so when user presses "add to watchlater", it adds it to the context api and we'r able to access the watchlist from any component across the application
the only other way to do this is by passing stuff through to components as props, which we dont want to do, we want to be able to easily access our data from any component and we can do that with the context api
we gonna amke a new folder context and make a file globalstate where well make our context instead which will alow us to access our data from any component
 */