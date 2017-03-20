var UserRow = React.createClass({
    render: function() {
    return (
        <tr>
            <td>{this.props.user.f_name}</td>
            <td>{this.props.user.l_name}</td>
            <td>{this.props.user.email}</td>
            <td>{this.props.user.membership_name}</td>
            <td>
                <a href='#'
                    onClick={() => this.props.changeAppMode('readOne', this.props.user.id)}
                    className='btn btn-info m-r-1em'> Read
                </a>
                <a href='#'
                    onClick={() => this.props.changeAppMode('update', this.props.user.id)}
                    className='btn btn-primary m-r-1em'> Edit
                </a>
            </td>
        </tr>
        );
    }
});

var UsersTable = React.createClass({
    render: function() {

    var rows = this.props.users
        .map(function(user, i) {
            return (
                <UserRow
                    key={i}
                    user={user}
                    changeAppMode={this.props.changeAppMode} />
            );
        }.bind(this));

        return(
            !rows.length
                ? <div className='alert alert-danger'>No users found.</div>
                :
                <table className='table table-bordered table-hover' id='myTable'>
                    <thead>
                        <tr>
                            <th>First Name</th>
                            <th>Last Name</th>
                            <th>Email</th>
                            <th>Membership</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {rows}
                    </tbody>
                </table>
        );
    }
});

var CreateUserComponent = React.createClass({
  getInitialState: function() {
    return {
        memberships: [],
        selectedMembershipId: -1,
        f_name: '',
        l_name: '',
        email: '',
        password: '',
        dob: '',
        successCreation: null
    };
  },
  componentDidMount: function() {
    this.serverRequest = $.post("api/read_all_memberships.php", function (memberships) {
        this.setState({
            memberships: JSON.parse(memberships)
        });
    }.bind(this));

    $('.page-header h1').text('Create User');
  },
  componentWillUnmount: function() {
    this.serverRequest.abort();
  },
  onMembershipChange: function(e) {
      this.setState({selectedMembershipId: e.target.value});
  },
  onFNameChange: function(e) {
      this.setState({f_name: e.target.value});
  },
  onLNameChange: function(e) {
      this.setState({l_name: e.target.value});
  },
  onDobChange: function(e) {
      this.setState({dob: e.target.value});
  },
  onEmailChange: function(e) {
      this.setState({email: e.target.value});
  },
  onPasswordChange: function(e) {
      this.setState({password: e.target.value});
  },
  onSave: function(e){
    $.post("api/create_user.php", {
            f_name: this.state.f_name,
            l_name: this.state.l_name,
            dob: this.state.dob,
            email: this.state.email,
            password: this.state.password,
            membership_id: this.state.selectedMembershipId
        },
        function(res){
            this.setState({successCreation: res});
            this.setState({f_name: ""});
            this.setState({l_name: ""});
            this.setState({dob: ""});
            this.setState({email: ""});
            this.setState({password: ""});
            this.setState({selectedMembershipId: -1});
        }.bind(this)
    );
    e.preventDefault();
  },

  render: function() {

    var membershipsOptions = this.state.memberships.map(function(membership){
        return (
            <option key={membership.id} value={membership.id}>{membership.name}</option>
        );
    });
    return (
    <div>
        {

            this.state.successCreation == "true" ?
                <div className='alert alert-success'>
                    User was saved.
                </div>
            : null
        }

        {

            this.state.successCreation == "false" ?
                <div className='alert alert-danger'>
                    Unable to save user. Please try again.
                </div>
            : null
        }

        <a href='#'
            onClick={() => this.props.changeAppMode('read')}
            className='btn btn-primary margin-bottom-1em'> Users
        </a>


        <form onSubmit={this.onSave}>
            <table className='table table-bordered table-hover'>
            <tbody>
                <tr>
                    <td>First Name</td>
                    <td>
                        <input
                        type='text'
                        className='form-control'
                        value={this.state.f_name}
                        required
                        onChange={this.onFNameChange} />
                    </td>
                </tr>

                <tr>
                    <td>Last Name</td>
                    <td>
                        <input
                        type='text'
                        className='form-control'
                        value={this.state.l_name}
                        required
                        onChange={this.onLNameChange} />
                    </td>
                </tr>

                <tr>
                    <td>Date of Birth</td>
                    <td>
                        <input
                        type='text'
                        className='form-control'
                        value={this.state.dob}
                        required
                        onChange={this.onDobChange} />
                    </td>
                </tr>

                <tr>
                    <td>Email</td>
                    <td>
                        <input
                        type='text'
                        className='form-control'
                        value={this.state.email}
                        required
                        onChange={this.onEmailChange} />
                    </td>
                </tr>

                <tr>
                    <td>Password</td>
                    <td>
                        <input
                        type='text'
                        className='form-control'
                        value={this.state.password}
                        required
                        onChange={this.onPasswordChange} />
                    </td>
                </tr>

                <tr>
                    <td>Membership</td>
                    <td>
                        <select
                        onChange={this.onMembershipChange}
                        className='form-control'
                        value={this.state.selectedMembershipId}>
                        <option value="-1">Select membership...</option>
                        {membershipsOptions}
                        </select>
                    </td>
                </tr>

                <tr>
                    <td></td>
                    <td>
                        <button
                        className='btn btn-primary'
                        onClick={this.onSave}>Save</button>
                    </td>
                </tr>
                </tbody>
            </table>
        </form>
    </div>
    );
  }
});

