import React, { Component } from 'react';
import axios from 'axios';
import moment from 'moment';
import 'moment-timezone';
import './App.css';
import UserModel from './component/user_model/user_model';

const URL = 'https://demo9221932.mockable.io/users';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users: '',
      selectedUser: '',
      modelShow: false,
    };
  }

  toggleModel = (toggle) => {
    this.setState({
      modelShow: toggle,
    });
  };

  onSelectUser(user) {
    this.setState({
      selectedUser: user,
    });
    this.toggleModel(true);
  }

  parseUserData(users) {
    users = users.map((event) => {
      const timeZone = event.tz;
      const foundTodayActivity = event.activity_periods.filter((time) => {
        const startTime = time.start_time;
        const endTime = time.end_time;
        return (
          moment().utc().tz(timeZone).format('MMM DD YYYY') ===
            startTime.substr(0, 11) ||
          moment().utc().tz(timeZone).format('MMM DD YYYY') ===
            endTime.substr(0, 11)
        );
      });
      const todayActive =
        foundTodayActivity !== [] ? foundTodayActivity : false;
      const events = event.activity_periods.map(({ start_time, end_time }) => {
        return {
          title: `${start_time.substr(12, 16)}-${end_time.substr(
            12,
            16
          )}${' '}Active`,
          start: new Date(
            `${start_time.substr(
              0,
              start_time.length - 2
            )}${' '}${start_time.substr(start_time.length - 2, 2)}`
          ),
          end: new Date(
            `${end_time.substr(0, end_time.length - 2)}${' '}${end_time.substr(
              end_time.length - 2,
              2
            )}`
          ),
        };
      });
      return { ...event, events: events, todayActive: todayActive };
    });
    return users;
  }

  componentDidMount() {
    axios
      .get(URL)
      .then((res) => {
        const users = res.data.members;
        const parsedUserData = this.parseUserData(users);
        this.setState({ users: parsedUserData });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  render() {
    const userList = this.state.users;
    if (!userList) {
      return <div>Loading....</div>;
    }
    return (
      <div className="App">
        <div className="navbar fixed-top navbar-light header_dash_board">
          <h1 className="display-4">USER ACTIVITY DETAIL</h1>
          <strong>DATE: {new Date().toDateString()}</strong>
        </div>
        <div>
          {userList &&
            userList.map((user, index) => {
              return (
                <div
                  key={`${index}-${user.id}-${user.real_name}`}
                  className="card text-center userslist"
                  onClick={() => this.onSelectUser(user)}
                >
                  <div className="card-header">
                    <strong>ID: {user.id}</strong>
                  </div>
                  <div className="card-body">
                    <strong>NAME: {user.real_name}</strong>
                  </div>
                  <div className="card-footer">
                    <small>TIME ZONE: {user.tz}</small>
                  </div>
                </div>
              );
            })}
        </div>
        <div>
          {this.state.modelShow ? (
            <UserModel
              userData={this.state.selectedUser}
              toggleModal={this.toggleModel}
            />
          ) : null}
        </div>
      </div>
    );
  }
}

export default App;
