// Write your code here
import {Component} from 'react'
import {v4} from 'uuid'
import {format} from 'date-fns'

import AppointmentItem from '../AppointmentItem'
import './index.css'

class Appointments extends Component {
  state = {
    TitleInput: '',
    dateInput: '',
    AppointmentList: [],
    isFilterActive: false,
  }

  toggleIsFavorite = id => {
    this.setState(prevState => ({
      AppointmentList: prevState.AppointmentList.map(eachAppointment => {
        if (id === eachAppointment.id) {
          return {...eachAppointment, isFavorite: !eachAppointment.isFavorite}
        }
        return eachAppointment
      }),
    }))
  }

  onFilter = () => {
    const {isFilterActive} = this.state
    this.setState({isFilterActive: !isFilterActive})
  }

  onChangeTitleInput = event => {
    this.setState({TitleInput: event.target.value})
  }

  onChangeDateInput = event => {
    this.setState({dateInput: event.target.value})
  }

  Addappointmentdate = event => {
    event.preventDefault()
    const {TitleInput, dateInput} = this.state
    const formatedDate = dateInput
      ? format(new Date(dateInput), 'dd MM YYY, EEE')
      : ''

    const newAppointment = {
      id: v4(),
      Title: TitleInput,
      date: formatedDate,
      isFavorite: false,
    }
    this.setState(prevState => ({
      AppointmentList: [...prevState.AppointmentList, newAppointment],
      TitleInput: '',
      dateInput: '',
    }))
  }

  getFilterAppointmentList = () => {
    const {isFilterActive, AppointmentList} = this.state

    if (isFilterActive) {
      return AppointmentList.filter(
        eachTransaction => eachTransaction.isFavorite === true,
      )
    }
    return AppointmentList
  }

  render() {
    const {TitleInput, dateInput, isFilterActive} = this.state
    const filterClassName = isFilterActive ? 'filter-filled' : 'filter-empty'
    const filteredAppointmentList = this.getFilterAppointmentList()

    return (
      <div className="app-container">
        <div className="Appointment-container">
          <h1>Add Appointment</h1>
          <div className="Input-container">
            <form onSubmit={this.Addappointmentdate} className="form">
              <lable htmlFor="title">TITLE</lable>
              <input
                type="text"
                id="title"
                onChange={this.onChangeTitleInput}
                value={TitleInput}
                placeholder="Title"
              />
              <lable htmlFor="date">DATE</lable>
              <input
                type="date"
                id="date"
                onChange={this.onChangeDateInput}
                value={dateInput}
              />
              <button type="submit" className="add-button">
                Add
              </button>
            </form>
            <img
              src="https://assets.ccbp.in/frontend/react-js/appointments-app/appointments-img.png"
              alt="appointments"
            />
          </div>
          <hr className="line" />
          <div className="Appointments">
            <h1>Appointments</h1>
            <button type="button" onClick={this.onFilter}>
              Starred
            </button>
          </div>
          <ul>
            {filteredAppointmentList.map(eachAppointment => (
              <AppointmentItem
                key={eachAppointment.id}
                AppointmentDetails={eachAppointment}
                toggleIsFavorite={this.toggleIsFavorite}
              />
            ))}
          </ul>
        </div>
      </div>
    )
  }
}

export default Appointments
