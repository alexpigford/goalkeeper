import React, { Component } from 'react'
import { Card, Button, CardTitle, CardText, Container, CardGroup } from 'reactstrap'
import uuid from 'uuid'
import { connect } from 'react-redux'
import { getGoals } from '../actions/goalActions'
import PropTypes from 'prop-types'

class GoalsList extends Component {

    componentDidMount() {
        this.props.getGoals()
    }

    render() {
        const { goals } = this.props.goal

        return (
            <Container>
                <Button
                    color="secondary"
                    onClick={() => {
                        const title = prompt('Enter Title')
                        const description = prompt('Enter Description')
                        if (title && description) {
                            this.setState(state => ({
                                goals: [...state.goals, { id: uuid(), title, description }]
                            }))
                        }
                    }}
                >Add Goal</Button>
                <CardGroup>
                    {goals.map(({ id, title, description }) => (
                        <Card body inverse color="warning">
                        <CardTitle>{ title }</CardTitle>
                        <CardText>{ description }</CardText>
                        <Button 
                        color="secondary"
                        size="sm"
                        >Progress</Button>
                        <Button 
                        color="info"
                        size="sm"
                        >Edit</Button>
                        <Button
                        className="remove-btn"
                        color="danger"
                        size="sm"
                        onClick={() => {
                            this.setState(state => ({
                                goals: state.goals.filter(goal => goal.id !== id)
                            }))
                        }}
                        >Remove
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

export default connect(mapStateToProps, { getGoals })(GoalsList)
