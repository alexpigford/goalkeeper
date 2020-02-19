import React, { Component } from 'react'
import { 
    Button, 
    Modal, 
    ModalHeader, 
    ModalBody, 
    Form,
    FormGroup,
    Label,
    Input,
    NavLink,
    Alert    
} 
from 'reactstrap'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { register } from '../../actions/authActions'
import { clearErrors } from '../../actions/errorActions'

class RegisterModal extends Component {
    state = {
        modal: false,
        email: '',
        username: '',
        password: '',
        msg: null
    }

    static propTypes = {
        isAuthenticated: PropTypes.bool,
        error: PropTypes.object.isRequired,
        register: PropTypes.func.isRequired,
        clearErrors: PropTypes.func.isRequired
    }

    componentDidUpdate(prevProps) {
        const { error, isAuthenticated } = this.props
        if(error !== prevProps.error) {
            //CHECK FOR REGISTER ERROR
            if(error.id === 'REGISTER_FAIL') {
                this.setState({ msg: error.msg.msg })
            } else {
                this.setState({ msg: null })
            }
        }

        if(this.state.modal) {
            if(isAuthenticated) {
                this.toggle()
            }
        }
    }

    toggle = () => {
        this.props.clearErrors()
        this.setState({
            modal: !this.state.modal
        })
    }

    onChange = (e) => {
        this.setState({ [e.target.name]:e.target.value })
    }

    onSubmit = (e) => {
        e.preventDefault()

        const { email, username, password } = this.state

        const newUser = {
            email,
            username,
            password
        }

        this.props.register(newUser)

    }

    render() {
        return(
            <div>
                <NavLink 
                onClick={this.toggle}
                href="#"
                >Register
                </NavLink>
                <Modal
                    isOpen={this.state.modal}
                    toggle={this.toggle}
                >
                    <ModalHeader
                        toggle={this.toggle}
                    >Register
                    <ModalBody>
                        { this.state.msg ? <Alert color="danger">{ this.state.msg }</Alert> : null } 
                        <Form
                            onSubmit={this.onSubmit}
                        >
                            <FormGroup>

                                <Label for="email">Email</Label>
                                <Input
                                    type="email"
                                    name="email"
                                    id="email"
                                    placeholder="Enter Your Email"
                                    className="mb-3"
                                    onChange={this.onChange}
                                />

                                <Label for="username">Username</Label>
                                <Input
                                    type="text"
                                    name="username"
                                    id="username"
                                    placeholder="Enter Your Username"
                                    className="mb-3"
                                    onChange={this.onChange}
                                />

                                <Label for="password">Password</Label>
                                <Input
                                    type="password"
                                    name="password"
                                    id="password"
                                    placeholder="Enter Your Password"
                                    className="mb-3"
                                    onChange={this.onChange}
                                />

                                <Button
                                    color="success"
                                    size="sm"
                                    block
                                >Register
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
    isAuthenticated: state.auth.isAuthenticated,
    error: state.error
})

export default connect(mapStateToProps, { register, clearErrors })(RegisterModal)