function datesToTimer(start_date, end_date) {
  var milliseconds = end_date.getTime() - start_date.getTime();
  var end_str = "";
  milliseconds = Math.floor(milliseconds / 1000);
  var secs = milliseconds % 60;
  milliseconds = (milliseconds - secs) / 60;
  var mins = milliseconds;

  if (mins < 10) {
    end_str = "0";
  }
  end_str += mins;
  end_str += ":";
  if (secs < 10) {
    end_str += "0";
  }
  end_str += secs;
  return end_str;
}

export default datesToTimer;
