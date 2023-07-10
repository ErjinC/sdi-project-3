import React, { Component } from 'react';
import './Calendar.css';
import CalendarFunction from './CalendarFunction';
import {Link} from 'react-router-dom'



export default class Calendar extends Component {
  constructor() {
    super();

    this.weekdays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    this.months = ['January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December'];

    this.state = {
      currentDay: new Date()
    }
  }

  changeCurrentDay = (day) => {
    this.setState({ currentDay: new Date(day.year, day.month, day.number) });
  }

  nextDay = () => {
    this.setState({ currentDay: new Date(this.state.currentDay.setDate(this.state.currentDay.getDate() + 1)) });
  }

  previousDay = () => {
    this.setState({ currentDay: new Date(this.state.currentDay.setDate(this.state.currentDay.getDate() - 1)) });
  }

  render() {
    return (
      <div id="calendar">
        <div className="calendar-header">
          <div className="title">
            <h2>{this.months[this.state.currentDay.getMonth()]} {this.state.currentDay.getFullYear()}</h2>
          </div>
          <div className="tools">
            <button className="toolButton navday" onClick={this.previousDay}>
              <span className="material-icons">
               Back
              </span>
            </button>
            <p>{this.months[this.state.currentDay.getMonth()].substring(0, 3)} {this.state.currentDay.getDate()}</p>
            <button className="toolButton navday" onClick={this.nextDay}>
              <span className="material-icons">
                Forward
              </span>
            </button>
            <button className="toolButton" onClick={()=>{console.log(this.state.currentDay)}}>
              <Link className="tblink" to={`/calendar/${this.state.currentDay.getFullYear()}-${this.state.currentDay.getMonth() + 1}-${this.state.currentDay.getDate()}`} style={{ textDecoration: 'none' }}>
                <span className="material-icons">
                  View Selected Day's Events
                </span>
              </Link>
            </button>
          </div>
        </div>
        <div className="calendar-body">
          <div className="table-header">
            {
              this.weekdays.map((weekday) => {
                return <div className="weekday"><p>{weekday}</p></div>
              })
            }
          </div>
          <CalendarFunction day={this.state.currentDay} changeCurrentDay={this.changeCurrentDay} />
        </div>
      </div>
    )
  }
}