var ReadOneUserComponent = React.createClass({

    getInitialState: function() {
        return {
            id: 0,
            f_name: '',
            l_name: '',
            dob: '',
            email: '',
            membership_name: ''
        };
    },

    componentDidMount: function() {

        var userId = this.props.userId;

        this.serverRequestProd = $.post("api/read_one_user.php",
            {user_id: userId},
            function (user) {
                var u = JSON.parse(user)[0];
                this.setState({membership_name: u.membership_name});
                this.setState({id: u.id});
                this.setState({f_name: u.f_name});
                this.setState({l_name: u.l_name});
                this.setState({dob: u.dob});
                this.setState({email: u.email});
            }.bind(this));

        $('.page-header h1').text('User');
    },

    componentWillUnmount: function() {
        this.serverRequestProd.abort();
    },

    render: function() {

        return (
            <div>
                <a href='#'
                    onClick={() => this.props.changeAppMode('read')}
                    className='btn btn-primary margin-bottom-1em'>
                    Users
                </a>

                <form onSubmit={this.onSave}>
                    <table className='table table-bordered table-hover'>
                        <tbody>
                        <tr>
                            <td>First Name</td>
                            <td>{this.state.f_name}</td>
                        </tr>

                        <tr>
                            <td>Last Name</td>
                            <td>{this.state.l_name}</td>
                        </tr>

                        <tr>
                            <td>Date of Birth</td>
                            <td>{this.state.dob}</td>
                        </tr>

                        <tr>
                            <td>Email</td>
                            <td>{this.state.email}</td>
                        </tr>

                        <tr>
                            <td>Membership</td>
                            <td>{this.state.membership_name}</td>
                        </tr>

                        </tbody>
                    </table>
                </form>
            </div>
        );
    }
});

var TopActionsComponent = React.createClass({
    render: function() {
        return (
            <div>
                <a href='#'
                    onClick={() => this.props.changeAppMode('create')}
                    className='btn btn-primary margin-bottom-1em'> Create user
                </a>
            </div>
        );
    }
});

var SearchComponent = React.createClass({
  render: function() {
    return (
      <table className='table table-bordered'>
        <thead>
          <tr>
            <th></th>
            <th><center><h4>Search Users</h4></center></th>
            <th></th>
          </tr>
          <tr>
            <th>First Name:</th>
            <th>Last Name:</th>
            <th>Email:</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <SearchFNameComponent />
            <SearchLNameComponent />
            <SearchEmailComponent />
          </tr>
        </tbody>
      </table>
    );
  }
});

var SearchFNameComponent = React.createClass({
    searchFName: function() {
      var input, filter, table, tr, td, i;
      input = document.getElementById("fnameInput");
      filter = input.value.toUpperCase();
      table = document.getElementById("myTable");
      tr = table.getElementsByTagName("tr");
      for (i = 0; i < tr.length; i++) {
        td = tr[i].getElementsByTagName("td")[0];
        if (td) {
          if (td.innerHTML.toUpperCase().indexOf(filter) > -1) {
            tr[i].style.display = "";
          } else {
            tr[i].style.display = "none";
          }
        }
      }
    },
    render: function() {
        return (
          <td>
            <input type='text' className='form-control' id='fnameInput' onChange={this.searchFName} placeholder='Search by first name...' />
          </td>
        );
    }
});

