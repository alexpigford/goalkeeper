import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.css";
import "./App.css";
import { Container } from "reactstrap";

import AppNavBar from "./components/AppNavBar";
import GoalsList from "./components/GoalsList";
import AddGoalModal from "./components/AddGoalModal";

import { Provider } from "react-redux";
import store from "./store";
import { loadUser } from "./actions/authActions";

class App extends Component {
  componentDidMount() {
    store.dispatch(loadUser());
  }

  render() {
    return (

      // provider uses the store to share state to components
      <Provider store={store}>
        <div className="App">
          <AppNavBar />
          <Container>
            <AddGoalModal />
            <GoalsList />
          </Container>
        </div>
      </Provider>
    );
  }
}

export default App;
