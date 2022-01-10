export function dateStringToDate(date_string) {
  return new Date(date_string.replace(/-/g, "/"));
}

export function milliToTimer(milliseconds) {
  var end_str = "";
  milliseconds = Math.floor(milliseconds / 1000);
  var secs = milliseconds % 60;
  milliseconds = (milliseconds - secs) / 60;
  var mins = milliseconds % 60;
  milliseconds = (milliseconds - mins) / 60;
  var hrs = milliseconds;
  milliseconds = (milliseconds - mins) / 60;
  if (hrs > 0) {
    end_str += hrs;
    end_str += "h ";
  }
  if (mins > 0 || hrs > 0) {
    end_str += mins;
    end_str += "m ";
  }
  if (hrs <= 0) {
    end_str += secs;
    end_str += "s";
  }
  return end_str;
}

function datesToTimer(start_date, end_date) {
  var milliseconds = end_date.getTime() - start_date.getTime();
  return milliToTimer(milliseconds);
}

export default datesToTimer;
