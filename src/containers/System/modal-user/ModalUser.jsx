import React, { Component } from "react";
import { connect } from "react-redux";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Row,
  Col,
  FormGroup,
  Input,
  Label,
  Form,
} from "reactstrap";

class ModalUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false,
    };
  }
  handleSubmit = async (e) => {
    e.preventDefault();
    const arrValueForm = Array.from(e.target);
    let valueObject = {};
    arrValueForm.forEach((item) => {
      valueObject[`${item.name}`] = item.value;
    });
    await this.props.handleAddNewUser(valueObject);
  };
  render() {
    return (
      <Modal
        size="lg"
        isOpen={this.props.isOpen}
        toggle={this.props.handleCloseModalUser}
        className={this.props.className}
      >
        <ModalHeader toggle={this.toggle}>Create a new user</ModalHeader>
        <ModalBody>
          <Form id="form-add-user" onSubmit={this.handleSubmit}>
            <Row>
              <Col md={6}>
                <FormGroup>
                  <Label for="email">Email</Label>
                  <Input
                    id="email"
                    name="email"
                    placeholder="Enter your email"
                    type="email"
                  />
                </FormGroup>
              </Col>
              <Col md={6}>
                <FormGroup>
                  <Label for="password">Password</Label>
                  <Input
                    id="password"
                    name="password"
                    placeholder="Enter your password"
                    type="password"
                  />
                </FormGroup>
              </Col>
            </Row>
            <Row>
              <Col md={6}>
                <FormGroup>
                  <Label for="first_name">First Name</Label>
                  <Input
                    id="first_name"
                    name="firstName"
                    placeholder="Enter your First Name"
                    type="text"
                  />
                </FormGroup>
              </Col>
              <Col md={6}>
                <FormGroup>
                  <Label for="last_name">Last Name</Label>
                  <Input
                    id="last_name"
                    name="lastName"
                    placeholder="Enter your Last Name"
                    type="text"
                  />
                </FormGroup>
              </Col>
            </Row>
            <FormGroup>
              <Label for="address">Address</Label>
              <Input
                id="address"
                name="address"
                placeholder="Enter your address"
              />
            </FormGroup>

            <Row>
              <Col md={6}>
                <FormGroup>
                  <Label for="phone_number">Phone Number</Label>
                  <Input id="phone_number" name="phoneNumber" type="text" />
                </FormGroup>
              </Col>
              <Col md={3}>
                <FormGroup>
                  <Label for="gender">Sex</Label>
                  <Input id="gender" name="gender" type="select">
                    <option value="1">Male</option>
                    <option value="0">Female</option>
                  </Input>
                </FormGroup>
              </Col>
              <Col md={3}>
                <FormGroup>
                  <Label for="role">Role</Label>
                  <Input id="role" name="roleId" type="select">
                    <option value="1">Admin</option>
                    <option value="2">Doctor</option>
                    <option value="3">Patient</option>
                  </Input>
                </FormGroup>
              </Col>
            </Row>
          </Form>
        </ModalBody>
        <ModalFooter>
          <Button
            form="form-add-user"
            type="submit"
            color="primary"
            style={{ minWidth: "20%", padding: "0 5px" }}
          >
            Add new users
          </Button>{" "}
          <Button
            color="secondary"
            onClick={this.props.handleCloseModalUser}
            style={{ minWidth: "20%", padding: "0 5px" }}
          >
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
    );
  }
}

const mapStatetoProps = (state) => {
  return {};
};

const mapDispatchProps = (dispatch) => {
  return {};
};

export default connect(mapStatetoProps, mapDispatchProps)(ModalUser);
