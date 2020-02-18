import React, { Component } from 'react'
import { Card, Button, CardTitle, CardText, Container, CardGroup } from 'reactstrap'
import { connect } from 'react-redux'
import { getGoals, deleteGoal } from '../actions/goalActions'
import PropTypes from 'prop-types'

class GoalsList extends Component {

    componentDidMount() {
        this.props.getGoals()
    }

    onDeleteClick = (id) => {
        this.props.deleteGoal(id)
    }

    render() {
        const { goals } = this.props.goal

        return (
            <Container>
                <CardGroup>
                    {goals.map(({ _id, title, description }) => (
                        <Card 
                        body inverse color="warning"
                        key={_id}
                        >
                        <CardTitle>{ title }</CardTitle>
                        <CardText>{ description }</CardText>
                        <Button 
                        color="secondary"
                        size="sm"
                        style={{ marginBottom: '0.5rem' }}
                        >Progress</Button>
                        <Button 
                        color="info"
                        size="sm"
                        style={{ marginBottom: '0.5rem' }}
                        >Edit</Button>
                        <Button
                        className="delete-btn"
                        color="danger"
                        size="sm"
                        onClick={this.onDeleteClick.bind(this, _id)}
                        >Delete
                        </Button>
                        </Card>
                    ))}
                </CardGroup>
            </Container>
        )
    }
}

GoalsList.propTypes = {
    getGoals: PropTypes.func.isRequired,
    goal: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
    goal: state.goal
})

export default connect(mapStateToProps, { getGoals, deleteGoal })(GoalsList)
