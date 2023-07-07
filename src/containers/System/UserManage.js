import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import './UserManager.scss';
import userService from '../../services/userService';
import ModalUser from './ModalUser';
import { Fade } from 'reactstrap';
import { emitter } from '../../utils/emitter';
import ModalEditUser from './ModalEditUser';
class UserManage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            arrUser: [],
            isOpenModalUser: false,
            isOpenModalEditUser: false,
            userEdit: {}
        }
    }
    state = {

    }

    async componentDidMount() {
        this.gettAllUserFromReact();
    }
    gettAllUserFromReact = async () => {
        let response = await userService.getAllUsers('ALL');
        if (response && response.errCode === 0) {
            this.setState({
                arrUser: response.users
            })
        }
    }
    handleAddNewUser = () => {
        this.setState({
            isOpenModalUser: true
        })
    }
    toggerUserModal = () => {
        this.setState({
            isOpenModalUser: !this.state.isOpenModalUser
        })
    }
    toggerEditUserModal = () => {
        this.setState({
            isOpenModalEditUser: !this.state.isOpenModalEditUser
        })
    }
    // Life circle
    // run component:
    // 1. run constructor -> init state
    // 2. Did mount(set state): gan gia tri cho bien, born,unmout
    // 3. render

    createNewUser = async (data) => {
        try {
            let response = await userService.createNewUserService(data);
            if (response && response.errCode !== 0) {
                alert(response.errMessage)
            } else {
                await this.gettAllUserFromReact();
                this.setState({
                    isOpenModalUser: false
                })
                emitter.emit('EVENT_CLEAR_MODAL_DATA')
            }
        } catch (error) {
            console.log(error)
        }
    }
    handleDeleteUser = async (user) => {
        console.log('CLick delete', user)
        try {
            let res = await userService.deleteUserServiceDelete(user.id);
            if (res && res.errCode === 0) {
                await this.gettAllUserFromReact()
            } else {
                alert(res.message)
            }
        } catch (error) {
            console.log(error)
        }
    }
    handleEditUser = (user) => {
        // console.log('Check edit user', user);
        this.setState({
            isOpenModalEditUser: true,
            userEdit: user
        })
    }
    doEditUser = async (user) => {
        try {
            let res = await userService.editUserService(user)
            if (res && res.errCode === 0) {
                this.setState({
                    isOpenModalEditUser: false
                })
                this.gettAllUserFromReact()
            } else {
                alert(res.errCode)
            }
        } catch (error) {
            console.log(error)
        }
    }
    render() {
        let arrUser = this.state.arrUser
        return (
            <div className="user-container">
                <ModalUser
                    isOpen={this.state.isOpenModalUser}
                    toggerFromParent={this.toggerUserModal}
                    createNewUser={this.createNewUser}
                />
                {
                    this.state.isOpenModalEditUser &&
                    <ModalEditUser
                        isOpen={this.state.isOpenModalEditUser}
                        toggerFromParent={this.toggerEditUserModal}
                        currentUser={this.state.userEdit}
                        editUser={this.doEditUser}
                    />
                }

                <div className='title text-center' >Manage users with me</div>
                <div className='mx-1'>
                    <button className='btn btn-primary px-3'
                        onClick={() => this.handleAddNewUser()}><i class="fas fa-plus"></i> Add New User</button>
                </div>
                <div className='user-table mt-3 mx-1'>
                    <table class="table  table-striped">
                        <thead class="thead-dark">
                            <tr>
                                <th scope="col">Email</th>
                                <th scope="col">First Name</th>
                                <th scope="col">Last Name</th>
                                <th scope="col">Address</th>
                                <th scope="col">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {arrUser && arrUser.map((item, index) => {
                                return (<tr>
                                    <td>{item.email}</td>
                                    <td>{item.firstName}</td>
                                    <td>{item.lastName}</td>
                                    <td>{item.address}</td>
                                    <td>
                                        <button className='btn-edit' onClick={() => this.handleEditUser(item)}><i className="fas fa-user-edit"></i></button>
                                        <button className='btn-delete' onClick={() => this.handleDeleteUser(item)}><i className="fas fa-trash"></i></button>
                                    </td>
                                </tr>)
                            })
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }

}
const mapStateToProps = state => {
    return {
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserManage);
