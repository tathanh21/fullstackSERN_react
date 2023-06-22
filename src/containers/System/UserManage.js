import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import './UserManager.scss';
import userService from '../../services/userService';
import ModelUser from './ModelUser';
class UserManage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            arrUser: [],
            isOpenModalUser: false
        }
    }
    state = {

    }

    async componentDidMount() {
        let response = await userService.getAllUsers('ALL');
        if (response && response.errCode === 0) {
            this.setState({
                arrUser: response.users
            })
        }
        console.log('data get user', response);
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
    // Life circle
    // run component:
    // 1. run constructor -> init state
    // 2. Did mount(set state): gan gia tri cho bien, born,unmout
    // 3. render
    render() {
        let arrUser = this.state.arrUser
        return (
            <div className="user-container">
                <ModelUser
                    isOpen={this.state.isOpenModalUser}
                    toggerFromParent={this.toggerUserModal}
                />

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
                                        <button className='btn-edit'><i class="fas fa-user-edit"></i></button>
                                        <button className='btn-delete'><i class="fas fa-trash"></i></button>
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
