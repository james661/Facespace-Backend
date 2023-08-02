module.exports = ( timestamp,
  { monthLength = 'short' } = {}
  ) => {
    let months;
    if (monthLength === 'short') {
      months = {
        0: "Jan",
        1: "Feb",
        2: "Mar",
        3: "Apr",
        4: "May",
        5: "Jun",
        6: "Jul",
        7: "Aug",
        8: "Sep",
        9: "Oct",
        10: "Nov",
        11: "Dec",
      };
    } else {
      months = {
        0: "January",
        1: "February",
        2: "March",
        3: "April",
        4: "May",
        5: "June",
        6: "July",
        7: "August",
        8: "September",
        9: "October",
        10: "November",
        11: "December",
      };
    }
    const dateObj = new Date(timestamp);
    const formattedMonth = months[dateObj.getMonth()];

    let minutes = dateObj.getMinutes();

    let hour;
    if (hour === 0) {
      hour = 12;
    }
    if (dateObj.getHours > 12) {
      hour = Math.floor(dateObj.getHours() / 2);
    } else {
      hour = dateObj.getHours();
    }

    let amOrpm;
    if (dateObj.getHours() >= 12) {
      amOrpm = 'pm';
    } else {
      amOrpm = 'am';
    }

    let day;
    day = dateObj.getDate();

    const year = dateObj.getFullYear();

    const timeStamp = `${formattedMonth} ${day}, ${year} at ${hour}:${minutes} ${amOrpm}`;
    return timeStamp;
  };