module.exports = {
  format_time: (date) => {
    return date.toLocaleTimeString();
  },
  format_date: (date) => {
    // format the month, date, and year through javascript
    return `${new Date(date).getMonth() + 1}/${new Date(date).getDate()}/${
      // adding the years to get the date
      new Date(date).getFullYear()
    }`;
  },
};