import axios from 'axios'
import { GET_GOALS, ADD_GOAL, DELETE_GOAL, EDIT_GOAL, GOALS_LOADING } from './types'

export const getGoals = () => dispatch => {
    dispatch(setGoalsLoading())
    axios.get('/api/goals')
        .then(res => dispatch({
            type: GET_GOALS,
            payload: res.data
        })
    )
}

export const addGoal = goal => {
    return {
        type: ADD_GOAL,
        payload: goal
    }
}

export const deleteGoal = (id) => {
    return {
        type: DELETE_GOAL,
        payload: id
    }
}

export const setGoalsLoading = () => {
    return {
        type: GOALS_LOADING
    }
} 