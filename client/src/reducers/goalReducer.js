import uuid from 'uuid'
import { GET_GOALS, ADD_GOAL, DELETE_GOAL, EDIT_GOAL } from '../actions/types'

const initialState = {
    goals: [
        { id: uuid(), title: "testing", description: "testing" },
        { id: uuid(), title: "testing", description: "testing" },
        { id: uuid(), title: "testing", description: "testing" },
        { id: uuid(), title: "testing", description: "testing" },
        { id: uuid(), title: "testing", description: "bob" }
    ]
}

export default function(state = initialState, action) {
    switch(action.type) {
        case GET_GOALS:
            return {
                ...state
            }
        default:
            return state
        
    }
}