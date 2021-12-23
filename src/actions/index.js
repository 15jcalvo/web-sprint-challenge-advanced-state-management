import axios from 'axios';

export const SET_SMURFS = "SET_SMURFS"
export const START_FETCH = "START_FETCH"
export const END_FETCH = "END_FETCH"
export const SET_ERROR = "SET_ERROR"
export const ADD_SMURF = "ADD_SMURF"

export const fetchSmurfs = () => {
    return (dispatch) => {
        dispatch({ type: START_FETCH })
        axios.get(`http://localhost:3333/smurfs`)
            .then(res=>{
                dispatch({ type: SET_SMURFS, payload: res.data })
                dispatch({ type: END_FETCH })
            })
            .catch(err=>{
                console.log(err)
                setError(err.response.data.error)
            })
    }
}

export const addSmurf = (smurf) => {
    return (dispatch) => {
        axios.post(`http://localhost:3333/smurfs`, {
            id: "randomletters",
            name: smurf.name,
            position: smurf.position,
            nickname: smurf.nickname,
            description: smurf.description
        })
            .then(res=> {
                console.log(res)
                dispatch({ type: SET_SMURFS, payload: res.data })
            })
            .catch(err=>{
                console.log(err.response.data.error)
                setError(err.response.data.error)
            })
    }
}

export const setSmurfs = (smurfs) => {
    console.log('set')
    return{ type: SET_SMURFS, payload: smurfs } }
export const setError = (error) => {
    return{ type: SET_ERROR, payload: error } }

//Task List:
//1. Add a thunk action called fetchSmurfs that triggers a loading status display in our application, performs an axios call to retreive smurfs from our server, saves the result of that call to our state and shows an error if one is made.
//2. Add a standard action that allows us to add new smurf (including the name, nickname, position, summary)
//3. Add a standard action that allows us to set the value of the error message slice of state.