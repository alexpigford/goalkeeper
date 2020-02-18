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
import uuid from 'uuid'

class AddGoalModal extends Component {
    state = {
        modal: false,
        title: '',
        description: ''
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
            id: uuid(),
            title: this.state.title,
            description: this.state.description
        }

        this.props.addGoal(newGoal)

        this.toggle()
    }

    render() {
        return(
            <div>
                <Button
                    color="primary"
                    size="sm"
                    onClick={this.toggle}
                >New Goal</Button>
                <Modal
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
    goal: state.goal
})

export default connect(mapStateToProps, { addGoal })(AddGoalModal)