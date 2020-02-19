import React, { Component } from 'react'
import { 
    Button, 
    Modal, 
    ModalHeader, 
    ModalBody, 
    Form,
    FormGroup,
    Label,
    Input    
} 
from 'reactstrap'
import { connect } from 'react-redux'
import { addGoal } from '../actions/goalActions'
import PropTypes from 'prop-types'

class AddGoalModal extends Component {
    state = {
        modal: false,
        title: '',
        description: ''
    }

    static propTypes = {
        isAuthenticated: PropTypes.bool
    }

    toggle = () => {
        this.setState({
            modal: !this.state.modal
        })
    }

    onChange = (e) => {
        this.setState({ [e.target.name]:e.target.value })
    }

    onSubmit = (e) => {
        e.preventDefault()

        const newGoal = {
            title: this.state.title,
            description: this.state.description
        }

        this.props.addGoal(newGoal)

        this.toggle()
    }

    render() {
        return(
            <div>
                { this.props.isAuthenticated ? 
                    <Button
                    color="primary"
                    size="sm"
                    onClick={this.toggle}
                    style={{ marginBottom: '2rem' }}
                    >New Goal</Button>
                :
                <h4 className="mb-3 ml-4">Please login to add a goal.</h4>
            }



                <Modal
                    className="add"
                    isOpen={this.state.modal}
                    toggle={this.toggle}
                >
                    <ModalHeader
                        toggle={this.toggle}
                    >Add to Your Goals
                    <ModalBody>
                        <Form
                            onSubmit={this.onSubmit}
                        >
                            <FormGroup>
                                <Label for="goal">Goal</Label>
                                <Input
                                    type="text"
                                    name="title"
                                    id="goal"
                                    placeholder="Title Your Goal"
                                    onChange={this.onChange}
                                />
                                <Input
                                    type="text"
                                    name="description"
                                    id="goal"
                                    placeholder="Enter Goal Description"
                                    onChange={this.onChange}
                                />
                                <Button
                                    color="success"
                                    size="sm"
                                    block
                                >Create Goal
                                </Button>
                            </FormGroup>

                        </Form>
                    </ModalBody>
                    </ModalHeader>
                </Modal>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    goal: state.goal,
    isAuthenticated: state.auth.isAuthenticated
})

export default connect(mapStateToProps, { addGoal })(AddGoalModal)