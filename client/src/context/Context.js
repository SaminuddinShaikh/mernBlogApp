import { createContext, useEffect, useReducer } from "react";
import Reducer from "./Reducer";

const INITIAL_STATE = {
    user:JSON.parse(localStorage.getItem("user")) || null,   //user:null, usre is key in local storage
    isFetching:false,
    error:false,
};

export const Context = createContext(INITIAL_STATE);

export const ContextProvider = ({children}) => {
    const [state, dispatch] = useReducer(Reducer, INITIAL_STATE);

    useEffect(()=>{
        localStorage.setItem("user",JSON.stringify(state.user));  //to store in local storage
    },[state.user])

    return(
        <Context.Provider
         value = {{
            user: state.user,                                   
            isFetching: state.isFetching,
            error: state.error,
            dispatch,
        }}
        >
            {children}
        </Context.Provider>    //use context.provider in indexJS
    )
}