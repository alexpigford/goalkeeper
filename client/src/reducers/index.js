import { combineReducers } from 'redux'
import goalReducer from './goalReducer'
import authReducer from './authReducer'
import errorReducer from './errorReducer'

export default combineReducers({
    goal: goalReducer,
    auth: authReducer,
    error: errorReducer
})