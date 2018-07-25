import React, { Component } from 'react'
import styled from 'styled-components'
import moment from 'moment'

const Heading = styled.div`
  display: table;
  margin: 0 auto auto auto;
`

const CalendarWrapper = styled.div`
`

const RowWrapper = styled.ul`
  display: table;
  margin: 5px auto;
`

const CalendarWrap = styled.div`
  display: table;
  margin: 5px auto;
`

const Label = styled.div`
  position: relative;
  margin: 7px auto;
`

const Item = styled.li`
  display: inline-block;
  margin: 8px;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: #D3D3D3;
`

const Day = styled.li`
  display: inline-block;
  margin: 8px;
  width: 40px;
  height: 40px;
  border-radius: 50%;
`

const Number = styled.text`
  display: table;
  margin: 7px auto;
  color: #000;
`

class DayDate extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  handleClick() {
    this.props.handler(this.props.day);
  }

  fontColor() {
    if (this.props.selected) {
      return '#F5BA26'
    } else if (this.props.highlighted) {
      return '#8C298C'
    }
  }

  backgroundColor() {
    if (this.props.selected) {
      return '#8C298C'
    } else if (this.props.highlighted) {
      return '#D4BAD7'
    }
  }

  render () {
    return (
      <Day
        onClick={this.handleClick.bind(this)}
        style={{background: this.backgroundColor()}}>
        <Number style={{color: this.fontColor()}}>{this.props.day}</Number>
      </Day>
    )
  }
}

class Calendar extends Component {
  constructor() {
    super();
    this.state = {
      date: moment().date(),
      month: moment().month(),
      year: moment().year(),
      startDay: null,
      startMonth: null,
      endDay: null,
      endMonth: null,
    }
  }

  getDaysInMonth(month, year) {
    return new Date(year, month, 0).getDate();
  }

  getMonthName(num) {
    return moment().month(num).format('MMMM')
  }

  createCalendar(num) {
    var weeks = [];
    var day = 1;
    var startWeek = [];
    for (let i = 0; i < num; i++) {
      startWeek.push(null);
    }

    while (num < 7) {
      startWeek.push(day);
      num++;
      day++;
    }
    weeks.push(startWeek);
    num = 0;
    while (day <= this.getDaysInMonth(this.state.month, this.state.year)) {
      var week = [];
      while (num < 7) {
        if (day <= this.getDaysInMonth(this.state.month, this.state.year)) {
          week.push(day);
        } else {
          week.push(null);
        }
        num++;
        day++;
      }
      weeks.push(week);
      num = 0;
    }
    return weeks;
  }

  toggle(selection) {
    if (this.state.startDay === null) {
      this.setState({
        startDay: selection, startMonth: this.state.month, endDay: selection, endMonth: this.state.month,
      })
    } else if (this.state.month < this.state.startMonth) {
      this.setState({
        startDay: selection, startMonth: this.state.month,
      })
    } else if (this.state.month > this.state.endMonth) {
      this.setState({
        endDay: selection, endMonth: this.state.month,
      })
    } else if (this.state.month === this.state.endMonth && selection <= this.state.endDay) {
      this.setState({
        startDay: selection, startMonth: this.state.month
      });
    } else if (this.state.month < this.state.endMonth) {
      this.setState({
        startDay: selection, startMonth: this.state.month
      })
    } else if (this.state.month === this.state.startMonth && selection >= this.state.startDay) {
      this.setState({
        endDay: selection, endMonth: this.state.month,
      })
    } else if (this.state.month > this.state.startMonth) {
      this.setState({
        startDay: selection, startMonth: this.state.month,
      })
    }
  }

  createMomentDate(value) {
    var output = this.state.year.toString() + "-";
    output += (this.state.month < 10 ? "0" + this.state.month : this.state.month) + "-";
    output += value < 10 ? "0" + value : value;
    return moment(output, 'YYYY-MM-DD');
  }

  render() {
    var layout = this.createCalendar(new Date(this.state.year, this.state.month, 1).getDay());
    var dayNames = ["S", "M", "T", "W", "T", "F", "S"];
    console.log(moment().weekday(0).date())
    return (
      <CalendarWrapper>
        <RowWrapper>
          {dayNames.map((value, i) => {
            return (
              <Item>
                <Label>{ value }</Label>
              </Item>
            )
          })}
        </RowWrapper>
        <Heading>
          <button style={{position: 'relative', top: '5px'}} onClick={() => {
            if (this.state.month === 1) {
              this.setState({
                month: 12,
                year: this.state.year - 1,
              })
            } else {
              this.setState({ month: this.state.month - 1 })
            }
          }}>{"<"}
          </button>
          <span>
            { this.getMonthName(this.state.month) + ", " + this.state.year }
          </span>
          <button style={{position: 'relative', top: '5px'}} onClick={() => {
            if (this.state.month === 12) {
              this.setState({
                month: 1,
                year: this.state.year + 1,
              })
            } else {
              this.setState({ month: this.state.month + 1 })
            }
          }}>{">"}
          </button>
        </Heading>
        <CalendarWrap>
        {layout.map(week => {
          return <RowWrapper>
            {week.map(item => {
              return (
                <DayDate day={ item }
                         month={this.state.month}
                         year={this.state.year}
                         handler={this.toggle.bind(this)}
                  selected={item !== null && ((item === this.state.startDay && this.state.month === this.state.startMonth)
                            || (item === this.state.endDay && this.state.month === this.state.endMonth))}
                  highlighted={item !== null && this.state.endDay !== null &&
                              ((item > this.state.startDay && item < this.state.endDay && this.state.month === this.state.startMonth && this.state.month === this.state.endMonth)
                               || (this.state.startMonth !== this.state.endMonth && ((this.state.month === this.state.startMonth && item > this.state.startDay)
                               || (this.state.month === this.state.endMonth && item < this.state.endDay)
                               || (this.state.month < this.state.endMonth && this.state.month > this.state.startMonth))))}
                />
              )
            })}
          </RowWrapper>
        })}
        </CalendarWrap>
      </CalendarWrapper>
    )
  }
}

export default Calendar;
