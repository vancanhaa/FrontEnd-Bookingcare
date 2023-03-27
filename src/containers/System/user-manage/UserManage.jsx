import React, { Component } from "react";
import { connect } from "react-redux";
import {
  addNewUser,
  deleteUser,
  getAllUsers,
  getUserById,
  updateUser,
} from "../../../services/userService";
import ModalUpdateUser from "../modal-update-user/ModalUpdateUser";
import ModalUser from "../modal-user/ModalUser";
import "./user-manage.scss";
class UserManage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listUsers: [],
      isOpenModal: false,
      isOpenModalUpdate: false,
      idUser: null,
    };
  }

  async componentDidMount() {
    const { listUsers } = await getAllUsers();
    this.setState({
      listUsers: [...listUsers],
    });
  }
  handleOpenModalUser = () => {
    this.setState({
      isOpenModal: true,
    });
  };

  handleCloseModalUser = () => {
    this.setState({
      isOpenModal: false,
    });
  };

  handleAddNewUser = async (data) => {
    const response = await addNewUser(data);
    const { listUsers } = await getAllUsers();
    this.setState({
      listUsers: [...listUsers],
      isOpenModal: false,
    });
  };

  handleUpdateUser = async (id, data) => {
    const response = await updateUser(id, data);
    const { listUsers } = await getAllUsers();
    this.setState({
      listUsers: [...listUsers],
    });
    this.handleCloseModalUpdate();
  };

  handleDeleteUser = async (id) => {
    console.log(id);
    const response = await deleteUser(id);
    const { listUsers } = await getAllUsers();
    this.setState({
      listUsers: [...listUsers],
    });
    this.handleCloseModalUpdate();
  };

  handleCloseModalUpdate = () => {
    this.setState({
      isOpenModalUpdate: false,
    });
  };
  handleOpenModalUpdate = (id) => {
    this.setState({
      isOpenModalUpdate: true,
      idUser: id,
    });
  };

  render() {
    const listUsers = this.state.listUsers;
    return (
      <div className="users-container container-fluid">
        <div className="title text-center">Manage users with CanhPham</div>
        <div className="mx-1">
          <button
            className="btn btn-primary px-3"
            onClick={this.handleOpenModalUser}
          >
            <i className="fas fa-plus mr-2"></i>Add new user
          </button>
        </div>
        <table className="table table-striped text-center mt-3 table-bordered">
          <thead className="bg-success text-white">
            <tr className="d-flex">
              <th className="col-1">ID</th>
              <th className="col-1">First Name</th>
              <th className="col-1">Last Name</th>
              <th className="col-2">Email</th>
              <th className="col-1">Phone number</th>
              <th className="col-1">Sex</th>
              <th className="col-1">Role</th>
              <th className="col-3">Address</th>
              <th className="col-1">Action</th>
            </tr>
          </thead>
          <tbody>
            {listUsers.map((user, index) => {
              const {
                id,
                first_name,
                last_name,
                email,
                phone_number,
                gender,
                role_id,
                address,
              } = user;
              let role = "";
              switch (role_id) {
                case "1":
                  role = "admin";
                  break;
                case "2":
                  role = "doctor";
                  break;
                default:
                  role = "patient";
                  break;
              }
              return (
                <tr key={index} className="d-flex">
                  <th className="col-1">{id}</th>
                  <td className="col-1">{first_name}</td>
                  <td className="col-1">{last_name}</td>
                  <td className="col-2">{email}</td>
                  <td className="col-1">{phone_number}</td>
                  <td className="col-1">{gender ? "Male" : "Female"}</td>
                  <td className="col-1">{role}</td>
                  <td className="col-3">{address}</td>
                  <td className="col-1">
                    <div className="btn-wrap">
                      <button
                        className="btn btn-info btn--edit"
                        onClick={() => this.handleOpenModalUpdate(id)}
                      >
                        Edit
                      </button>
                      <button
                        className="btn btn-danger btn--delete"
                        onClick={() => this.handleDeleteUser(id)}
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        {this.state.isOpenModal && (
          <ModalUser
            className={"modal-user"}
            isOpen={this.state.isOpenModal}
            handleCloseModalUser={this.handleCloseModalUser}
            handleOpenModalUser={this.handleOpenModalUser}
            handleAddNewUser={this.handleAddNewUser}
          />
        )}
        {this.state.isOpenModalUpdate && (
          <ModalUpdateUser
            className={"modal-update-user"}
            isOpen={this.state.isOpenModalUpdate}
            handleClose={this.handleCloseModalUpdate}
            handleUpdateUser={this.handleUpdateUser}
            idUser={this.state.idUser}
          />
        )}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(UserManage);