var SearchLNameComponent = React.createClass({
    searchLName: function() {
      var input, filter, table, tr, td, i;
      input = document.getElementById("lnameInput");
      filter = input.value.toUpperCase();
      table = document.getElementById("myTable");
      tr = table.getElementsByTagName("tr");
      for (i = 0; i < tr.length; i++) {
        td = tr[i].getElementsByTagName("td")[1];
        if (td) {
          if (td.innerHTML.toUpperCase().indexOf(filter) > -1) {
            tr[i].style.display = "";
          } else {
            tr[i].style.display = "none";
          }
        }
      }
    },
    render: function() {
        return (
          <td>
            <input type='text' className='form-control' id='lnameInput' onChange={this.searchLName} placeholder='Search by last name...' />
          </td>
        );
    }
});

var SearchEmailComponent = React.createClass({
    searchEmail: function() {
      var input, filter, table, tr, td, i;
      input = document.getElementById("emailInput");
      filter = input.value.toUpperCase();
      table = document.getElementById("myTable");
      tr = table.getElementsByTagName("tr");
      for (i = 0; i < tr.length; i++) {
        td = tr[i].getElementsByTagName("td")[2];
        if (td) {
          if (td.innerHTML.toUpperCase().indexOf(filter) > -1) {
            tr[i].style.display = "";
          } else {
            tr[i].style.display = "none";
          }
        }
      }
    },
    render: function() {
        return (
          <td>
            <input type='text' className='form-control' id='emailInput' onChange={this.searchEmail} placeholder='Search by email...' />
          </td>
        );
    }
});

var ReadUsersComponent = React.createClass({
    getInitialState: function() {
        return {
            users: []
        };
    },

    componentDidMount: function() {
        this.serverRequest = $.post("api/read_all_users.php", function (users) {
            this.setState({
                users: JSON.parse(users)
            });
        }.bind(this));
    },

    componentWillUnmount: function() {
        this.serverRequest.abort();
    },

    render: function() {
        var filteredUsers = this.state.users;
        $('.page-header h1').text('Users');

        return (
            <div className='overflow-hidden'>
                <TopActionsComponent changeAppMode={this.props.changeAppMode} />

                <SearchComponent />

                <UsersTable
                    users={filteredUsers}
                    changeAppMode={this.props.changeAppMode} />
            </div>
        );
    }
});

