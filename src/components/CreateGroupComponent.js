import React, {Component} from 'react';
import 'whatwg-fetch';
import $ from 'jquery';

class CreateGroupComponent extends Component {
  constructor(props) {
		super(props);
		this.state = {
      user_id: 1,
      group_name: '',
      group_description: '',
      group_type: 1
		}
    this.onSave = this.onSave.bind(this);
	}
  onGroupNameChange = (e) => {
      this.setState({group_name: e.target.value});
  }
  onGroupDescriptionChange = (e) => {
      this.setState({group_description: e.target.value});
  }
  onSave = (e) => {
    $.post("api/create_group.php", {
          user_id: this.state.user_id,
          group_name: this.state.group_name,
          group_description: this.state.group_description,
          group_type: this.state.group_type
        },
        function(res){
            this.setState({successCreation: res});
            this.setState({group_name: ""});
            this.setState({group_description: ""});
        }.bind(this)
    );
    e.preventDefault();
  }

  render() {
    return (
    <div>
        <form onSubmit={this.onSave}>
            <table className='table table-bordered table-hover'>
            <tbody>
                <tr>
                    <td>Group Name</td>
                    <td>
                        <input
                        type='text'
                        className='form-control'
                        value={this.state.group_name}
                        required
                        onChange={this.onGroupNameChange} />
                    </td>
                </tr>

                <tr>
                    <td>Group Description</td>
                    <td>
                        <input
                        type='text'
                        className='form-control'
                        value={this.state.group_description}
                        required
                        onChange={this.onGroupDescriptionChange} />
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
}

export default CreateGroupComponent;
