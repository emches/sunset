function formatTimeString(timeString){
  console.log(`init timeString: ${timeString}`);
  return parseInt(timeString.split(":").map(function(item, index){
    if (item.length < 2) {
      return `0${item}`;
    }
    return item;
  }).join(""))
}

function formatTimes(times) {
  console.log(times);
  for (var i = 0; i < times.length; i++) {
    console.log(times[i]);
    times[i].timeStart = formatTimeString(times[i].timeStart);
    times[i].timeEnd = formatTimeString(times[i].timeEnd);
  }
  console.log(`times updated to ${times}`)
  return times;
}
