import React, {PropTypes} from 'react';
import Base from 'components/base';

const DEFAULT_LOCALE = 'en';
const WEEKDAYS = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'];

/**
 *
 * @param {Date} date
 */
//const nextDateByMonth = (date) => {
//  const month = date.getMonth();
//  return new Date(month + 1);
//};

const nextDate = (date) => {
  const nDate = new Date(date.getTime());
  nDate.setDate(date.getDate() + 1);

  return nDate;
};


/**
 *
 * @param month
 * @param year
 * @returns {Array.<Object>}
 */
const listDays = (month, year) => {
  const date = new Date(year, month - 1, 1);
  return daysFromMonth(date, month);
};

/**
 *
 * @param date
 * @param month
 * @returns {Array<Object>}
 */
const daysFromMonth = (date, month) => {
  return date.getMonth() !== month - 1 ? [] : [
    {
      day: new Date(date.getTime()),
      [date.getDate()]: WEEKDAYS[date.getDay()]
    }, ...daysFromMonth(nextDate(date), month)
  ];
};

//const daysInMonth = (month, year) => {
//  return new Date(year, month, 0).getDate();
//};

const Day = ({date}) => {
  return (<Base tagName='li'>{date.getDate()}</Base>);
};

Day.propTypes = {
  date: PropTypes.instanceOf(Date)
};

/**
 * @param {Date} date
 */
const Month = ({date}) => {
  const days = listDays(date.getMonth() + 1, date.getYear());
  return (
    <div>
      <label>{date.toLocaleString(DEFAULT_LOCALE.toLowerCase(), {month: 'long'})}</label>
        <Base tagName='ul'>{days.map((day, i) => {
          return (<Day key={i} date={day.day}/>);
        })}
    </Base>
    </div>
  );
};

Month.propTypes = {
  date: PropTypes.instanceOf(Date)
};

class DatePicker extends React.Component {
  render () {
    return (
      <Base>
        <Month date={new Date()}/>
      </Base>
    );
  }
}

export default DatePicker;
