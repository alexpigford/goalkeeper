import React, { Component } from "react";
import {
  Card,
  Button,
  CardTitle,
  CardText,
  Container,
  CardDeck
} from "reactstrap";
import { connect } from "react-redux";
import { getGoals, deleteGoal } from "../actions/goalActions";
import PropTypes from "prop-types";

class GoalsList extends Component {
  // propTypes holds the type of data passed to the component
  // validates data type for component
  static propTypes = {
    getGoals: PropTypes.func.isRequired,
    // goal represents state object
    goal: PropTypes.object.isRequired,
    isAuthenticated: PropTypes.bool
  };

  componentDidMount() {
    this.props.getGoals();
  }

  onDeleteClick = id => {
    this.props.deleteGoal(id);
  };

  render() {
    // destructure state as this.props.goal
    const { goals } = this.props.goal;

    return (
      <Container className="container">
        <CardDeck>
          {goals.map(({ _id, title, description }) => (
            <Card body inverse color="warning" key={_id}>
              <CardTitle>{title}</CardTitle>
              <CardText>{description}</CardText>

              {this.props.isAuthenticated ? (
                <Button
                  color="success"
                  size="sm"
                  style={{ marginBottom: "0.5rem" }}
                  onClick={this.onDeleteClick.bind(this, _id)}
                >
                  Done!
                </Button>
              ) : null}
            </Card>
          ))}
        </CardDeck>
      </Container>
    );
  }
}

// gets state from Redux
// maps to component properties so data can be used
// this.props.goal
const mapStateToProps = state => ({
  // "goal" comes from rootReducer where goal: goalReducer
  goal: state.goal,
  isAuthenticated: state.auth.isAuthenticated
});

// connect react to redux
// export component with its actions, and state as props
export default connect(mapStateToProps, { getGoals, deleteGoal })(GoalsList);