var UpdateUserComponent = React.createClass({
  getInitialState: function() {
    return {
        memberships: [],
        selectedMembershipId: 0,
        id: 0,
        f_name: '',
        l_name: '',
        dob: '',
        email: '',
        successUpdate: null
    };
  },
  componentDidMount: function() {
    this.serverRequestCat = $.post("api/read_all_memberships.php", function (memberships) {
        this.setState({
            memberships: JSON.parse(memberships)
        });
    }.bind(this));

    var userId = this.props.userId;
    this.serverRequestProd = $.post("api/read_one_user.php",
        {user_id: userId},
        function (user) {
            var u = JSON.parse(user)[0];
            this.setState({selectedMembershipId: u.membership_id});
            this.setState({id: u.id});
            this.setState({f_name: u.f_name});
            this.setState({l_name: u.l_name});
            this.setState({dob: u.dob});
            this.setState({email: u.email});
        }.bind(this));

    $('.page-header h1').text('Update user');
  },
  componentWillUnmount: function() {
    this.serverRequestCat.abort();
    this.serverRequestProd.abort();
  },
  onMembershipChange: function(e) {
      this.setState({selectedMembershipId: e.target.value});
  },
  onFNameChange: function(e) {
      this.setState({f_name: e.target.value});
  },
  onLNameChange: function(e) {
      this.setState({l_name: e.target.value});
  },
  onDobChange: function(e) {
      this.setState({dob: e.target.value});
  },
  onEmailChange: function(e) {
      this.setState({email: e.target.value});
  },
  onSave: function(e){
    $.post("api/update_user.php", {
            id: this.state.id,
            f_name: this.state.f_name,
            l_name: this.state.l_name,
            dob: this.state.dob,
            email: this.state.email,
            membership_id: this.state.selectedMembershipId
        },
        function(res){
            this.setState({successUpdate: res});
        }.bind(this)
    );
    e.preventDefault();
  },
  render: function() {
    var membershipsOptions = this.state.memberships.map(function(membership){
        return (
            <option key={membership.id} value={membership.id}>{membership.name}</option>
        );
    });

    return (
        <div>
            {
                this.state.successUpdate == "true" ?
                    <div className='alert alert-success'>
                        User was updated.
                    </div>
                : null
            }

            {
                this.state.successUpdate == "false" ?
                    <div className='alert alert-danger'>
                        Unable to update user. Please try again.
                    </div>
                : null
            }

            <a href='#'
                onClick={() => this.props.changeAppMode('read')}
                className='btn btn-primary margin-bottom-1em'>
                Users
            </a>

            <form onSubmit={this.onSave}>
                <table className='table table-bordered table-hover'>
                    <tbody>
                    <tr>
                        <td>First Name</td>
                        <td>
                            <input
                                type='text'
                                className='form-control'
                                value={this.state.f_name}
                                required
                                onChange={this.onFNameChange} />
                        </td>
                    </tr>

                    <tr>
                        <td>Last Name</td>
                        <td>
                            <input
                                type='text'
                                className='form-control'
                                value={this.state.l_name}
                                required
                                onChange={this.onLNameChange} />
                        </td>
                    </tr>

                    <tr>
                        <td>Date of Birth</td>
                        <td>
                            <input
                                type='text'
                                className='form-control'
                                value={this.state.dob}
                                required
                                onChange={this.onDobChange} />
                        </td>
                    </tr>

                    <tr>
                        <td>Email</td>
                        <td>
                            <input
                                type='text'
                                className='form-control'
                                value={this.state.email}
                                required
                                onChange={this.onEmailChange} />
                        </td>
                    </tr>

                    <tr>
                        <td>Membership</td>
                        <td>
                            <select
                                onChange={this.onMembershipChange}
                                className='form-control'
                                value={this.state.selectedMembershipId}>
                                <option value="-1">Select membership...</option>
                                {membershipsOptions}
                                </select>
                        </td>
                    </tr>

                    <tr>
                        <td></td>
                        <td>
                            <button
                                className='btn btn-primary'
                                onClick={this.onSave}>Save Changes</button>
                        </td>
                    </tr>

                    </tbody>
                </table>
            </form>
        </div>
    );
  }
});

var DeleteUserComponent = React.createClass({

    componentDidMount: function() {
        $('.page-header h1').text('Delete user');
    },

    onDelete: function(e){
        var userId = this.props.userId;

        $.post("api/delete_users.php",
            { del_ids: [userId] },
            function(res){
                this.props.changeAppMode('read');
            }.bind(this)
        );
    },

    render: function() {

        return (
            <div className='row'>
                <div className='col-md-3'></div>
                <div className='col-md-6'>
                    <div className='panel panel-default'>
                        <div className='panel-body text-align-center'>Are you sure?</div>
                        <div className='panel-footer clearfix'>
                            <div className='text-align-center'>
                                <button onClick={this.onDelete}
                                    className='btn btn-danger m-r-1em'>Yes</button>
                                <button onClick={() => this.props.changeAppMode('read')}
                                    className='btn btn-primary'>No</button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='col-md-3'></div>
            </div>
        );
    }
});

var MainApp = React.createClass({
  getInitialState: function() {
    return {
        currentMode: 'read',
        userId: null
    };
  },
  changeAppMode: function(newMode, userId){
    this.setState({currentMode: newMode});

    if(userId !== undefined){
        this.setState({userId: userId});
    }
  },
  render: function() {

    var modeComponent =
        <ReadUsersComponent
        changeAppMode={this.changeAppMode} />;

    switch(this.state.currentMode){
        case 'read':
            break;
        case 'readOne':
            modeComponent = <ReadOneUserComponent userId={this.state.userId} changeAppMode={this.changeAppMode}/>;
            break;
        case 'create':
            modeComponent = <CreateUserComponent changeAppMode={this.changeAppMode}/>;
            break;
        case 'update':
            modeComponent = <UpdateUserComponent userId={this.state.userId} changeAppMode={this.changeAppMode}/>;
            break;
        case 'delete':
            modeComponent = <DeleteUserComponent productId={this.state.userId} changeAppMode={this.changeAppMode}/>;
            break;
        default:
            break;
    }

    return modeComponent;
  }
});

ReactDOM.render(
    <MainApp />,
    document.getElementById('app')
);
