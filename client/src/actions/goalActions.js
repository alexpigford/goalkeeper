import axios from "axios";
import {
  GET_GOALS,
  ADD_GOAL,
  DELETE_GOAL,
  GOALS_LOADING
} from "./types";
import { tokenConfig } from "./authActions";
import { returnErrors } from "./errorActions";

export const getGoals = () => dispatch => {
  dispatch(setGoalsLoading());
  axios
    .get("/api/goals")
    .then(res =>
      dispatch({
        type: GET_GOALS,
        // response from api/goals route in backend
        payload: res.data
      })
    )
    .catch(err =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
};

export const addGoal = goal => (dispatch, getState) => {
  axios
    .post("/api/goals", goal, tokenConfig(getState))
    .then(res =>
      dispatch({
        type: ADD_GOAL,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
};

export const deleteGoal = id => (dispatch, getState) => {
  axios
    .delete(`/api/goals/${id}`, tokenConfig(getState))
    .then(res =>
      dispatch({
        type: DELETE_GOAL,
        payload: id
      })
    )
    .catch(err =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
};

export const setGoalsLoading = () => {
  return {
    type: GOALS_LOADING
  };
};
