import React, { Component } from 'react'
import { Card, Button, CardTitle, CardText, Container, CardDeck } from 'reactstrap'
import { connect } from 'react-redux'
import { getGoals, deleteGoal } from '../actions/goalActions'
import PropTypes from 'prop-types'

class GoalsList extends Component {

    static propTypes = {
        getGoals: PropTypes.func.isRequired,
        goal: PropTypes.object.isRequired,
        isAuthenticated: PropTypes.bool
    }

    componentDidMount() {
        this.props.getGoals()
    }

    onDeleteClick = (id) => {
        this.props.deleteGoal(id)
    }

    render() {
        const { goals } = this.props.goal

        return (
            <Container className="container">
                <CardDeck>
                    {goals.map(({ _id, title, description }) => (
                        <Card 
                        body inverse color="warning"
                        key={_id}
                        >
                        <CardTitle>{ title }</CardTitle>
                        <CardText>{ description }</CardText>

                        { this.props.isAuthenticated ? 

                        <Button 
                        color="success"
                        size="sm"
                        style={{ marginBottom: '0.5rem' }}
                        onClick={this.onDeleteClick.bind(this, _id)}
                        >Done!</Button>
                        : null
                        }
                        {/* <Button 
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
                        </Button> */}
                        </Card>
                    ))}
                </CardDeck>
            </Container>
        )
    }
}

const mapStateToProps = (state) => ({
    goal: state.goal,
    isAuthenticated: state.auth.isAuthenticated
})

export default connect(mapStateToProps, { getGoals, deleteGoal })(GoalsList)
