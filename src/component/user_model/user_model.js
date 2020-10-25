import React, { Component } from 'react';
import './user_model.css';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'moment-timezone';

const localizer = momentLocalizer(moment);

class UserModel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showCalendarView: false,
    };
  }

  toggleCalenderView = (toggle) => {
    this.setState({
      showCalendarView: toggle,
    });
  };

  render() {
    const { userData, toggleModal } = this.props;
    const { todayActive } = userData;
    return (
      <div>
        <div className="modal-cont">
          <div className="modal">
            <div className="d-flex justify-content-end">
              <button
                type="button"
                className="close"
                aria-label="Close"
                onClick={() => toggleModal(false)}
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            {this.state.showCalendarView ? (
              <Calendar
                events={userData.events}
                startAccessor="start"
                endAccessor="end"
                localizer={localizer}
                style={{ height: 500, width: '100%' }}
              />
            ) : (
              <div>
                <div className="card d-flex justify-content-center">
                  <div className="card-header">
                    <h1 className="display-2 card-heading">
                      TODAY ACTIVITY DETAIL
                    </h1>
                    <hr />
                    <div>
                      <div>
                        <strong>
                          <h3>USER DETAIL</h3>
                        </strong>
                      </div>
                      <div>
                        <b>ID: {userData.id}</b>
                      </div>
                      <div>
                        <b>NAME: {userData.real_name}</b>
                      </div>
                      <div>
                        <b>
                          TimeZONE: {userData.tz} (
                          {moment().utc().tz(userData.tz).format('Z z')})
                        </b>
                      </div>
                      <div>
                        <b>
                          DATE({userData.tz}):{' '}
                          {moment()
                            .utc()
                            .tz(userData.tz)
                            .format('DD-MMM-YYYY  HH:MM A')}
                        </b>
                      </div>
                    </div>
                  </div>
                  <hr />
                  <div className="card-body">
                    <h2>TODAY ACTIVITY PERIODS</h2>
                    {todayActive && todayActive.length ? (
                      todayActive.map((time, index) => {
                        return (
                          <div key={index}>
                            <strong>Start Time: </strong>
                            {`${time.start_time.substr(
                              time.start_time.length - 7,
                              5
                            )}${' '}${time.start_time.substr(
                              time.start_time.length - 2,
                              2
                            )}`}{' '}
                            <strong>End Time: </strong>
                            {`${time.end_time.substr(
                              time.end_time.length - 7,
                              5
                            )}${' '}${time.end_time.substr(
                              time.end_time.length - 2,
                              2
                            )}`}
                          </div>
                        );
                      })
                    ) : (
                      <strong>OPPS! No Activity For Today</strong>
                    )}
                  </div>
                </div>
                <div className="card-footer">
                  <button
                    className="btn"
                    onClick={() => this.toggleCalenderView(true)}
                  >
                    See More Activity
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default UserModel;
