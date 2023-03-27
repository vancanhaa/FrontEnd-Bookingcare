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
import { getUserById } from "../../../services";
import "./modal-update-user.scss";

class ModalUpdateUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: "",
      lastName: "",
      address: "",
      phoneNumber: "",
      gender: 1,
      roleId: 3,
    };
  }

  async componentDidMount() {
    const userInfo = await getUserById(this.props.idUser);
    const { first_name, last_name, address, gender, role_id, phone_number } =
      userInfo;
    this.setState({
      firstName: first_name,
      lastName: last_name,
      address: address,
      phoneNumber: phone_number,
      gender: gender,
      roleId: role_id,
    });

    console.log(this.state);
  }

  handleSubmit = async (e) => {
    e.preventDefault();
    const arrValueForm = Array.from(e.target);
    let valueObject = {};
    arrValueForm.forEach((item) => {
      valueObject[`${item.name}`] = item.value;
    });
    await this.props.handleUpdateUser(this.props.idUser, valueObject);
  };

  handleOnchangeInput = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };
  render() {
    console.log(this.state);
    return (
      <Modal
        size="lg"
        isOpen={this.props.isOpen}
        toggle={this.props.handleClose}
        className={this.props.className}
      >
        <ModalHeader>Update a user</ModalHeader>
        <ModalBody>
          <Form id="form-update-user" onSubmit={this.handleSubmit}>
            <Row>
              <Col md={6}>
                <FormGroup>
                  <Label for="first_name">First Name</Label>
                  <Input
                    id="first_name"
                    name="firstName"
                    placeholder="Enter your First Name"
                    type="text"
                    onChange={(e) => this.handleOnchangeInput(e)}
                    value={this.state.firstName}
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
                    onChange={(e) => this.handleOnchangeInput(e)}
                    value={this.state.lastName}
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
                onChange={(e) => this.handleOnchangeInput(e)}
                value={this.state.address}
              />
            </FormGroup>

            <Row>
              <Col md={6}>
                <FormGroup>
                  <Label for="phone_number">Phone Number</Label>
                  <Input
                    id="phone_number"
                    name="phoneNumber"
                    type="text"
                    onChange={(e) => this.handleOnchangeInput(e)}
                    value={this.state.phoneNumber}
                  />
                </FormGroup>
              </Col>
              <Col md={3}>
                <FormGroup>
                  <Label for="gender">Sex</Label>
                  <Input
                    id="gender"
                    name="gender"
                    type="select"
                    onChange={(e) => this.handleOnchangeInput(e)}
                    value={this.state.gender ? "1" : "0"}
                  >
                    onChange={(e) => this.handleOnchangeInput(e)}
                    <option value="1">Male</option>
                    onChange={(e) => this.handleOnchangeInput(e)}
                    <option value="0">Female</option>
                  </Input>
                </FormGroup>
              </Col>
              <Col md={3}>
                <FormGroup>
                  <Label for="role">Role</Label>
                  <Input
                    id="role"
                    name="roleId"
                    type="select"
                    onChange={(e) => this.handleOnchangeInput(e)}
                    value={this.state.roleId}
                  >
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
            form="form-update-user"
            type="submit"
            color="primary"
            style={{ minWidth: "20%", padding: "0 5px" }}
          >
            Save
          </Button>{" "}
          <Button
            color="secondary"
            onClick={this.props.handleClose}
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

export default connect(mapStatetoProps, mapDispatchProps)(ModalUpdateUser);
